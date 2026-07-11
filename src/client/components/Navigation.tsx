import React from 'react';

interface NavigationProps {
    onNavigate: (page: string) => void;
    currentPage: string;
}

export default function Navigation({ onNavigate, currentPage }: NavigationProps) {
    return (
        <nav className="app-nav" aria-label="Main navigation">
            <button onClick={() => onNavigate('home')}>Home</button>
            <button onClick={() => onNavigate('collections')}>Collections</button>
            <button onClick={() => onNavigate('publish')}>Publish Collection</button>
        </nav>
    );
}
