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

    const question = new GlideRecord('x_2119443_test_sim_question');
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

export function getCurrentUserRoles(request: any, response: any) {
    const isAdmin = gs.hasRole('x_2119443_test_sim.admin');
    const isUser = gs.hasRole('x_2119443_test_sim.user');

    let access: 'admin' | 'user' | 'none' = 'none';
    if (isAdmin) {
        access = 'admin';
    } else if (isUser) {
        access = 'user';
    }

    response.setBody({
        is_admin: isAdmin,
        is_user: isUser,
        access,
    });
}

export function getCollectionsList(request: any, response: any) {
    const currentUserId = gs.getUserID();
    const savedOnlyParam = getQueryParam(request, 'saved_only');
    const savedOnly = toBoolean(savedOnlyParam);
    const savedByCollection: Record<string, boolean> = {};

    const userCollection = new GlideRecord('x_2119443_test_sim_user_collection');
    userCollection.addQuery('user', currentUserId);
    userCollection.query();

    while (userCollection.next()) {
        const collectionId = userCollection.getValue('collection');
        if (collectionId) {
            savedByCollection[collectionId] = true;
        }
    }

    const collection = new GlideRecord('x_2119443_test_sim_collection');
    collection.orderByDesc('name');
    collection.query();

    const result: Array<{ sys_id: string; name: string; is_saved: boolean }> = [];

    while (collection.next()) {
        const collectionId = collection.getUniqueValue();
        const isSaved = savedByCollection[collectionId] === true;

        if (savedOnly && !isSaved) {
            continue;
        }

        result.push({
            sys_id: collectionId,
            name: collection.getValue('name'),
            is_saved: isSaved,
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

    const existing = new GlideRecord('x_2119443_test_sim_user_collection');
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
            created: false,
        });
        return;
    }

    const record = new GlideRecord('x_2119443_test_sim_user_collection');
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
        created: true,
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

    const existing = new GlideRecord('x_2119443_test_sim_user_collection');
    existing.addQuery('user', currentUserId);
    existing.addQuery('collection', collectionId);
    existing.query();

    let removed = 0;
    while (existing.next()) {
        existing.deleteRecord();
        removed += 1;
    }

    response.setBody({
        user: currentUserId,
        collection: collectionId,
        removed,
    });
}

