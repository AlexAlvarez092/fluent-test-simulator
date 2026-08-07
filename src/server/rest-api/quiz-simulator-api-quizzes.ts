import { GlideRecord } from '@servicenow/glide';
import {
    isStringArray,
    mapKeys,
    normalizeSelectedAnswerIds,
    parseGlideList,
    toBoolean,
    toMembershipMap,
} from './quiz-simulator-api-helpers';
import { pickQuizQuestions, resolveQuestionPool } from './quiz-simulator-api-collections';

function findQuizForUser(currentUserId: string, quizId: string) {
    const quiz = new GlideRecord('x_2119443_quiz_sim_quiz');
    quiz.addQuery('sys_id', quizId);
    quiz.addQuery('user', currentUserId);
    quiz.query();

    if (!quiz.next()) {
        return null;
    }

    return quiz;
}

function findUserCollection(currentUserId: string, collectionId: string) {
    const userCollection = new GlideRecord('x_2119443_quiz_sim_user_collection');
    userCollection.addQuery('user', currentUserId);
    userCollection.addQuery('collection', collectionId);
    userCollection.query();

    if (!userCollection.next()) {
        return null;
    }

    return userCollection;
}

function getExpectedQuizQuestionIds(quizId: string) {
    const expectedByQuestionId: Record<string, string> = {};
    const quizQuestion = new GlideRecord('x_2119443_quiz_sim_quiz_question');
    quizQuestion.addQuery('quiz', quizId);
    quizQuestion.query();

    while (quizQuestion.next()) {
        const questionId = quizQuestion.getValue('question') || '';
        if (questionId) {
            expectedByQuestionId[questionId] = quizQuestion.getUniqueValue();
        }
    }

    return expectedByQuestionId;
}

function getValidAnswerIdsMap(questionId: string) {
    const validAnswerIdsMap: Record<string, true> = {};
    const answer = new GlideRecord('x_2119443_quiz_sim_answer');
    answer.addQuery('question', questionId);
    answer.query();

    while (answer.next()) {
        validAnswerIdsMap[answer.getUniqueValue()] = true;
    }

    return validAnswerIdsMap;
}

export function createQuizForCollection(
    currentUserId: string,
    collectionId: string,
    requestedCount: number,
    mode: string
) {
    const userCollection = findUserCollection(currentUserId, collectionId);
    if (!userCollection) {
        return { error: 'Saved collection not found for current user', status: 404 };
    }

    const sourceQuestionIds = resolveQuestionPool(userCollection, collectionId, mode);
    if (sourceQuestionIds.length === 0) {
        return { error: `No questions available for mode '${mode}'`, status: 400 };
    }

    const selectedQuestionIds = pickQuizQuestions(sourceQuestionIds, requestedCount);
    if (selectedQuestionIds.length === 0) {
        return { error: 'Unable to select questions for the new quiz', status: 400 };
    }

    const createdQuizQuestionIds: string[] = [];
    let createdQuizId = '';
    let createdOn = '';

    try {
        const quiz = new GlideRecord('x_2119443_quiz_sim_quiz');
        quiz.initialize();
        quiz.setValue('user_collection', userCollection.getUniqueValue());
        quiz.setValue('collection', collectionId);
        quiz.setValue('user', currentUserId);
        quiz.setValue('status', 'in_progress');
        quiz.setValue('result', 0);
        createdQuizId = String(quiz.insert());

        const createdQuiz = new GlideRecord('x_2119443_quiz_sim_quiz');
        if (createdQuiz.get(createdQuizId)) {
            createdOn = createdQuiz.getValue('sys_created_on') || '';
        }

        for (let i = 0; i < selectedQuestionIds.length; i += 1) {
            const quizQuestion = new GlideRecord('x_2119443_quiz_sim_quiz_question');
            quizQuestion.initialize();
            quizQuestion.setValue('quiz', createdQuizId);
            quizQuestion.setValue('question', selectedQuestionIds[i]);
            quizQuestion.setValue('status', 'unanswered');
            const createdQuizQuestionId = String(quizQuestion.insert());
            createdQuizQuestionIds.push(createdQuizQuestionId);
        }

        return {
            status: 201,
            body: {
                quiz_id: createdQuizId,
                collection_id: collectionId,
                created_on: createdOn,
                mode,
                requested_question_count: String(requestedCount),
                selected_question_count: String(selectedQuestionIds.length),
            },
        };
    } catch (error: any) {
        for (let i = createdQuizQuestionIds.length - 1; i >= 0; i -= 1) {
            const grQuizQuestion = new GlideRecord('x_2119443_quiz_sim_quiz_question');
            if (grQuizQuestion.get(createdQuizQuestionIds[i])) {
                grQuizQuestion.deleteRecord();
            }
        }

        if (createdQuizId) {
            const grQuiz = new GlideRecord('x_2119443_quiz_sim_quiz');
            if (grQuiz.get(createdQuizId)) {
                grQuiz.deleteRecord();
            }
        }

        return { error: error?.message || 'Failed to create quiz', status: 400 };
    }
}

