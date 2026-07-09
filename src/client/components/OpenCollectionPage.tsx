import React from 'react';

type SelectedCollection = {
    sys_id: string;
    name: string;
};

interface OpenCollectionPageProps {
    collection: SelectedCollection | null;
}

export default function OpenCollectionPage({ collection }: OpenCollectionPageProps) {
    return (
        <div>
            <h1>{collection?.name || 'Collection'}</h1>
            <p>Collection ID: {collection?.sys_id || 'N/A'}</p>
            <p>This page is intentionally blank for now.</p>
        </div>
    );
}