export function publishCollection(request: any, response: any) {
    if (!gs.hasRole('x_2119443_test_sim.admin')) {
        response.setStatus(403);
        response.setBody({ error: 'Only admins can publish collections' });
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
        const collection = new GlideRecord('x_2119443_test_sim_collection');
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

            const question = new GlideRecord('x_2119443_test_sim_question');
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

                const isCorrect = toBoolean(answerPayload.is_correct ?? false);
                if (isCorrect) {
                    hasCorrectAnswer = true;
                }

                const answer = new GlideRecord('x_2119443_test_sim_answer');
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
            questions_created: createdQuestionIds.length,
            answers_created: createdAnswerIds.length,
        });
    } catch (error: any) {
        for (let i = createdAnswerIds.length - 1; i >= 0; i -= 1) {
            const grAnswer = new GlideRecord('x_2119443_test_sim_answer');
            if (grAnswer.get(createdAnswerIds[i])) {
                grAnswer.deleteRecord();
            }
        }

        for (let i = createdQuestionIds.length - 1; i >= 0; i -= 1) {
            const grQuestion = new GlideRecord('x_2119443_test_sim_question');
            if (grQuestion.get(createdQuestionIds[i])) {
                grQuestion.deleteRecord();
            }
        }

        if (createdCollectionId) {
            const grCollection = new GlideRecord('x_2119443_test_sim_collection');
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

    const userCollection = new GlideRecord('x_2119443_test_sim_user_collection');
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

    const tests: Array<{ sys_id: string; status: string; result: number; created_on: string }> = [];
    const test = new GlideRecord('x_2119443_test_sim_test');
    test.addQuery('user', currentUserId);
    test.addQuery('collection', collectionId);
    test.orderByDesc('sys_created_on');
    test.query();

    while (test.next()) {
        tests.push({
            sys_id: test.getUniqueValue(),
            status: test.getValue('status') || 'in_progress',
            result: parseInt(test.getValue('result') || '0', 10),
            created_on: test.getValue('sys_created_on') || '',
        });
    }

    response.setBody({
        stats: {
            never_seen_count: neverSeen.length,
            correct_count: correct.length,
            ever_failed_count: everFailed.length,
            last_attempt_failed_count: lastAttemptFailed.length,
        },
        tests,
    });
}

export function createCollectionTest(request: any, response: any) {
    const currentUserId = gs.getUserID();
    const body: any = parseBody(request);

    const collectionId = body.collection_id;
    const requestedCountRaw = body.question_count;
    const requestedCount = typeof requestedCountRaw === 'number' ? requestedCountRaw : NaN;
    const mode = body.mode;

    if (!collectionId) {
        response.setStatus(400);
        response.setBody({ error: 'collection_id is required' });
        return;
    }

    if (![10, 20, 40].includes(requestedCount)) {
        response.setStatus(400);
        response.setBody({ error: 'question_count must be one of: 10, 20, 40' });
        return;
    }

    if (typeof mode !== 'string' || !['never_seen', 'random', 'last_attempt_failed', 'ever_failed'].includes(mode)) {
        response.setStatus(400);
        response.setBody({ error: 'mode must be one of: never_seen, random, last_attempt_failed, ever_failed' });
        return;
    }

    const userCollection = new GlideRecord('x_2119443_test_sim_user_collection');
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
        response.setBody({ error: 'Unable to select questions for the new test' });
        return;
    }

    const createdTestQuestionIds: string[] = [];
    let createdTestId = '';

    try {
        const test = new GlideRecord('x_2119443_test_sim_test');
        test.initialize();
        test.setValue('collection', collectionId);
        test.setValue('user', currentUserId);
        test.setValue('status', 'in_progress');
        test.setValue('result', 0);
        createdTestId = String(test.insert());

        for (let i = 0; i < selectedQuestionIds.length; i += 1) {
            const testQuestion = new GlideRecord('x_2119443_test_sim_test_question');
            testQuestion.initialize();
            testQuestion.setValue('test', createdTestId);
            testQuestion.setValue('question', selectedQuestionIds[i]);
            testQuestion.setValue('status', 'unanswered');
            const createdTestQuestionId = String(testQuestion.insert());
            createdTestQuestionIds.push(createdTestQuestionId);
        }

        response.setStatus(201);
        response.setBody({
            test_id: createdTestId,
            collection_id: collectionId,
            mode,
            requested_question_count: requestedCount,
            selected_question_count: selectedQuestionIds.length,
        });
    } catch (error: any) {
        for (let i = createdTestQuestionIds.length - 1; i >= 0; i -= 1) {
            const grTestQuestion = new GlideRecord('x_2119443_test_sim_test_question');
            if (grTestQuestion.get(createdTestQuestionIds[i])) {
                grTestQuestion.deleteRecord();
            }
        }

        if (createdTestId) {
            const grTest = new GlideRecord('x_2119443_test_sim_test');
            if (grTest.get(createdTestId)) {
                grTest.deleteRecord();
            }
        }

        response.setStatus(400);
        response.setBody({ error: error?.message || 'Failed to create test' });
    }
}

