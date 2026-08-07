import { GlideRecord } from '@servicenow/glide';
import { parseGlideList, pickRandomItems, toBoolean } from './quiz-simulator-api-helpers';

export function getCollectionQuestionIds(collectionId: string): string[] {
    const questionIds: string[] = [];

    const question = new GlideRecord('x_2119443_quiz_sim_question');
    question.addQuery('collection', collectionId);
    question.query();

    while (question.next()) {
        questionIds.push(question.getUniqueValue());
    }

    return questionIds;
}

export function listCollectionsForUser(currentUserId: string, savedOnly: boolean) {
    const savedByCollection: Record<string, boolean> = {};

    const userCollection = new GlideRecord('x_2119443_quiz_sim_user_collection');
    userCollection.addQuery('user', currentUserId);
    userCollection.query();

    while (userCollection.next()) {
        const collectionId = userCollection.getValue('collection');
        if (collectionId) {
            savedByCollection[collectionId] = true;
        }
    }

    const collection = new GlideRecord('x_2119443_quiz_sim_collection');
    collection.orderByDesc('name');
    collection.query();

    const result: Array<{ sys_id: string; name: string; is_saved: string }> = [];

    while (collection.next()) {
        const collectionId = collection.getUniqueValue();
        const isSaved = savedByCollection[collectionId] === true;

        if (savedOnly && !isSaved) {
            continue;
        }

        result.push({
            sys_id: collectionId,
            name: collection.getValue('name'),
            is_saved: String(isSaved),
        });
    }

    return result;
}

export function saveCollectionForUser(currentUserId: string, collectionId: string) {
    const existing = new GlideRecord('x_2119443_quiz_sim_user_collection');
    existing.addQuery('user', currentUserId);
    existing.addQuery('collection', collectionId);
    existing.query();

    const questionIds = getCollectionQuestionIds(String(collectionId));
    const neverSeenValue = questionIds.join(',');

    if (existing.next()) {
        if (!existing.getValue('never_seen_questions')) {
            existing.setValue('never_seen_questions', neverSeenValue);
            existing.update();
        }

        return {
            status: 200,
            body: {
                sys_id: existing.getUniqueValue(),
                user: currentUserId,
                collection: collectionId,
                created: 'false',
            },
        };
    }

    const record = new GlideRecord('x_2119443_quiz_sim_user_collection');
    record.initialize();
    record.setValue('user', currentUserId);
    record.setValue('collection', collectionId);
    record.setValue('never_seen_questions', neverSeenValue);
    const insertedId = record.insert();

    return {
        status: 201,
        body: {
            sys_id: insertedId,
            user: currentUserId,
            collection: collectionId,
            created: 'true',
        },
    };
}

export function removeCollectionForUser(currentUserId: string, collectionId: string) {
    const existing = new GlideRecord('x_2119443_quiz_sim_user_collection');
    existing.addQuery('user', currentUserId);
    existing.addQuery('collection', collectionId);
    existing.query();

    const legacyQuizzes = new GlideRecord('x_2119443_quiz_sim_quiz');
    legacyQuizzes.addQuery('user', currentUserId);
    legacyQuizzes.addQuery('collection', collectionId);
    legacyQuizzes.query();

    while (legacyQuizzes.next()) {
        legacyQuizzes.deleteRecord();
    }

    let removed = 0;
    while (existing.next()) {
        existing.deleteRecord();
        removed += 1;
    }

    return {
        user: currentUserId,
        collection: collectionId,
        removed: String(removed),
    };
}

export function publishCollectionTree(collectionPayload: any) {
    const createdQuestionIds: string[] = [];
    const createdAnswerIds: string[] = [];
    let createdCollectionId = '';

    try {
        const questions = Array.isArray(collectionPayload.questions) ? collectionPayload.questions : [];
        const collection = new GlideRecord('x_2119443_quiz_sim_collection');
        collection.initialize();
        collection.setValue('name', String(collectionPayload.name));
        createdCollectionId = String(collection.insert());

        for (let qIndex = 0; qIndex < questions.length; qIndex += 1) {
            const questionPayload = questions[qIndex] || {};
            if (!questionPayload.question) {
                throw new Error(`Question at index ${qIndex} is missing field 'question'`);
            }

            const answers = Array.isArray(questionPayload.answers) ? questionPayload.answers : [];
            if (answers.length === 0) {
                throw new Error(`Question at index ${qIndex} must include at least one answer`);
            }

            const question = new GlideRecord('x_2119443_quiz_sim_question');
            question.initialize();
            question.setValue('collection', createdCollectionId);
            question.setValue('question', String(questionPayload.question));

            if (questionPayload.type) {
                question.setValue('type', String(questionPayload.type));
            }

            if (questionPayload.rationale) {
                question.setValue('rationale', String(questionPayload.rationale));
            }

            if (questionPayload.docs) {
                question.setValue('docs', String(questionPayload.docs));
            }

            const createdQuestionId = String(question.insert());
            createdQuestionIds.push(createdQuestionId);

            let hasCorrectAnswer = false;

            for (let aIndex = 0; aIndex < answers.length; aIndex += 1) {
                const answerPayload = answers[aIndex] || {};
                if (!answerPayload.answer) {
                    throw new Error(`Answer at index ${aIndex} in question ${qIndex} is missing field 'answer'`);
                }

                const isCorrectRaw = answerPayload.is_correct;
                if (isCorrectRaw !== undefined && typeof isCorrectRaw !== 'string') {
                    throw new Error(
                        `Answer at index ${aIndex} in question ${qIndex} must provide 'is_correct' as string`
                    );
                }

                const isCorrect = toBoolean(isCorrectRaw ?? 'false');
                if (isCorrect) {
                    hasCorrectAnswer = true;
                }

                const answer = new GlideRecord('x_2119443_quiz_sim_answer');
                answer.initialize();
                answer.setValue('question', createdQuestionId);
                answer.setValue('answer', String(answerPayload.answer));
                answer.setValue('is_correct', isCorrect);
                const createdAnswerId = String(answer.insert());
                createdAnswerIds.push(createdAnswerId);
            }

            if (!hasCorrectAnswer) {
                throw new Error(`Question at index ${qIndex} must have at least one correct answer`);
            }
        }

        return {
            collection_id: createdCollectionId,
            questions_created: String(createdQuestionIds.length),
            answers_created: String(createdAnswerIds.length),
        };
    } catch (error: any) {
        for (let i = createdAnswerIds.length - 1; i >= 0; i -= 1) {
            const grAnswer = new GlideRecord('x_2119443_quiz_sim_answer');
            if (grAnswer.get(createdAnswerIds[i])) {
                grAnswer.deleteRecord();
            }
        }

        for (let i = createdQuestionIds.length - 1; i >= 0; i -= 1) {
            const grQuestion = new GlideRecord('x_2119443_quiz_sim_question');
            if (grQuestion.get(createdQuestionIds[i])) {
                grQuestion.deleteRecord();
            }
        }

        if (createdCollectionId) {
            const grCollection = new GlideRecord('x_2119443_quiz_sim_collection');
            if (grCollection.get(createdCollectionId)) {
                grCollection.deleteRecord();
            }
        }

        throw error;
    }
}

