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

    const collectionId = body.collection_id || body.collectionId || body.collection;
    if (!collectionId) {
        response.setStatus(400);
        response.setBody({ error: 'collection_id is required' });
        return;
    }

    const existing = new GlideRecord('x_2119443_test_sim_user_collection');
    existing.addQuery('user', currentUserId);
    existing.addQuery('collection', collectionId);
    existing.query();

    if (existing.next()) {
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

    const collectionId = body.collection_id || body.collectionId || body.collection;
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
    const collectionPayload = payload.collection || payload;

    if (!collectionPayload || !collectionPayload.name) {
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

                const isCorrect = toBoolean(answerPayload.is_correct ?? answerPayload.isCorrect ?? false);
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