export function getTestDetail(request: any, response: any) {
    const currentUserId = gs.getUserID();
    const testId = getQueryParam(request, 'test_id');

    if (!testId) {
        response.setStatus(400);
        response.setBody({ error: 'test_id is required' });
        return;
    }

    const test = new GlideRecord('x_2119443_test_sim_test');
    test.addQuery('sys_id', testId);
    test.addQuery('user', currentUserId);
    test.query();

    if (!test.next()) {
        response.setStatus(404);
        response.setBody({ error: 'Test not found for current user' });
        return;
    }

    const result = {
        test: {
            sys_id: test.getUniqueValue(),
            collection_id: test.getValue('collection') || '',
            collection_name: test.getDisplayValue('collection') || '',
            status: test.getValue('status') || 'in_progress',
            result: parseInt(test.getValue('result') || '0', 10),
        },
        questions: [] as Array<{
            test_question_id: string;
            question_id: string;
            question: string;
            type: string;
            rationale: string;
            docs: string;
            selected_answer_ids: string[];
            answers: Array<{ sys_id: string; answer: string }>;
        }>,
    };

    const testQuestion = new GlideRecord('x_2119443_test_sim_test_question');
    testQuestion.addQuery('test', testId);
    testQuestion.orderBy('sys_created_on');
    testQuestion.query();

    while (testQuestion.next()) {
        const questionId = testQuestion.getValue('question');
        if (!questionId) {
            continue;
        }

        const question = new GlideRecord('x_2119443_test_sim_question');
        if (!question.get(questionId)) {
            continue;
        }

        const answers: Array<{ sys_id: string; answer: string }> = [];
        const answer = new GlideRecord('x_2119443_test_sim_answer');
        answer.addQuery('question', questionId);
        answer.orderBy('sys_created_on');
        answer.query();

        while (answer.next()) {
            answers.push({
                sys_id: answer.getUniqueValue(),
                answer: answer.getValue('answer') || '',
            });
        }

        result.questions.push({
            test_question_id: testQuestion.getUniqueValue(),
            question_id: questionId,
            question: question.getValue('question') || '',
            type: question.getValue('type') || 'single',
            rationale: question.getValue('rationale') || '',
            docs: question.getValue('docs') || '',
            selected_answer_ids: parseGlideList(testQuestion.getValue('selected_answers')),
            answers,
        });
    }

    response.setBody(result);
}

export function saveTestProgress(request: any, response: any) {
    const currentUserId = gs.getUserID();
    const body: any = parseBody(request);

    const testId = body.test_id;
    const answers = body.answers;

    if (!testId || typeof testId !== 'string') {
        response.setStatus(400);
        response.setBody({ error: 'test_id is required' });
        return;
    }

    if (!Array.isArray(answers)) {
        response.setStatus(400);
        response.setBody({ error: 'answers array is required' });
        return;
    }

    const test = new GlideRecord('x_2119443_test_sim_test');
    test.addQuery('sys_id', testId);
    test.addQuery('user', currentUserId);
    test.query();

    if (!test.next()) {
        response.setStatus(404);
        response.setBody({ error: 'Test not found for current user' });
        return;
    }

    if (test.getValue('status') !== 'in_progress') {
        response.setStatus(409);
        response.setBody({ error: 'Test is already completed' });
        return;
    }

    const expectedByQuestionId: Record<string, string> = {};
    const testQuestion = new GlideRecord('x_2119443_test_sim_test_question');
    testQuestion.addQuery('test', testId);
    testQuestion.query();

    while (testQuestion.next()) {
        const questionId = testQuestion.getValue('question') || '';
        if (questionId) {
            expectedByQuestionId[questionId] = testQuestion.getUniqueValue();
        }
    }

    if (Object.keys(expectedByQuestionId).length === 0) {
        response.setStatus(400);
        response.setBody({ error: 'Test has no questions' });
        return;
    }

    const updatedQuestionIds: string[] = [];

    for (let i = 0; i < answers.length; i += 1) {
        const row = answers[i];
        const questionId = row?.question_id;
        const selectedAnswerIds = normalizeSelectedAnswerIds(row?.selected_answer_ids);

        if (!questionId || typeof questionId !== 'string') {
            response.setStatus(400);
            response.setBody({ error: 'answers[].question_id is required' });
            return;
        }

        if (!Array.isArray(row?.selected_answer_ids)) {
            response.setStatus(400);
            response.setBody({ error: 'answers[].selected_answer_ids must be an array' });
            return;
        }

        const testQuestionId = expectedByQuestionId[questionId];
        if (!testQuestionId) {
            response.setStatus(400);
            response.setBody({ error: `Question '${questionId}' is not part of this test` });
            return;
        }

        if (updatedQuestionIds.indexOf(questionId) >= 0) {
            response.setStatus(400);
            response.setBody({ error: `Duplicate answer for question '${questionId}'` });
            return;
        }

        const validAnswerIdsMap: Record<string, true> = {};
        const answer = new GlideRecord('x_2119443_test_sim_answer');
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

        const testQuestionToUpdate = new GlideRecord('x_2119443_test_sim_test_question');
        if (!testQuestionToUpdate.get(testQuestionId)) {
            response.setStatus(400);
            response.setBody({ error: `Test question '${testQuestionId}' not found` });
            return;
        }

        testQuestionToUpdate.setValue('selected_answers', selectedAnswerIds.join(','));
        testQuestionToUpdate.update();

        updatedQuestionIds.push(questionId);
    }

    response.setBody({
        test_id: testId,
        saved_questions_count: updatedQuestionIds.length,
    });
}

