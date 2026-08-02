import React, { useEffect, useMemo, useState } from 'react';
import { CollectionService } from '../services/CollectionService';
import { UserCollectionService } from '../services/UserCollectionService';
import CollectionActionIcon from '../shared/components/CollectionActionIcon';
import InteractiveTableRow from '../shared/components/InteractiveTableRow';
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
                                        tabIndex={isRemoving ? undefined : 0}
                                        aria-label={
                                            isRemoving
                                                ? `Removing collection ${collection.name}`
                                                : `Remove collection ${collection.name}`
                                        }
                                    >
                                        <CollectionActionIcon
                                            variant="remove"
                                            isBusy={isRemoving}
                                            isClickable={!isRemoving}
                                            title={isRemoving ? 'Removing collection' : 'Remove collection'}
                                        />
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