export function getQuizDetailData(currentUserId: string, quizId: string) {
    const quiz = findQuizForUser(currentUserId, quizId);
    if (!quiz) {
        return null;
    }

    const isCompletedQuiz = (quiz.getValue('status') || 'in_progress') === 'completed';
    const result = {
        quiz: {
            sys_id: quiz.getUniqueValue(),
            collection_id: quiz.getValue('collection') || '',
            collection_name: quiz.getDisplayValue('collection') || '',
            created_on: quiz.getValue('sys_created_on') || '',
            status: quiz.getValue('status') || 'in_progress',
            result: String(parseInt(quiz.getValue('result') || '0', 10)),
        },
        questions: [] as Array<{
            quiz_question_id: string;
            question_id: string;
            status: string;
            question: string;
            type: string;
            rationale: string;
            docs: string;
            selected_answer_ids: string[];
            answers: Array<{ sys_id: string; answer: string; is_correct?: string }>;
        }>,
    };

    const quizQuestion = new GlideRecord('x_2119443_quiz_sim_quiz_question');
    quizQuestion.addQuery('quiz', quizId);
    quizQuestion.orderBy('sys_created_on');
    quizQuestion.query();

    while (quizQuestion.next()) {
        const questionId = quizQuestion.getValue('question');
        if (!questionId) {
            continue;
        }

        const question = new GlideRecord('x_2119443_quiz_sim_question');
        if (!question.get(questionId)) {
            continue;
        }

        const answers: Array<{ sys_id: string; answer: string; is_correct?: string }> = [];
        const answer = new GlideRecord('x_2119443_quiz_sim_answer');
        answer.addQuery('question', questionId);
        answer.orderBy('sys_created_on');
        answer.query();

        while (answer.next()) {
            const answerRow: { sys_id: string; answer: string; is_correct?: string } = {
                sys_id: answer.getUniqueValue(),
                answer: answer.getValue('answer') || '',
            };

            if (isCompletedQuiz) {
                answerRow.is_correct = String(toBoolean(answer.getValue('is_correct')));
            }

            answers.push(answerRow);
        }

        result.questions.push({
            quiz_question_id: quizQuestion.getUniqueValue(),
            question_id: questionId,
            status: quizQuestion.getValue('status') || 'unanswered',
            question: question.getValue('question') || '',
            type: question.getValue('type') || 'single',
            rationale: question.getValue('rationale') || '',
            docs: question.getValue('docs') || '',
            selected_answer_ids: parseGlideList(quizQuestion.getValue('selected_answers')),
            answers,
        });
    }

    return result;
}

