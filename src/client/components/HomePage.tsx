import React, { useEffect, useMemo, useState } from 'react';
import { CollectionService } from '../services/CollectionService';
import { UserCollectionService } from '../services/UserCollectionService';
import InteractiveTableRow from '../shared/components/InteractiveTableRow';
import LoadingSpinnerIcon from '../shared/components/LoadingSpinnerIcon';
import PageTitleWithLoading from '../shared/components/PageTitleWithLoading';
import { reportAsyncError } from '../shared/services/errorHandling';

type CollectionRow = {
    sys_id: string;
    name: string;
    is_saved: boolean;
};

interface HomePageProps {
    onOpenCollection: (collection: { sys_id: string; name: string }) => void;
    onError: () => void;
}

export default function HomePage({ onOpenCollection, onError }: HomePageProps) {
    const [savedCollections, setSavedCollections] = useState<CollectionRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [removingId, setRemovingId] = useState<string | null>(null);

    const collectionService = useMemo(() => new CollectionService(), []);
    const userCollectionService = useMemo(() => new UserCollectionService(), []);

    useEffect(() => {
        const loadSavedCollections = async () => {
            try {
                setLoading(true);
                const data = await collectionService.list({ savedOnly: true });
                setSavedCollections(Array.isArray(data) ? data : []);
            } catch (err: any) {
                reportAsyncError(err, onError);
            } finally {
                setLoading(false);
            }
        };

        void loadSavedCollections();
    }, [collectionService]);

    const handleRemoveCollection = async (collectionId: string) => {
        try {
            setRemovingId(collectionId);
            await userCollectionService.removeCollection(collectionId);
            setSavedCollections((previous) => previous.filter((collection) => collection.sys_id !== collectionId));
        } catch (err: any) {
            reportAsyncError(err, onError);
        } finally {
            setRemovingId(null);
        }
    };

    return (
        <div>
            <PageTitleWithLoading title="Your Saved Collections" loading={loading} />

            {loading ? null : savedCollections.length === 0 ? (
                <div className="title-text-aligned-message">You have no saved collections yet.</div>
            ) : (
                <table className="collections-table saved-collections-table">
                    <tbody>
                        {savedCollections.map((collection) => {
                            const isRemoving = removingId === collection.sys_id;
                            const canInteract = !isRemoving;
                            const openCollection = () =>
                                onOpenCollection({
                                    sys_id: collection.sys_id,
                                    name: collection.name,
                                });

                            return (
                                <InteractiveTableRow
                                    rowKey={collection.sys_id}
                                    isInteractive={canInteract}
                                    interactiveTitle="Open collection"
                                    busyTitle="Removing collection"
                                    interactiveAriaLabel={`Open collection ${collection.name}`}
                                    busyAriaLabel={`Collection ${collection.name} is being removed`}
                                    onActivate={openCollection}
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
                                            data-clickable={isRemoving ? 'false' : 'true'}
                                            data-saving={isRemoving ? 'true' : 'false'}
                                            title={isRemoving ? 'Removing collection' : 'Remove collection'}
                                            aria-hidden="true"
                                        >
                                            {isRemoving ? (
                                                <LoadingSpinnerIcon />
                                            ) : (
                                                <span className="icon-variant-stack" aria-hidden="true">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        className="icon-default"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M15.5 7q-.213 0-.357-.143T15 6.5t.143-.357T15.5 6h4q.214 0 .357.143T20 6.5t-.143.357T19.5 7zM12 16.923l-3.738 1.608q-.808.348-1.535-.134Q6 17.916 6 17.052V5.616q0-.691.463-1.153T7.616 4H12.5q.214 0 .357.143T13 4.5t-.143.357T12.5 5H7.616q-.231 0-.424.192T7 5.616v11.392q0 .327.279.519t.586.057L12 15.8l4.135 1.785q.307.134.586-.058t.279-.52V11.5q0-.213.143-.357T17.5 11t.357.143t.143.357v5.552q0 .864-.727 1.345q-.727.482-1.535.134zM12 5H7h6z" />
                                                    </svg>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        className="icon-hover"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M16 7q-.425 0-.712-.288T15 6t.288-.712T16 5h4q.425 0 .713.288T21 6t-.288.713T20 7zm-4 11l-4.2 1.8q-1 .425-1.9-.162T5 17.975V5q0-.825.588-1.412T7 3h5q.425 0 .713.288T13 4t-.288.713T12 5H7v12.95l5-2.15l5 2.15V12q0-.425.288-.712T18 11t.713.288T19 12v5.975q0 1.075-.9 1.663t-1.9.162zm0-13H7h6z" />
                                                    </svg>
                                                </span>
                                            )}
                                        </span>
                                    </td>
                                    <td className={isRemoving ? 'saved-open-cell is-busy' : 'saved-open-cell'}>
                                        {collection.name}
                                    </td>
                                </InteractiveTableRow>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}
