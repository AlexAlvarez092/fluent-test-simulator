import React from 'react';
import LoadingSpinnerIcon from './LoadingSpinnerIcon';

type CollectionActionVariant = 'remove' | 'save-unsaved' | 'save-saved';

interface CollectionActionIconProps {
    variant: CollectionActionVariant;
    isBusy: boolean;
    isClickable: boolean;
    title?: string;
    dataSaved?: 'true' | 'false';
}

export default function CollectionActionIcon({
    variant,
    isBusy,
    isClickable,
    title,
    dataSaved,
}: CollectionActionIconProps) {
    return (
        <span
            className="icon-button collection-save-button"
            data-clickable={isClickable ? 'true' : 'false'}
            data-saving={isBusy ? 'true' : 'false'}
            data-saved={dataSaved}
            title={title}
            aria-hidden="true"
        >
            {isBusy ? (
                <LoadingSpinnerIcon />
            ) : variant === 'remove' ? (
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
            ) : variant === 'save-saved' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m17.114 7.598l3.17-3.19q.147-.166.348-.166t.366.166q.165.165.165.356q0 .192-.165.357l-3.32 3.313q-.241.243-.564.243t-.566-.242L15.335 7.22q-.14-.14-.14-.341t.14-.347q.146-.166.356-.156q.211.01.357.156zM12 16.923l-3.738 1.608q-.808.348-1.535-.134Q6 17.916 6 17.052V5.616q0-.672.472-1.144T7.616 4h5.067q.373 0 .55.314q.177.313.034.661q-.136.367-.201.735Q13 6.077 13 6.5q0 1.742 1.157 3.012T17 10.958q.07.011.124.014q.055.003.107.003q.31.02.54.234q.229.214.229.518v5.325q0 .864-.727 1.345q-.727.482-1.535.134z" />
                </svg>
            ) : (
                <span className="icon-variant-stack" aria-hidden="true">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="icon-default"
                        aria-hidden="true"
                    >
                        <path d="m12 16.923l-3.738 1.608q-.808.348-1.535-.134Q6 17.916 6 17.052V5.616q0-.691.463-1.153T7.616 4H12.5q.214 0 .357.143T13 4.5t-.143.357T12.5 5H7.616q-.231 0-.424.192T7 5.616v11.392q0 .327.279.519t.586.057L12 15.8l4.135 1.785q.307.134.586-.058t.279-.52V11.5q0-.213.143-.357T17.5 11t.357.143t.143.357v5.552q0 .864-.727 1.345q-.727.482-1.535.134zM12 5H7h6zm5 2h-1.5q-.213 0-.357-.143T15 6.5t.143-.357T15.5 6H17V4.5q0-.213.143-.357T17.5 4t.357.143T18 4.5V6h1.5q.214 0 .357.143T20 6.5t-.143.357T19.5 7H18v1.5q0 .214-.143.357T17.5 9t-.357-.143T17 8.5z" />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="icon-hover"
                        aria-hidden="true"
                    >
                        <path d="m12 18l-4.2 1.8q-1 .425-1.9-.162T5 17.975V5q0-.825.588-1.412T7 3h5q.425 0 .713.288T13 4t-.288.713T12 5H7v12.95l5-2.15l5 2.15V12q0-.425.288-.712T18 11t.713.288T19 12v5.975q0 1.075-.9 1.663t-1.9.162zm0-13H7h6zm5 2h-1q-.425 0-.712-.288T15 6t.288-.712T16 5h1V4q0-.425.288-.712T18 3t.713.288T19 4v1h1q.425 0 .713.288T21 6t-.288.713T20 7h-1v1q0 .425-.288.713T18 9t-.712-.288T17 8z" />
                    </svg>
                </span>
            )}
        </span>
    );
}