export function saveQuizProgressData(currentUserId: string, quizId: string, answers: any[]) {
    const quiz = findQuizForUser(currentUserId, quizId);
    if (!quiz) {
        return { error: 'Quiz not found for current user', status: 404 };
    }

    if (quiz.getValue('status') !== 'in_progress') {
        return { error: 'Quiz is already completed', status: 409 };
    }

    const expectedByQuestionId = getExpectedQuizQuestionIds(quizId);
    if (Object.keys(expectedByQuestionId).length === 0) {
        return { error: 'Quiz has no questions', status: 400 };
    }

    const updatedQuestionIds: string[] = [];

    for (let i = 0; i < answers.length; i += 1) {
        const row = answers[i];
        const questionId = row?.question_id;
        const selectedAnswerIdsRaw = row?.selected_answer_ids;
        const selectedAnswerIds = normalizeSelectedAnswerIds(selectedAnswerIdsRaw);

        if (!questionId || typeof questionId !== 'string') {
            return { error: 'answers[].question_id is required', status: 400 };
        }

        if (!isStringArray(selectedAnswerIdsRaw)) {
            return { error: 'answers[].selected_answer_ids must be a string[]', status: 400 };
        }

        const quizQuestionId = expectedByQuestionId[questionId];
        if (!quizQuestionId) {
            return { error: `Question '${questionId}' is not part of this quiz`, status: 400 };
        }

        if (updatedQuestionIds.indexOf(questionId) >= 0) {
            return { error: `Duplicate answer for question '${questionId}'`, status: 400 };
        }

        const validAnswerIdsMap = getValidAnswerIdsMap(questionId);
        for (let j = 0; j < selectedAnswerIds.length; j += 1) {
            const selectedId = selectedAnswerIds[j];
            if (!validAnswerIdsMap[selectedId]) {
                return { error: `Answer '${selectedId}' does not belong to question '${questionId}'`, status: 400 };
            }
        }

        const quizQuestionToUpdate = new GlideRecord('x_2119443_quiz_sim_quiz_question');
        if (!quizQuestionToUpdate.get(quizQuestionId)) {
            return { error: `Quiz question '${quizQuestionId}' not found`, status: 400 };
        }

        quizQuestionToUpdate.setValue('selected_answers', selectedAnswerIds.join(','));
        quizQuestionToUpdate.update();

        updatedQuestionIds.push(questionId);
    }

    return {
        status: 200,
        body: {
            quiz_id: quizId,
            saved_questions_count: String(updatedQuestionIds.length),
        },
    };
}

