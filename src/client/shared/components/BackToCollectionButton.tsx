import React from 'react';

interface BackToCollectionButtonProps {
    onClick: () => void;
}

export default function BackToCollectionButton({ onClick }: BackToCollectionButtonProps) {
    return (
        <button
            type="button"
            className="text-action-button back-to-collection-button"
            data-label="Back to collection"
            title="Back to collection"
            onClick={onClick}
        >
            <span className="icon-stack" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-default">
                    <path d="m6.523 12.5l3.735 3.735q.146.146.153.344q.006.198-.153.363q-.166.166-.357.168t-.357-.162l-4.382-4.383q-.243-.242-.243-.565t.243-.566l4.382-4.382q.147-.146.347-.153q.201-.007.367.159q.16.165.162.353q.003.189-.162.354L6.523 11.5h12.38q.214 0 .358.143t.143.357t-.143.357t-.357.143z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-hover">
                    <path d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12t-.288.713T19 13z" />
                </svg>
            </span>
            Back to collection
        </button>
    );
}
