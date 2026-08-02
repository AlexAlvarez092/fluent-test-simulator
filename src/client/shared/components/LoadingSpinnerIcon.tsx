import React from 'react';

interface LoadingSpinnerIconProps {
    className?: string;
    loading?: boolean;
}

export default function LoadingSpinnerIcon({ className, loading }: LoadingSpinnerIconProps) {
    const dataLoading = loading === undefined ? undefined : loading ? 'true' : 'false';

    return (
        <span className={className} data-loading={dataLoading} aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
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
    );
}
