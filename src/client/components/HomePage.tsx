import React, { useEffect, useMemo, useState } from 'react';
import { CollectionService } from '../services/CollectionService';
import { UserCollectionService } from '../services/UserCollectionService';

type CollectionRow = {
    sys_id: string;
    name: string;
    is_saved: boolean;
};

export default function HomePage() {
    const [savedCollections, setSavedCollections] = useState<CollectionRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [removingId, setRemovingId] = useState<string | null>(null);

    const collectionService = useMemo(() => new CollectionService(), []);
    const userCollectionService = useMemo(() => new UserCollectionService(), []);

    useEffect(() => {
        const loadSavedCollections = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await collectionService.list({ savedOnly: true });
                setSavedCollections(Array.isArray(data) ? data : []);
            } catch (err: any) {
                setError('Failed to load saved collections: ' + (err.message || 'Unknown error'));
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        void loadSavedCollections();
    }, [collectionService]);

    const handleRemoveCollection = async (collectionId: string) => {
        try {
            setRemovingId(collectionId);
            setError(null);
            await userCollectionService.removeCollection(collectionId);
            setSavedCollections((previous) => previous.filter((collection) => collection.sys_id !== collectionId));
        } catch (err: any) {
            setError('Failed to remove collection: ' + (err.message || 'Unknown error'));
            console.error(err);
        } finally {
            setRemovingId(null);
        }
    };

    return (
        <div>
            <h1>Test Simulator</h1>

            <h2>Your Saved Collections</h2>

            {error && (
                <div>
                    {error}
                    <button onClick={() => setError(null)}>Dismiss</button>
                </div>
            )}

            {loading ? (
                <div>Loading saved collections...</div>
            ) : savedCollections.length === 0 ? (
                <div>You have no saved collections yet.</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {savedCollections.map((collection) => {
                            const isRemoving = removingId === collection.sys_id;

                            return (
                                <tr key={collection.sys_id}>
                                    <td>{collection.name}</td>
                                    <td>
                                        <button
                                            onClick={() => handleRemoveCollection(collection.sys_id)}
                                            disabled={isRemoving}
                                        >
                                            {isRemoving ? 'Removing...' : 'Remove'}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}
