import React, { useState } from 'react';
import HomePage from './components/HomePage';
import CollectionsPage from './components/CollectionsPage';
import Navigation from './components/Navigation';

export default function App() {
    const [currentPage, setCurrentPage] = useState('home');

    const handleNavigate = (page: string) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Navigation onNavigate={handleNavigate} currentPage={currentPage} />
            {currentPage === 'home' && <HomePage />}
            {currentPage === 'collections' && <CollectionsPage />}
        </div>
    );
}
