import React, { useEffect, useMemo, useState } from 'react';
import { CollectionService } from '../services/CollectionService';
import { UserCollectionService } from '../services/UserCollectionService';

type CollectionRow = {
    sys_id: string;
    name: string;
    is_saved: boolean;
};

interface HomePageProps {
    onOpenCollection: (collection: { sys_id: string; name: string }) => void;
}

export default function HomePage({ onOpenCollection }: HomePageProps) {
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
                Your Saved Collections
            </h1>

            {error && (
                <div>
                    {error}
                    <button title="Dismiss message" onClick={() => setError(null)}>
                        Dismiss
                    </button>
                </div>
            )}

            {loading ? null : savedCollections.length === 0 ? (
                <div className="title-text-aligned-message">You have no saved collections yet.</div>
            ) : (
                <table className="collections-table saved-collections-table">
                    <tbody>
                        {savedCollections.map((collection) => {
                            const isRemoving = removingId === collection.sys_id;
                            const canInteract = !isRemoving;

                            return (
                                <tr
                                    key={collection.sys_id}
                                    className={
                                        canInteract ? 'collection-row collection-row-clickable' : 'collection-row'
                                    }
                                    onClick={
                                        canInteract
                                            ? () =>
                                                  onOpenCollection({
                                                      sys_id: collection.sys_id,
                                                      name: collection.name,
                                                  })
                                            : undefined
                                    }
                                    onKeyDown={
                                        canInteract
                                            ? (event) => {
                                                  if (event.key === 'Enter' || event.key === ' ') {
                                                      event.preventDefault();
                                                      onOpenCollection({
                                                          sys_id: collection.sys_id,
                                                          name: collection.name,
                                                      });
                                                  }
                                              }
                                            : undefined
                                    }
                                    tabIndex={canInteract ? 0 : undefined}
                                    title={canInteract ? 'Open collection' : 'Removing collection'}
                                    aria-label={
                                        canInteract
                                            ? `Open collection ${collection.name}`
                                            : `Collection ${collection.name} is being removed`
                                    }
                                >
                                    <td
                                        className={
                                            isRemoving ? 'saved-remove-cell is-busy' : 'saved-remove-cell is-clickable'
                                        }
                                        title={isRemoving ? 'Removing collection' : 'Remove collection'}
                                        onClick={
                                            isRemoving
                                                ? undefined
                                                : (event) => {
                                                      event.stopPropagation();
                                                      void handleRemoveCollection(collection.sys_id);
                                                  }
                                        }
                                        onKeyDown={
                                            isRemoving
                                                ? undefined
                                                : (event) => {
                                                      if (event.key === 'Enter' || event.key === ' ') {
                                                          event.preventDefault();
                                                          event.stopPropagation();
                                                          void handleRemoveCollection(collection.sys_id);
                                                      }
                                                  }
                                        }
                                        tabIndex={isRemoving ? undefined : 0}
                                        aria-label={
                                            isRemoving
                                                ? `Removing collection ${collection.name}`
                                                : `Remove collection ${collection.name}`
                                        }
                                    >
                                        <span
                                            className="icon-button collection-save-button"
                                            data-saving={isRemoving ? 'true' : 'false'}
                                            title={isRemoving ? 'Removing collection' : 'Remove collection'}
                                            aria-hidden="true"
                                        >
                                            {isRemoving ? (
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
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path d="M15.5 7q-.213 0-.357-.143T15 6.5t.143-.357T15.5 6h4q.214 0 .357.143T20 6.5t-.143.357T19.5 7zM12 16.923l-3.738 1.608q-.808.348-1.535-.134Q6 17.916 6 17.052V5.616q0-.691.463-1.153T7.616 4H12.5q.214 0 .357.143T13 4.5t-.143.357T12.5 5H7.616q-.231 0-.424.192T7 5.616v11.392q0 .327.279.519t.586.057L12 15.8l4.135 1.785q.307.134.586-.058t.279-.52V11.5q0-.213.143-.357T17.5 11t.357.143t.143.357v5.552q0 .864-.727 1.345q-.727.482-1.535.134zM12 5H7h6z" />
                                                </svg>
                                            )}
                                        </span>
                                    </td>
                                    <td className={isRemoving ? 'saved-open-cell is-busy' : 'saved-open-cell'}>
                                        {collection.name}
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
