import { gs } from '@servicenow/glide';
import {
    getOpenCollectionOverviewData,
    listCollectionsForUser,
    publishCollectionTree,
    removeCollectionForUser,
    saveCollectionForUser,
} from './quiz-simulator-api-collections';
import { getQueryParam, parseBody, toBoolean } from './quiz-simulator-api-helpers';
import {
    createQuizForCollection,
    getQuizDetailData,
    saveQuizProgressData,
    submitQuizData,
} from './quiz-simulator-api-quizzes';

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
    response.setBody(listCollectionsForUser(currentUserId, savedOnly));
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

    const result = saveCollectionForUser(currentUserId, String(collectionId));
    response.setStatus(result.status);
    response.setBody(result.body);
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

    response.setBody(removeCollectionForUser(currentUserId, String(collectionId)));
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

    try {
        response.setStatus(201);
        response.setBody(publishCollectionTree(collectionPayload));
    } catch (error: any) {
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

    const overview = getOpenCollectionOverviewData(currentUserId, String(collectionId));
    if (!overview) {
        response.setStatus(404);
        response.setBody({ error: 'Saved collection not found for current user' });
        return;
    }

    response.setBody(overview);
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

    const result = createQuizForCollection(currentUserId, String(collectionId), requestedCount, mode);
    response.setStatus(result.status);

    if ('error' in result) {
        response.setBody({ error: result.error });
        return;
    }

    response.setBody(result.body);
}

export function getQuizDetail(request: any, response: any) {
    const currentUserId = gs.getUserID();
    const quizId = getQueryParam(request, 'quiz_id');

    if (!quizId) {
        response.setStatus(400);
        response.setBody({ error: 'quiz_id is required' });
        return;
    }

    const result = getQuizDetailData(currentUserId, String(quizId));
    if (!result) {
        response.setStatus(404);
        response.setBody({ error: 'Quiz not found for current user' });
        return;
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

    const result = saveQuizProgressData(currentUserId, String(quizId), answers);
    response.setStatus(result.status);

    if ('error' in result) {
        response.setBody({ error: result.error });
        return;
    }

    response.setBody(result.body);
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

    const result = submitQuizData(currentUserId, String(quizId), answers);
    response.setStatus(result.status);

    if ('error' in result) {
        response.setBody({ error: result.error });
        return;
    }

    response.setBody(result.body);
}
