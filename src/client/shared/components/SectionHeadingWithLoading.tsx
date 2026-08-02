import React from 'react';
import LoadingSpinnerIcon from './LoadingSpinnerIcon';

interface SectionHeadingWithLoadingProps {
    title: string;
    loading: boolean;
}

export default function SectionHeadingWithLoading({ title, loading }: SectionHeadingWithLoadingProps) {
    return (
        <div className="section-heading-with-loading">
            <LoadingSpinnerIcon className="section-loading-icon" loading={loading} />
            <h2>{title}</h2>
        </div>
    );
}
