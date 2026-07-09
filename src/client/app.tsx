import React, { useEffect, useMemo, useState } from 'react';
import HomePage from './components/HomePage';
import CollectionsPage from './components/CollectionsPage';
import Navigation from './components/Navigation';
import PublishCollectionPage from './components/PublishCollectionPage';
import OpenCollectionPage from './components/OpenCollectionPage';
import TestRunPage from './components/TestRunPage';
import { AccessService } from './services/AccessService';

type AccessState = 'loading' | 'allowed' | 'denied' | 'error';

type SelectedCollection = {
    sys_id: string;
    name: string;
};

export default function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedCollection, setSelectedCollection] = useState<SelectedCollection | null>(null);
    const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
    const [accessState, setAccessState] = useState<AccessState>('loading');
    const [isAdmin, setIsAdmin] = useState(false);
    const [accessError, setAccessError] = useState<string | null>(null);

    const accessService = useMemo(() => new AccessService(), []);

    useEffect(() => {
        const loadAccess = async () => {
            try {
                setAccessState('loading');
                setAccessError(null);

                const roles = await accessService.getCurrentUserRoles();
                const hasAnyAccess = Boolean(roles?.is_admin || roles?.is_user);
                setIsAdmin(Boolean(roles?.is_admin));
                setAccessState(hasAnyAccess ? 'allowed' : 'denied');
            } catch (error: any) {
                setAccessState('error');
                setAccessError(error?.message || 'Unknown error');
            }
        };

        void loadAccess();
    }, [accessService]);

    const handleNavigate = (page: string) => {
        setCurrentPage(page);
    };

    const handleOpenCollection = (collection: SelectedCollection) => {
        setSelectedCollection(collection);
        setCurrentPage('open-collection');
    };

    const handleOpenTest = (testId: string) => {
        setSelectedTestId(testId);
        setCurrentPage('test-run');
    };

    if (accessState === 'loading') {
        return <div>Checking access...</div>;
    }

    if (accessState === 'error') {
        return (
            <div>
                <h1>Access Check Failed</h1>
                <p>Unable to verify your roles for Test Simulator.</p>
                <p>{accessError}</p>
            </div>
        );
    }

    if (accessState === 'denied') {
        return (
            <div>
                <h1>Access Denied</h1>
                <p>You do not have the required role to access Test Simulator.</p>
                <p>Required: x_2119443_test_sim.user or x_2119443_test_sim.admin</p>
            </div>
        );
    }

    return (
        <div>
            <Navigation onNavigate={handleNavigate} currentPage={currentPage} isAdmin={isAdmin} />
            {currentPage === 'home' && <HomePage onOpenCollection={handleOpenCollection} />}
            {currentPage === 'collections' && <CollectionsPage />}
            {currentPage === 'publish' && isAdmin && <PublishCollectionPage />}
            {currentPage === 'open-collection' && (
                <OpenCollectionPage collection={selectedCollection} onOpenTest={handleOpenTest} />
            )}
            {currentPage === 'test-run' && <TestRunPage testId={selectedTestId} />}
        </div>
    );
}
