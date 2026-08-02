import React, { useEffect, useMemo, useState } from 'react';
import HomePage from './components/HomePage';
import CollectionsPage from './components/CollectionsPage';
import Navigation from './components/Navigation';
import PublishCollectionPage from './components/PublishCollectionPage';
import OpenCollectionPage from './components/OpenCollectionPage';
import TestRunPage from './components/TestRunPage';
import CollectionQuestionsPage from './components/CollectionQuestionsPage';
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
    const [selectedTestCreatedOn, setSelectedTestCreatedOn] = useState<string | null>(null);
    const [selectedQuestionFilter, setSelectedQuestionFilter] = useState<QuestionFilter>('all');
    const [accessState, setAccessState] = useState<AccessState>('loading');
    const [accessError, setAccessError] = useState<string | null>(null);

    const accessService = useMemo(() => new AccessService(), []);

    useEffect(() => {
        const loadAccess = async () => {
            try {
                setAccessState('loading');
                setAccessError(null);

                const roles = await accessService.getCurrentUserRoles();
                setAccessState(roles?.is_user ? 'allowed' : 'denied');
            } catch (error: any) {
                setAccessState('error');
                setAccessError(error?.message || 'Unknown error');
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

    const handleOpenTest = (testId: string, createdOn?: string) => {
        setSelectedTestId(testId);
        setSelectedTestCreatedOn(createdOn || null);
        setCurrentPage('test-run');
    };

    const handleOpenCollectionQuestions = (filter: QuestionFilter) => {
        setSelectedQuestionFilter(filter);
        setCurrentPage('collection-questions');
    };

    if (accessState === 'loading') {
        return (
            <div className="app-shell">
                <div className="app-message-card">Checking access...</div>
            </div>
        );
    }

    if (accessState === 'error') {
        return (
            <div className="app-shell">
                <div className="app-message-card">
                    <h1>Access Check Failed</h1>
                    <p>Unable to verify your roles for Test Simulator.</p>
                    <p>{accessError}</p>
                </div>
            </div>
        );
    }

    if (accessState === 'denied') {
        return (
            <div className="app-shell">
                <div className="app-message-card">
                    <h1>Access Denied</h1>
                    <p>You do not have the required role to access Test Simulator.</p>
                    <p>Required: x_2119443_test_sim.user</p>
                </div>
            </div>
        );
    }

    return (
        <div className="app-shell">
            <Navigation onNavigate={handleNavigate} currentPage={currentPage} />
            <main className="app-content">
                {currentPage === 'home' && <HomePage onOpenCollection={handleOpenCollection} />}
                {currentPage === 'collections' && <CollectionsPage />}
                {currentPage === 'publish' && <PublishCollectionPage />}
                {currentPage === 'open-collection' && (
                    <OpenCollectionPage
                        collection={selectedCollection}
                        onOpenTest={handleOpenTest}
                        onOpenQuestions={handleOpenCollectionQuestions}
                    />
                )}
                {currentPage === 'collection-questions' && (
                    <CollectionQuestionsPage collection={selectedCollection} filter={selectedQuestionFilter} />
                )}
                {currentPage === 'test-run' && <TestRunPage testId={selectedTestId} />}
            </main>
        </div>
    );
}
