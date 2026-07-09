import React, { useEffect, useMemo, useState } from 'react';
import { CollectionService } from '../services/CollectionService';

type CollectionRow = {
    sys_id: string;
    name: string;
    is_saved: boolean;
};

export default function HomePage() {
    const [savedCollections, setSavedCollections] = useState<CollectionRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const collectionService = useMemo(() => new CollectionService(), []);

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
                <ul>
                    {savedCollections.map((collection) => (
                        <li key={collection.sys_id}>{collection.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
