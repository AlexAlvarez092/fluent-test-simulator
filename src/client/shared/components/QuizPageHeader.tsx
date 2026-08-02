import React from 'react';
import BackToCollectionButton from './BackToCollectionButton';
import PageTitleWithLoading from './PageTitleWithLoading';

interface QuizPageHeaderProps {
    title: string;
    loading: boolean;
    onBackToCollection: () => void;
}

export default function QuizPageHeader({ title, loading, onBackToCollection }: QuizPageHeaderProps) {
    return (
        <div className="quiz-page-header-row">
            <PageTitleWithLoading title={title} loading={loading} />
            <BackToCollectionButton onClick={onBackToCollection} />
        </div>
    );
}
