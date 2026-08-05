import { GlideRecord, gs } from '@servicenow/glide';

function parseBody(request: any) {
    if (request.body && request.body.data) {
        return request.body.data;
    }

    if (request.body && request.body.dataString) {
        return JSON.parse(request.body.dataString);
    }

    return {};
}

function toBoolean(value: any) {
    if (typeof value === 'string') {
        const normalized = value.trim().toLowerCase();
        return normalized === 'true' || normalized === '1';
    }

    return value === true || value === 1;
}

function getQueryParam(request: any, name: string): string | undefined {
    const raw = request?.queryParams?.[name];

    if (raw !== undefined && raw !== null) {
        if (typeof raw === 'object') {
            if (Array.isArray(raw) && raw.length > 0) {
                return String(raw[0]);
            }

            if ('value' in raw) {
                return String(raw.value);
            }
        }

        return String(raw);
    }

    if (typeof request?.getQueryParameter === 'function') {
        const value = request.getQueryParameter(name);
        if (value !== undefined && value !== null) {
            return String(value);
        }
    }

    if (typeof request?.getParameter === 'function') {
        const value = request.getParameter(name);
        if (value !== undefined && value !== null) {
            return String(value);
        }
    }

    return undefined;
}

function getCollectionQuestionIds(collectionId: string): string[] {
    const questionIds: string[] = [];

    const question = new GlideRecord('x_2119443_quiz_sim_question');
    question.addQuery('collection', collectionId);
    question.query();

    while (question.next()) {
        questionIds.push(question.getUniqueValue());
    }

    return questionIds;
}

function parseGlideList(value: string | null): string[] {
    if (!value) {
        return [];
    }

    return value
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
}

function pickRandomItems(items: string[], maxCount: number): string[] {
    const shuffled = [...items];

    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }

    return shuffled.slice(0, Math.max(0, maxCount));
}

function toMembershipMap(items: string[]): Record<string, true> {
    const map: Record<string, true> = {};

    for (let i = 0; i < items.length; i += 1) {
        const value = String(items[i] || '').trim();
        if (value) {
            map[value] = true;
        }
    }

    return map;
}

function mapKeys(map: Record<string, true>): string[] {
    return Object.keys(map);
}

function normalizeSelectedAnswerIds(value: any): string[] {
    if (!Array.isArray(value)) {
        return [];
    }

    const map: Record<string, true> = {};
    for (let i = 0; i < value.length; i += 1) {
        const id = String(value[i] || '').trim();
        if (id) {
            map[id] = true;
        }
    }

    return Object.keys(map);
}

function isStringArray(value: any): value is string[] {
    if (!Array.isArray(value)) {
        return false;
    }

    for (let i = 0; i < value.length; i += 1) {
        if (typeof value[i] !== 'string') {
            return false;
        }
    }

    return true;
}

export function getCurrentUserRoles(request: any, response: any) {
    const isUser = gs.hasRole('x_2119443_quiz_sim.user');
    const access: 'user' | 'none' = isUser ? 'user' : 'none';

    response.setBody({
        is_user: String(isUser),
        access,
    });
}

export function getCollectionsList(request: any, response: any) {
    const currentUserId = gs.getUserID();
    const savedOnlyParam = getQueryParam(request, 'saved_only');
    const savedOnly = toBoolean(savedOnlyParam);
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

    response.setBody(result);
}

export function saveCollectionForCurrentUser(request: any, response: any) {
    const currentUserId = gs.getUserID();
    const body: any = parseBody(request);

    const collectionId = body.collection_id;
    if (!collectionId) {
        response.setStatus(400);
        response.setBody({ error: 'collection_id is required' });
        return;
    }

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

        response.setBody({
            sys_id: existing.getUniqueValue(),
            user: currentUserId,
            collection: collectionId,
            created: 'false',
        });
        return;
    }

    const record = new GlideRecord('x_2119443_quiz_sim_user_collection');
    record.initialize();
    record.setValue('user', currentUserId);
    record.setValue('collection', collectionId);
    record.setValue('never_seen_questions', neverSeenValue);
    const insertedId = record.insert();

    response.setStatus(201);
    response.setBody({
        sys_id: insertedId,
        user: currentUserId,
        collection: collectionId,
        created: 'true',
    });
}

