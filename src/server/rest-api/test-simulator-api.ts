import { GlideRecord, gs } from '@servicenow/glide';

export function getCollectionsList(request: any, response: any) {
    const currentUserId = gs.getUserID();
    const savedOnlyParam = request?.queryParams?.saved_only;
    const savedOnly = savedOnlyParam === 'true' || savedOnlyParam === '1';
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

    response.setBody({ result });
}

export function saveCollectionForCurrentUser(request: any, response: any) {
    const currentUserId = gs.getUserID();

    let body: any = {};
    if (request.body && request.body.data) {
        body = request.body.data;
    } else if (request.body && request.body.dataString) {
        body = JSON.parse(request.body.dataString);
    }

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
            result: {
                sys_id: existing.getUniqueValue(),
                user: currentUserId,
                collection: collectionId,
                created: false,
            },
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
        result: {
            sys_id: insertedId,
            user: currentUserId,
            collection: collectionId,
            created: true,
        },
    });
}
