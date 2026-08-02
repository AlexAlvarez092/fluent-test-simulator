import React, { useState, useEffect, useMemo } from 'react';
import { CollectionService } from '../services/CollectionService';
import { UserCollectionService } from '../services/UserCollectionService';

type CollectionRow = {
    sys_id: string;
    name: string;
    is_saved: boolean;
};

export default function CollectionsPage() {
    const [collections, setCollections] = useState<CollectionRow[]>([]);
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
            setCollections(Array.isArray(data) ? data : []);
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
            await userCollectionService.saveCollection(collectionId);
            setCollections((previous) =>
                previous.map((collection) =>
                    collection.sys_id === collectionId ? { ...collection, is_saved: true } : collection
                )
            );
        } catch (err: any) {
            setError('Failed to save collection: ' + (err.message || 'Unknown error'));
            console.error(err);
        } finally {
            setSavingId(null);
        }
    };

    return (
        <div>
            <h1 className="page-title-with-loading">
                <span className="title-loading-icon" data-loading={loading ? 'true' : 'false'} aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 3c4.97 0 9 4.03 9 9"
                        >
                            <animateTransform
                                attributeName="transform"
                                dur="1.5s"
                                repeatCount="indefinite"
                                type="rotate"
                                values="0 12 12;360 12 12"
                            />
                        </path>
                    </svg>
                </span>
                Collections
            </h1>

            {error && (
                <div>
                    {error}
                    <button title="Dismiss message" onClick={() => setError(null)}>
                        Dismiss
                    </button>
                </div>
            )}

            {loading ? null : (
                <table className="collections-table">
                    <tbody>
                        {collections.length === 0 ? (
                            <tr>
                                <td colSpan={2}>No collections found</td>
                            </tr>
                        ) : (
                            collections.map((collection) => {
                                const collectionId = collection.sys_id;
                                const name = collection.name;
                                const isSaved = collection.is_saved;
                                const isSaving = savingId === collectionId;
                                const canSave = !isSaved && !isSaving;

                                return (
                                    <tr
                                        key={collectionId}
                                        className={
                                            canSave ? 'collection-row collection-row-clickable' : 'collection-row'
                                        }
                                        onClick={canSave ? () => handleSaveCollection(collectionId) : undefined}
                                        onKeyDown={
                                            canSave
                                                ? (event) => {
                                                      if (event.key === 'Enter' || event.key === ' ') {
                                                          event.preventDefault();
                                                          void handleSaveCollection(collectionId);
                                                      }
                                                  }
                                                : undefined
                                        }
                                        tabIndex={canSave ? 0 : undefined}
                                        title={canSave ? 'Save collection' : isSaved ? 'Collection saved' : 'Saving collection'}
                                        aria-label={
                                            canSave
                                                ? `Save collection ${name}`
                                                : isSaved
                                                  ? `Collection ${name} already saved`
                                                  : `Saving collection ${name}`
                                        }
                                    >
                                        <td>
                                            <span
                                                className="icon-button collection-save-button"
                                                data-saved={isSaved ? 'true' : 'false'}
                                                data-saving={isSaving ? 'true' : 'false'}
                                                aria-hidden="true"
                                            >
                                                {isSaving ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M12 3c4.97 0 9 4.03 9 9"
                                                        >
                                                            <animateTransform
                                                                attributeName="transform"
                                                                dur="1.5s"
                                                                repeatCount="indefinite"
                                                                type="rotate"
                                                                values="0 12 12;360 12 12"
                                                            />
                                                        </path>
                                                    </svg>
                                                ) : isSaved ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="m17.114 7.598l3.17-3.19q.147-.166.348-.166t.366.166q.165.165.165.356q0 .192-.165.357l-3.32 3.313q-.241.243-.564.243t-.566-.242L15.335 7.22q-.14-.14-.14-.341t.14-.347q.146-.166.356-.156q.211.01.357.156zM12 16.923l-3.738 1.608q-.808.348-1.535-.134Q6 17.916 6 17.052V5.616q0-.672.472-1.144T7.616 4h5.067q.373 0 .55.314q.177.313.034.661q-.136.367-.201.735Q13 6.077 13 6.5q0 1.742 1.157 3.012T17 10.958q.07.011.124.014q.055.003.107.003q.31.02.54.234q.229.214.229.518v5.325q0 .864-.727 1.345q-.727.482-1.535.134z" />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="m12 16.923l-3.738 1.608q-.808.348-1.535-.134Q6 17.916 6 17.052V5.616q0-.691.463-1.153T7.616 4H12.5q.214 0 .357.143T13 4.5t-.143.357T12.5 5H7.616q-.231 0-.424.192T7 5.616v11.392q0 .327.279.519t.586.057L12 15.8l4.135 1.785q.307.134.586-.058t.279-.52V11.5q0-.213.143-.357T17.5 11t.357.143t.143.357v5.552q0 .864-.727 1.345q-.727.482-1.535.134zM12 5H7h6zm5 2h-1.5q-.213 0-.357-.143T15 6.5t.143-.357T15.5 6H17V4.5q0-.213.143-.357T17.5 4t.357.143T18 4.5V6h1.5q.214 0 .357.143T20 6.5t-.143.357T19.5 7H18v1.5q0 .214-.143.357T17.5 9t-.357-.143T17 8.5z" />
                                                    </svg>
                                                )}
                                            </span>
                                        </td>
                                        <td>{name}</td>
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
