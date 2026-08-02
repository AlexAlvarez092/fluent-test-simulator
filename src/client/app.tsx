import React, { useEffect, useMemo, useState } from 'react';
import HomePage from './components/HomePage';
import CollectionsPage from './components/CollectionsPage';
import Navigation from './components/Navigation';
import PublishCollectionPage from './components/PublishCollectionPage';
import OpenCollectionPage from './components/OpenCollectionPage';
import TestRunPage from './components/TestRunPage';
import CollectionQuestionsPage from './components/CollectionQuestionsPage';
import ErrorPage from './components/ErrorPage';
import { AccessService } from './services/AccessService';

type AccessState = 'loading' | 'allowed' | 'denied' | 'error';

type SelectedCollection = {
    sys_id: string;
    name: string;
};

type QuestionFilter = 'all' | 'never_seen' | 'correct' | 'ever_failed' | 'last_attempt_failed';

export default function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedCollection, setSelectedCollection] = useState<SelectedCollection | null>(null);
    const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
    const [selectedQuestionFilter, setSelectedQuestionFilter] = useState<QuestionFilter>('all');
    const [accessState, setAccessState] = useState<AccessState>('loading');
    const [accessError, setAccessError] = useState<string | null>(null);
    const [hasAppError, setHasAppError] = useState(false);

    const accessService = useMemo(() => new AccessService(), []);

    useEffect(() => {
        const loadAccess = async () => {
            try {
                setAccessState('loading');
                setAccessError(null);

                const roles = await accessService.getCurrentUserRoles();
                if (!roles?.is_user) {
                    setAccessState('denied');
                    setHasAppError(true);
                    return;
                }

                setAccessState('allowed');
            } catch (error: any) {
                setAccessState('error');
                setAccessError(error?.message || 'Unknown error');
                setHasAppError(true);
            }
        };

        void loadAccess();
    }, [accessService]);

    const handleNavigate = (page: string) => {
        setCurrentPage(page);
        if (page !== 'collection-questions') {
            setSelectedQuestionFilter('all');
        }
    };

    const handleOpenCollection = (collection: SelectedCollection) => {
        setSelectedCollection(collection);
        setSelectedQuestionFilter('all');
        setCurrentPage('open-collection');
    };

    const handleOpenTest = (testId: string, _createdOn?: string) => {
        setSelectedTestId(testId);
        setCurrentPage('test-run');
    };

    const handleOpenCollectionQuestions = (filter: QuestionFilter) => {
        setSelectedQuestionFilter(filter);
        setCurrentPage('collection-questions');
    };

    const handleQuizSubmitted = () => {
        setCurrentPage('open-collection');
    };

    const handleBackToCollection = () => {
        setCurrentPage('open-collection');
    };

    const handlePageError = () => {
        setHasAppError(true);
    };

    if (accessState === 'loading') {
        return (
            <div className="app-shell">
                <div className="app-message-card" aria-live="polite" aria-label="Loading">
                    <span className="title-loading-icon" data-loading="true" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
                </div>
            </div>
        );
    }

    if (accessState === 'error' || accessState === 'denied' || hasAppError) {
        return (
            <div className="app-shell">
                <ErrorPage />
            </div>
        );
    }

    return (
        <div className="app-shell">
            <Navigation onNavigate={handleNavigate} currentPage={currentPage} />
            <main className="app-content">
                {currentPage === 'home' && (
                    <HomePage onOpenCollection={handleOpenCollection} onError={handlePageError} />
                )}
                {currentPage === 'collections' && (
                    <CollectionsPage onOpenCollection={handleOpenCollection} onError={handlePageError} />
                )}
                {currentPage === 'publish' && <PublishCollectionPage onError={handlePageError} />}
                {currentPage === 'open-collection' && (
                    <OpenCollectionPage
                        collection={selectedCollection}
                        onOpenTest={handleOpenTest}
                        onOpenQuestions={handleOpenCollectionQuestions}
                        onError={handlePageError}
                    />
                )}
                {currentPage === 'collection-questions' && (
                    <CollectionQuestionsPage
                        collection={selectedCollection}
                        filter={selectedQuestionFilter}
                        onBackToCollection={handleBackToCollection}
                        onError={handlePageError}
                    />
                )}
                {currentPage === 'test-run' && (
                    <TestRunPage
                        testId={selectedTestId}
                        onQuizSubmitted={handleQuizSubmitted}
                        onBackToCollection={handleBackToCollection}
                        onError={handlePageError}
                    />
                )}
            </main>
        </div>
    );
}