export function removeCollectionForCurrentUser(request: any, response: any) {
    const currentUserId = gs.getUserID();
    const body: any = parseBody(request);

    const collectionId = body.collection_id;
    if (!collectionId) {
        response.setStatus(400);
        response.setBody({ error: 'collection_id is required' });
        return;
    }

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

    response.setBody({
        user: currentUserId,
        collection: collectionId,
        removed: String(removed),
    });
}

export function publishCollection(request: any, response: any) {
    if (!gs.hasRole('x_2119443_quiz_sim.user')) {
        response.setStatus(403);
        response.setBody({ error: 'Only users with role x_2119443_quiz_sim.user can publish collections' });
        return;
    }

    const payload: any = parseBody(request);
    const collectionPayload = payload?.collection;

    if (!collectionPayload || typeof collectionPayload !== 'object') {
        response.setStatus(400);
        response.setBody({ error: 'collection object is required' });
        return;
    }

    if (!collectionPayload.name) {
        response.setStatus(400);
        response.setBody({ error: 'collection.name is required' });
        return;
    }

    const questions = Array.isArray(collectionPayload.questions) ? collectionPayload.questions : [];
    if (questions.length === 0) {
        response.setStatus(400);
        response.setBody({ error: 'At least one question is required' });
        return;
    }

    const createdQuestionIds: string[] = [];
    const createdAnswerIds: string[] = [];
    let createdCollectionId = '';

    try {
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

        response.setStatus(201);
        response.setBody({
            collection_id: createdCollectionId,
            questions_created: String(createdQuestionIds.length),
            answers_created: String(createdAnswerIds.length),
        });
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

        response.setStatus(400);
        response.setBody({ error: error?.message || 'Failed to publish collection' });
    }
}

