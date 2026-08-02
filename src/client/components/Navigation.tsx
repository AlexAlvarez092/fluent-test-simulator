import React from 'react';

interface NavigationProps {
    onNavigate: (page: string) => void;
    currentPage: string;
}

export default function Navigation({ onNavigate, currentPage }: NavigationProps) {
    return (
        <nav className="app-nav" aria-label="Main navigation">
            <div className="app-nav-brand" aria-label="Quiz Simulator">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.779.025a11.8 11.8 0 0 0-5.338.896A11.8 11.8 0 0 0 3.058 4.11A11.93 11.93 0 0 0 .427 14.363a11.9 11.9 0 0 0 2.3 4.921a11.84 11.84 0 0 0 4.24 3.378a11.78 11.78 0 0 0 10.533-.226a.33.33 0 0 1 .331.018a9.14 9.14 0 0 0 5.197 1.545a.33.33 0 0 0 .332-.332v-4.038a.334.334 0 0 0-.276-.331a4.7 4.7 0 0 1-1.106-.319a.33.33 0 0 1-.191-.352a.3.3 0 0 1 .05-.133a11.94 11.94 0 0 0 .772-11.871a11.87 11.87 0 0 0-4.042-4.628A11.8 11.8 0 0 0 12.765.018zM4.843 11.898a7.24 7.24 0 0 1 1.205-4.005a7.2 7.2 0 0 1 3.215-2.657a7.13 7.13 0 0 1 7.815 1.558a7.24 7.24 0 0 1 1.555 7.854a7.2 7.2 0 0 1-2.643 3.234a7.15 7.15 0 0 1-9.049-.896a7.23 7.23 0 0 1-2.103-5.089z" />
                </svg>
                <span>Quiz Simulator</span>
            </div>

            <div className="app-nav-links">
                <button
                    type="button"
                    data-label="Home"
                    className={currentPage === 'home' ? 'app-nav-link is-active' : 'app-nav-link'}
                    title="Open home"
                    onClick={() => onNavigate('home')}
                >
                    Home
                </button>
                <button
                    type="button"
                    data-label="Collections"
                    className={currentPage === 'collections' ? 'app-nav-link is-active' : 'app-nav-link'}
                    title="Open collections"
                    onClick={() => onNavigate('collections')}
                >
                    Collections
                </button>
                <button
                    type="button"
                    data-label="Publish Collection"
                    className={currentPage === 'publish' ? 'app-nav-link is-active' : 'app-nav-link'}
                    title="Open publish collection"
                    onClick={() => onNavigate('publish')}
                >
                    Publish Collection
                </button>
            </div>
        </nav>
    );
}