export function submitTest(request: any, response: any) {
    const currentUserId = gs.getUserID();
    const body: any = parseBody(request);

    const testId = body.test_id;
    const answers = body.answers;

    if (!testId || typeof testId !== 'string') {
        response.setStatus(400);
        response.setBody({ error: 'test_id is required' });
        return;
    }

    if (!Array.isArray(answers)) {
        response.setStatus(400);
        response.setBody({ error: 'answers array is required' });
        return;
    }

    const test = new GlideRecord('x_2119443_test_sim_test');
    test.addQuery('sys_id', testId);
    test.addQuery('user', currentUserId);
    test.query();

    if (!test.next()) {
        response.setStatus(404);
        response.setBody({ error: 'Test not found for current user' });
        return;
    }

    if (test.getValue('status') !== 'in_progress') {
        response.setStatus(409);
        response.setBody({ error: 'Test is already completed' });
        return;
    }

    const collectionId = test.getValue('collection') || '';
    const userCollection = new GlideRecord('x_2119443_test_sim_user_collection');
    userCollection.addQuery('user', currentUserId);
    userCollection.addQuery('collection', collectionId);
    userCollection.query();

    if (!userCollection.next()) {
        response.setStatus(404);
        response.setBody({ error: 'Saved collection not found for current user' });
        return;
    }

    const expectedByQuestionId: Record<string, string> = {};
    const testQuestion = new GlideRecord('x_2119443_test_sim_test_question');
    testQuestion.addQuery('test', testId);
    testQuestion.query();

    while (testQuestion.next()) {
        const questionId = testQuestion.getValue('question') || '';
        if (questionId) {
            expectedByQuestionId[questionId] = testQuestion.getUniqueValue();
        }
    }

    const expectedQuestionIds = Object.keys(expectedByQuestionId);
    if (expectedQuestionIds.length === 0) {
        response.setStatus(400);
        response.setBody({ error: 'Test has no questions' });
        return;
    }

    const submittedByQuestionId: Record<string, string[]> = {};

    for (let i = 0; i < answers.length; i += 1) {
        const row = answers[i];
        const questionId = row?.question_id;
        const selectedAnswerIds = normalizeSelectedAnswerIds(row?.selected_answer_ids);

        if (!questionId || typeof questionId !== 'string') {
            response.setStatus(400);
            response.setBody({ error: 'answers[].question_id is required' });
            return;
        }

        if (!Array.isArray(row?.selected_answer_ids)) {
            response.setStatus(400);
            response.setBody({ error: 'answers[].selected_answer_ids must be an array' });
            return;
        }

        if (!expectedByQuestionId[questionId]) {
            response.setStatus(400);
            response.setBody({ error: `Question '${questionId}' is not part of this test` });
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
        response.setBody({ error: 'All test questions must be answered in submit payload' });
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

        const answer = new GlideRecord('x_2119443_test_sim_answer');
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

        const testQuestionId = expectedByQuestionId[questionId];
        const testQuestionToUpdate = new GlideRecord('x_2119443_test_sim_test_question');
        if (!testQuestionToUpdate.get(testQuestionId)) {
            response.setStatus(400);
            response.setBody({ error: `Test question '${testQuestionId}' not found` });
            return;
        }

        testQuestionToUpdate.setValue('selected_answers', selectedAnswerIds.join(','));
        testQuestionToUpdate.setValue('status', isCorrect ? 'correct' : 'failed');
        testQuestionToUpdate.update();

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

    test.setValue('status', 'completed');
    test.setValue('result', scorePercent);
    test.update();

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
        test_id: testId,
        total_questions: expectedQuestionIds.length,
        correct_count: correctCount,
        failed_count: failedCount,
        score_percent: scorePercent,
        question_results: questionResults,
    });
}
