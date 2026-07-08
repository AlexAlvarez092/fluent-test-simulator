import React, { useState, useEffect, useMemo } from 'react';
import { CollectionService } from '../services/CollectionService';

export default function CollectionsPage() {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const collectionService = useMemo(() => new CollectionService(), []);

    const refreshCollections = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await collectionService.list();
            setCollections(data);
        } catch (err: any) {
            setError('Failed to load collections: ' + (err.message || 'Unknown error'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void refreshCollections();
    }, []);

    return (
        <div>
            <h1>Collections</h1>

            {error && (
                <div>
                    {error}
                    <button onClick={() => setError(null)}>Dismiss</button>
                </div>
            )}

            {loading ? (
                <div>Loading...</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {collections.length === 0 ? (
                            <tr>
                                <td>No collections found</td>
                            </tr>
                        ) : (
                            collections.map((collection: { sys_id: string; name: string }) => {
                                return (
                                    <tr key={collection.sys_id}>
                                        <td>{collection.name}</td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}