export function getOpenCollectionOverview(request: any, response: any) {
    const currentUserId = gs.getUserID();
    const collectionId = getQueryParam(request, 'collection_id');

    if (!collectionId) {
        response.setStatus(400);
        response.setBody({ error: 'collection_id is required' });
        return;
    }

    const userCollection = new GlideRecord('x_2119443_quiz_sim_user_collection');
    userCollection.addQuery('user', currentUserId);
    userCollection.addQuery('collection', collectionId);
    userCollection.query();

    if (!userCollection.next()) {
        response.setStatus(404);
        response.setBody({ error: 'Saved collection not found for current user' });
        return;
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

    response.setBody({
        stats: {
            never_seen_count: String(neverSeen.length),
            correct_count: String(correct.length),
            ever_failed_count: String(everFailed.length),
            last_attempt_failed_count: String(lastAttemptFailed.length),
        },
        question_groups: {
            never_seen: neverSeen,
            correct: correct,
            ever_failed: everFailed,
            last_attempt_failed: lastAttemptFailed,
        },
        quizzes,
        questions,
    });
}

export function createCollectionQuiz(request: any, response: any) {
    const currentUserId = gs.getUserID();
    const body: any = parseBody(request);

    const collectionId = body.collection_id;
    const requestedCountRaw = body.question_count;
    const requestedCount = typeof requestedCountRaw === 'string' ? parseInt(requestedCountRaw, 10) : NaN;
    const mode = body.mode;

    if (!collectionId) {
        response.setStatus(400);
        response.setBody({ error: 'collection_id is required' });
        return;
    }

    if (typeof requestedCountRaw !== 'string' || !['10', '20', '40'].includes(requestedCountRaw)) {
        response.setStatus(400);
        response.setBody({ error: "question_count must be one of: '10', '20', '40'" });
        return;
    }

    if (typeof mode !== 'string' || !['never_seen', 'random', 'last_attempt_failed', 'ever_failed'].includes(mode)) {
        response.setStatus(400);
        response.setBody({ error: 'mode must be one of: never_seen, random, last_attempt_failed, ever_failed' });
        return;
    }

    const userCollection = new GlideRecord('x_2119443_quiz_sim_user_collection');
    userCollection.addQuery('user', currentUserId);
    userCollection.addQuery('collection', collectionId);
    userCollection.query();

    if (!userCollection.next()) {
        response.setStatus(404);
        response.setBody({ error: 'Saved collection not found for current user' });
        return;
    }

    let sourceQuestionIds: string[] = [];

    if (mode === 'never_seen') {
        sourceQuestionIds = parseGlideList(userCollection.getValue('never_seen_questions'));
    } else if (mode === 'last_attempt_failed') {
        sourceQuestionIds = parseGlideList(userCollection.getValue('last_attempt_failed_questions'));
    } else if (mode === 'ever_failed') {
        sourceQuestionIds = parseGlideList(userCollection.getValue('ever_failed_questions'));
    } else {
        sourceQuestionIds = getCollectionQuestionIds(String(collectionId));
    }

    if (sourceQuestionIds.length === 0) {
        response.setStatus(400);
        response.setBody({ error: `No questions available for mode '${mode}'` });
        return;
    }

    const selectedQuestionIds = pickRandomItems(sourceQuestionIds, Math.min(requestedCount, sourceQuestionIds.length));
    if (selectedQuestionIds.length === 0) {
        response.setStatus(400);
        response.setBody({ error: 'Unable to select questions for the new quiz' });
        return;
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

        response.setStatus(201);
        response.setBody({
            quiz_id: createdQuizId,
            collection_id: collectionId,
            created_on: createdOn,
            mode,
            requested_question_count: requestedCountRaw,
            selected_question_count: String(selectedQuestionIds.length),
        });
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

        response.setStatus(400);
        response.setBody({ error: error?.message || 'Failed to create quiz' });
    }
}

export function getQuizDetail(request: any, response: any) {
    const currentUserId = gs.getUserID();
    const quizId = getQueryParam(request, 'quiz_id');

    if (!quizId) {
        response.setStatus(400);
        response.setBody({ error: 'quiz_id is required' });
        return;
    }

    const quiz = new GlideRecord('x_2119443_quiz_sim_quiz');
    quiz.addQuery('sys_id', quizId);
    quiz.addQuery('user', currentUserId);
    quiz.query();

    if (!quiz.next()) {
        response.setStatus(404);
        response.setBody({ error: 'Quiz not found for current user' });
        return;
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

    response.setBody(result);
}

export function saveQuizProgress(request: any, response: any) {
    const currentUserId = gs.getUserID();
    const body: any = parseBody(request);

    const quizId = body.quiz_id;
    const answers = body.answers;

    if (!quizId || typeof quizId !== 'string') {
        response.setStatus(400);
        response.setBody({ error: 'quiz_id is required' });
        return;
    }

    if (!Array.isArray(answers)) {
        response.setStatus(400);
        response.setBody({ error: 'answers array is required' });
        return;
    }

    const quiz = new GlideRecord('x_2119443_quiz_sim_quiz');
    quiz.addQuery('sys_id', quizId);
    quiz.addQuery('user', currentUserId);
    quiz.query();

    if (!quiz.next()) {
        response.setStatus(404);
        response.setBody({ error: 'Quiz not found for current user' });
        return;
    }

    if (quiz.getValue('status') !== 'in_progress') {
        response.setStatus(409);
        response.setBody({ error: 'Quiz is already completed' });
        return;
    }

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

    if (Object.keys(expectedByQuestionId).length === 0) {
        response.setStatus(400);
        response.setBody({ error: 'Quiz has no questions' });
        return;
    }

    const updatedQuestionIds: string[] = [];

    for (let i = 0; i < answers.length; i += 1) {
        const row = answers[i];
        const questionId = row?.question_id;
        const selectedAnswerIdsRaw = row?.selected_answer_ids;
        const selectedAnswerIds = normalizeSelectedAnswerIds(selectedAnswerIdsRaw);

        if (!questionId || typeof questionId !== 'string') {
            response.setStatus(400);
            response.setBody({ error: 'answers[].question_id is required' });
            return;
        }

        if (!isStringArray(selectedAnswerIdsRaw)) {
            response.setStatus(400);
            response.setBody({ error: 'answers[].selected_answer_ids must be a string[]' });
            return;
        }

        const quizQuestionId = expectedByQuestionId[questionId];
        if (!quizQuestionId) {
            response.setStatus(400);
            response.setBody({ error: `Question '${questionId}' is not part of this quiz` });
            return;
        }

        if (updatedQuestionIds.indexOf(questionId) >= 0) {
            response.setStatus(400);
            response.setBody({ error: `Duplicate answer for question '${questionId}'` });
            return;
        }

        const validAnswerIdsMap: Record<string, true> = {};
        const answer = new GlideRecord('x_2119443_quiz_sim_answer');
        answer.addQuery('question', questionId);
        answer.query();

        while (answer.next()) {
            validAnswerIdsMap[answer.getUniqueValue()] = true;
        }

        for (let j = 0; j < selectedAnswerIds.length; j += 1) {
            const selectedId = selectedAnswerIds[j];
            if (!validAnswerIdsMap[selectedId]) {
                response.setStatus(400);
                response.setBody({ error: `Answer '${selectedId}' does not belong to question '${questionId}'` });
                return;
            }
        }

        const quizQuestionToUpdate = new GlideRecord('x_2119443_quiz_sim_quiz_question');
        if (!quizQuestionToUpdate.get(quizQuestionId)) {
            response.setStatus(400);
            response.setBody({ error: `Quiz question '${quizQuestionId}' not found` });
            return;
        }

        quizQuestionToUpdate.setValue('selected_answers', selectedAnswerIds.join(','));
        quizQuestionToUpdate.update();

        updatedQuestionIds.push(questionId);
    }

    response.setBody({
        quiz_id: quizId,
        saved_questions_count: String(updatedQuestionIds.length),
    });
}

export function submitQuiz(request: any, response: any) {
    const currentUserId = gs.getUserID();
    const body: any = parseBody(request);

    const quizId = body.quiz_id;
    const answers = body.answers;

    if (!quizId || typeof quizId !== 'string') {
        response.setStatus(400);
        response.setBody({ error: 'quiz_id is required' });
        return;
    }

    if (!Array.isArray(answers)) {
        response.setStatus(400);
        response.setBody({ error: 'answers array is required' });
        return;
    }

    const quiz = new GlideRecord('x_2119443_quiz_sim_quiz');
    quiz.addQuery('sys_id', quizId);
    quiz.addQuery('user', currentUserId);
    quiz.query();

    if (!quiz.next()) {
        response.setStatus(404);
        response.setBody({ error: 'Quiz not found for current user' });
        return;
    }

    if (quiz.getValue('status') !== 'in_progress') {
        response.setStatus(409);
        response.setBody({ error: 'Quiz is already completed' });
        return;
    }

    const collectionId = quiz.getValue('collection') || '';
    const userCollection = new GlideRecord('x_2119443_quiz_sim_user_collection');
    userCollection.addQuery('user', currentUserId);
    userCollection.addQuery('collection', collectionId);
    userCollection.query();

    if (!userCollection.next()) {
        response.setStatus(404);
        response.setBody({ error: 'Saved collection not found for current user' });
        return;
    }

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

    const expectedQuestionIds = Object.keys(expectedByQuestionId);
    if (expectedQuestionIds.length === 0) {
        response.setStatus(400);
        response.setBody({ error: 'Quiz has no questions' });
        return;
    }

    const submittedByQuestionId: Record<string, string[]> = {};

    for (let i = 0; i < answers.length; i += 1) {
        const row = answers[i];
        const questionId = row?.question_id;
        const selectedAnswerIdsRaw = row?.selected_answer_ids;
        const selectedAnswerIds = normalizeSelectedAnswerIds(selectedAnswerIdsRaw);

        if (!questionId || typeof questionId !== 'string') {
            response.setStatus(400);
            response.setBody({ error: 'answers[].question_id is required' });
            return;
        }

        if (!isStringArray(selectedAnswerIdsRaw)) {
            response.setStatus(400);
            response.setBody({ error: 'answers[].selected_answer_ids must be a string[]' });
            return;
        }

        if (!expectedByQuestionId[questionId]) {
            response.setStatus(400);
            response.setBody({ error: `Question '${questionId}' is not part of this quiz` });
            return;
        }

        if (submittedByQuestionId[questionId]) {
            response.setStatus(400);
            response.setBody({ error: `Duplicate answer for question '${questionId}'` });
            return;
        }

        submittedByQuestionId[questionId] = selectedAnswerIds;
    }

    if (Object.keys(submittedByQuestionId).length !== expectedQuestionIds.length) {
        response.setStatus(400);
        response.setBody({ error: 'All quiz questions must be answered in submit payload' });
        return;
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
                response.setStatus(400);
                response.setBody({ error: `Answer '${selectedId}' does not belong to question '${questionId}'` });
                return;
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
            response.setStatus(400);
            response.setBody({ error: `Quiz question '${quizQuestionId}' not found` });
            return;
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

    response.setBody({
        quiz_id: quizId,
        total_questions: String(expectedQuestionIds.length),
        correct_count: String(correctCount),
        failed_count: String(failedCount),
        score_percent: String(scorePercent),
        question_results: questionResults,
    });
}
