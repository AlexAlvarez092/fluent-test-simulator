import React, { useState, useEffect, useMemo } from 'react';
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

interface CollectionsPageProps {
    onOpenCollection: (collection: { sys_id: string; name: string }) => void;
    onError: () => void;
}

export default function CollectionsPage({ onOpenCollection, onError }: CollectionsPageProps) {
    const [collections, setCollections] = useState<CollectionRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState<string | null>(null);

    const collectionService = useMemo(() => new CollectionService(), []);
    const userCollectionService = useMemo(() => new UserCollectionService(), []);

    const refreshCollections = async () => {
        try {
            setLoading(true);
            const data = await collectionService.list();
            setCollections(Array.isArray(data) ? data : []);
        } catch (err: any) {
            reportAsyncError(err, onError);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void refreshCollections();
    }, []);

    const handleSaveCollection = async (collectionId: string): Promise<boolean> => {
        try {
            setSavingId(collectionId);
            await userCollectionService.saveCollection(collectionId);
            setCollections((previous) =>
                previous.map((collection) =>
                    collection.sys_id === collectionId ? { ...collection, is_saved: true } : collection
                )
            );
            return true;
        } catch (err: any) {
            reportAsyncError(err, onError);
            return false;
        } finally {
            setSavingId(null);
        }
    };

    const handleCollectionAction = async (collection: CollectionRow) => {
        if (savingId === collection.sys_id) {
            return;
        }

        if (collection.is_saved) {
            onOpenCollection({ sys_id: collection.sys_id, name: collection.name });
            return;
        }

        const saved = await handleSaveCollection(collection.sys_id);
        if (saved) {
            onOpenCollection({ sys_id: collection.sys_id, name: collection.name });
        }
    };

    return (
        <div>
            <PageTitleWithLoading title="Collections" loading={loading} />

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
                                const canInteract = !isSaving;
                                const rowActionLabel = isSaved ? 'Open collection' : 'Save collection and open';
                                const activateRow = () => void handleCollectionAction(collection);

                                return (
                                    <InteractiveTableRow
                                        rowKey={collectionId}
                                        isInteractive={canInteract}
                                        interactiveTitle={rowActionLabel}
                                        busyTitle="Saving collection"
                                        interactiveAriaLabel={`${rowActionLabel} ${name}`}
                                        busyAriaLabel={`Saving collection ${name}`}
                                        onActivate={activateRow}
                                    >
                                        <td>
                                            <CollectionActionIcon
                                                variant={isSaved ? 'save-saved' : 'save-unsaved'}
                                                isBusy={isSaving}
                                                isClickable={canInteract}
                                                dataSaved={isSaved ? 'true' : 'false'}
                                            />
                                        </td>
                                        <td>{name}</td>
                                    </InteractiveTableRow>
                                );
                            })
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}