export function getOpenCollectionOverviewData(currentUserId: string, collectionId: string) {
    const userCollection = new GlideRecord('x_2119443_quiz_sim_user_collection');
    userCollection.addQuery('user', currentUserId);
    userCollection.addQuery('collection', collectionId);
    userCollection.query();

    if (!userCollection.next()) {
        return null;
    }

    const neverSeen = parseGlideList(userCollection.getValue('never_seen_questions'));
    const correct = parseGlideList(userCollection.getValue('correct_questions'));
    const everFailed = parseGlideList(userCollection.getValue('ever_failed_questions'));
    const lastAttemptFailed = parseGlideList(userCollection.getValue('last_attempt_failed_questions'));
    const questions: Array<{
        sys_id: string;
        question: string;
        type: string;
        rationale: string;
        docs: string;
        answers: Array<{ sys_id: string; answer: string; is_correct: string }>;
    }> = [];

    const quizzes: Array<{
        sys_id: string;
        status: string;
        result: string;
        created_on: string;
        correct_count: string;
        total_questions: string;
    }> = [];

    const quiz = new GlideRecord('x_2119443_quiz_sim_quiz');
    quiz.addQuery('user', currentUserId);
    quiz.addQuery('collection', collectionId);
    quiz.orderByDesc('sys_created_on');
    quiz.query();

    while (quiz.next()) {
        const quizId = quiz.getUniqueValue();
        let totalQuestions = 0;
        let correctCount = 0;

        const quizQuestion = new GlideRecord('x_2119443_quiz_sim_quiz_question');
        quizQuestion.addQuery('quiz', quizId);
        quizQuestion.query();

        while (quizQuestion.next()) {
            totalQuestions += 1;

            if ((quizQuestion.getValue('status') || '') === 'correct') {
                correctCount += 1;
            }
        }

        quizzes.push({
            sys_id: quizId,
            status: quiz.getValue('status') || 'in_progress',
            result: String(parseInt(quiz.getValue('result') || '0', 10)),
            created_on: quiz.getValue('sys_created_on') || '',
            correct_count: String(correctCount),
            total_questions: String(totalQuestions),
        });
    }

    const question = new GlideRecord('x_2119443_quiz_sim_question');
    question.addQuery('collection', collectionId);
    question.orderBy('sys_created_on');
    question.query();

    while (question.next()) {
        const questionId = question.getUniqueValue();
        const answers: Array<{ sys_id: string; answer: string; is_correct: string }> = [];
        const answer = new GlideRecord('x_2119443_quiz_sim_answer');
        answer.addQuery('question', questionId);
        answer.orderBy('sys_created_on');
        answer.query();

        while (answer.next()) {
            answers.push({
                sys_id: answer.getUniqueValue(),
                answer: answer.getValue('answer') || '',
                is_correct: String(toBoolean(answer.getValue('is_correct'))),
            });
        }

        questions.push({
            sys_id: questionId,
            question: question.getValue('question') || '',
            type: question.getValue('type') || 'single',
            rationale: question.getValue('rationale') || '',
            docs: question.getValue('docs') || '',
            answers,
        });
    }

    return {
        stats: {
            never_seen_count: String(neverSeen.length),
            correct_count: String(correct.length),
            ever_failed_count: String(everFailed.length),
            last_attempt_failed_count: String(lastAttemptFailed.length),
        },
        question_groups: {
            never_seen: neverSeen,
            correct,
            ever_failed: everFailed,
            last_attempt_failed: lastAttemptFailed,
        },
        quizzes,
        questions,
    };
}

export function resolveQuestionPool(userCollection: any, collectionId: string, mode: string) {
    if (mode === 'never_seen') {
        return parseGlideList(userCollection.getValue('never_seen_questions'));
    }

    if (mode === 'last_attempt_failed') {
        return parseGlideList(userCollection.getValue('last_attempt_failed_questions'));
    }

    if (mode === 'ever_failed') {
        return parseGlideList(userCollection.getValue('ever_failed_questions'));
    }

    return getCollectionQuestionIds(String(collectionId));
}

export function pickQuizQuestions(sourceQuestionIds: string[], requestedCount: number) {
    return pickRandomItems(sourceQuestionIds, Math.min(requestedCount, sourceQuestionIds.length));
}