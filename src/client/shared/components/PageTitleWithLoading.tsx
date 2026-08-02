import React from 'react';
import LoadingSpinnerIcon from './LoadingSpinnerIcon';

interface PageTitleWithLoadingProps {
    title: React.ReactNode;
    loading: boolean;
}

export default function PageTitleWithLoading({ title, loading }: PageTitleWithLoadingProps) {
    return (
        <h1 className="page-title-with-loading">
            <LoadingSpinnerIcon className="title-loading-icon" loading={loading} />
            {title}
        </h1>
    );
}
