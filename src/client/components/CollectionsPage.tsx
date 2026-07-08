import React, { useState, useEffect, useMemo } from 'react';
import { CollectionService } from '../services/CollectionService';
import { UserCollectionService } from '../services/UserCollectionService';

export default function CollectionsPage() {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [savingId, setSavingId] = useState<string | null>(null);

    const collectionService = useMemo(() => new CollectionService(), []);
    const userCollectionService = useMemo(() => new UserCollectionService(), []);

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

    const handleSaveCollection = async (collectionId: string) => {
        try {
            setSavingId(collectionId);
            // Business Rule on server will automatically set the user field to the authenticated user
            await userCollectionService.saveCollection(collectionId);
        } catch (err: any) {
            setError('Failed to save collection: ' + (err.message || 'Unknown error'));
            console.error(err);
        } finally {
            setSavingId(null);
        }
    };

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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {collections.length === 0 ? (
                            <tr>
                                <td colSpan={2}>No collections found</td>
                            </tr>
                        ) : (
                            collections.map((collection: any) => {
                                const collectionId =
                                    typeof collection.sys_id === 'object' ? collection.sys_id.value : collection.sys_id;
                                const name =
                                    typeof collection.name === 'object'
                                        ? collection.name.display_value
                                        : collection.name;

                                return (
                                    <tr key={collectionId}>
                                        <td>{name}</td>
                                        <td>
                                            <button
                                                onClick={() => handleSaveCollection(collectionId)}
                                                disabled={savingId === collectionId}
                                            >
                                                {savingId === collectionId ? 'Saving...' : 'Save'}
                                            </button>
                                        </td>
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