export function submitQuizData(currentUserId: string, quizId: string, answers: any[]) {
    const quiz = findQuizForUser(currentUserId, quizId);
    if (!quiz) {
        return { error: 'Quiz not found for current user', status: 404 };
    }

    if (quiz.getValue('status') !== 'in_progress') {
        return { error: 'Quiz is already completed', status: 409 };
    }

    const collectionId = quiz.getValue('collection') || '';
    const userCollection = findUserCollection(currentUserId, collectionId);
    if (!userCollection) {
        return { error: 'Saved collection not found for current user', status: 404 };
    }

    const expectedByQuestionId = getExpectedQuizQuestionIds(quizId);
    const expectedQuestionIds = Object.keys(expectedByQuestionId);
    if (expectedQuestionIds.length === 0) {
        return { error: 'Quiz has no questions', status: 400 };
    }

    const submittedByQuestionId: Record<string, string[]> = {};

    for (let i = 0; i < answers.length; i += 1) {
        const row = answers[i];
        const questionId = row?.question_id;
        const selectedAnswerIdsRaw = row?.selected_answer_ids;
        const selectedAnswerIds = normalizeSelectedAnswerIds(selectedAnswerIdsRaw);

        if (!questionId || typeof questionId !== 'string') {
            return { error: 'answers[].question_id is required', status: 400 };
        }

        if (!isStringArray(selectedAnswerIdsRaw)) {
            return { error: 'answers[].selected_answer_ids must be a string[]', status: 400 };
        }

        if (!expectedByQuestionId[questionId]) {
            return { error: `Question '${questionId}' is not part of this quiz`, status: 400 };
        }

        if (submittedByQuestionId[questionId]) {
            return { error: `Duplicate answer for question '${questionId}'`, status: 400 };
        }

        submittedByQuestionId[questionId] = selectedAnswerIds;
    }

    if (Object.keys(submittedByQuestionId).length !== expectedQuestionIds.length) {
        return { error: 'All quiz questions must be answered in submit payload', status: 400 };
    }

    let correctCount = 0;
    let failedCount = 0;
    const correctQuestionIds: string[] = [];
    const failedQuestionIds: string[] = [];
    const processedQuestionIds: string[] = [];
    const questionResults: Array<{ question_id: string; status: 'correct' | 'failed' }> = [];

    for (let i = 0; i < expectedQuestionIds.length; i += 1) {
        const questionId = expectedQuestionIds[i];
        const selectedAnswerIds = submittedByQuestionId[questionId] || [];
        const validAnswerIdsMap: Record<string, true> = {};
        const correctAnswerIdsMap: Record<string, true> = {};

        const answer = new GlideRecord('x_2119443_quiz_sim_answer');
        answer.addQuery('question', questionId);
        answer.query();

        while (answer.next()) {
            const answerId = answer.getUniqueValue();
            validAnswerIdsMap[answerId] = true;

            if (toBoolean(answer.getValue('is_correct'))) {
                correctAnswerIdsMap[answerId] = true;
            }
        }

        for (let j = 0; j < selectedAnswerIds.length; j += 1) {
            const selectedId = selectedAnswerIds[j];
            if (!validAnswerIdsMap[selectedId]) {
                return { error: `Answer '${selectedId}' does not belong to question '${questionId}'`, status: 400 };
            }
        }

        const selectedMap = toMembershipMap(selectedAnswerIds);
        const selectedCount = mapKeys(selectedMap).length;
        const correctCountForQuestion = mapKeys(correctAnswerIdsMap).length;

        let isCorrect = selectedCount === correctCountForQuestion;
        if (isCorrect) {
            const correctIds = mapKeys(correctAnswerIdsMap);
            for (let j = 0; j < correctIds.length; j += 1) {
                if (!selectedMap[correctIds[j]]) {
                    isCorrect = false;
                    break;
                }
            }
        }

        const quizQuestionId = expectedByQuestionId[questionId];
        const quizQuestionToUpdate = new GlideRecord('x_2119443_quiz_sim_quiz_question');
        if (!quizQuestionToUpdate.get(quizQuestionId)) {
            return { error: `Quiz question '${quizQuestionId}' not found`, status: 400 };
        }

        quizQuestionToUpdate.setValue('selected_answers', selectedAnswerIds.join(','));
        quizQuestionToUpdate.setValue('status', isCorrect ? 'correct' : 'failed');
        quizQuestionToUpdate.update();

        processedQuestionIds.push(questionId);
        if (isCorrect) {
            correctCount += 1;
            correctQuestionIds.push(questionId);
            questionResults.push({ question_id: questionId, status: 'correct' });
        } else {
            failedCount += 1;
            failedQuestionIds.push(questionId);
            questionResults.push({ question_id: questionId, status: 'failed' });
        }
    }

    const scorePercent = Math.round((correctCount / expectedQuestionIds.length) * 100);

    quiz.setValue('status', 'completed');
    quiz.setValue('result', scorePercent);
    quiz.update();

    const neverSeenMap = toMembershipMap(parseGlideList(userCollection.getValue('never_seen_questions')));
    const correctMap = toMembershipMap(parseGlideList(userCollection.getValue('correct_questions')));
    const everFailedMap = toMembershipMap(parseGlideList(userCollection.getValue('ever_failed_questions')));
    const lastAttemptFailedMap = toMembershipMap(
        parseGlideList(userCollection.getValue('last_attempt_failed_questions'))
    );

    for (let i = 0; i < processedQuestionIds.length; i += 1) {
        delete neverSeenMap[processedQuestionIds[i]];
    }

    for (let i = 0; i < correctQuestionIds.length; i += 1) {
        const questionId = correctQuestionIds[i];
        correctMap[questionId] = true;
        delete lastAttemptFailedMap[questionId];
    }

    for (let i = 0; i < failedQuestionIds.length; i += 1) {
        const questionId = failedQuestionIds[i];
        everFailedMap[questionId] = true;
        lastAttemptFailedMap[questionId] = true;
    }

    userCollection.setValue('never_seen_questions', mapKeys(neverSeenMap).join(','));
    userCollection.setValue('correct_questions', mapKeys(correctMap).join(','));
    userCollection.setValue('ever_failed_questions', mapKeys(everFailedMap).join(','));
    userCollection.setValue('last_attempt_failed_questions', mapKeys(lastAttemptFailedMap).join(','));
    userCollection.update();

    return {
        status: 200,
        body: {
            quiz_id: quizId,
            total_questions: String(expectedQuestionIds.length),
            correct_count: String(correctCount),
            failed_count: String(failedCount),
            score_percent: String(scorePercent),
            question_results: questionResults,
        },
    };
}
