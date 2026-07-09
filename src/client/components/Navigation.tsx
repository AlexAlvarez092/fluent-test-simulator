import React from 'react';

interface NavigationProps {
    onNavigate: (page: string) => void;
    currentPage: string;
    isAdmin: boolean;
}

export default function Navigation({ onNavigate, currentPage, isAdmin }: NavigationProps) {
    return (
        <nav>
            <button onClick={() => onNavigate('home')}>Home</button>
            <button onClick={() => onNavigate('collections')}>Collections</button>
            {isAdmin && <button onClick={() => onNavigate('publish')}>Publish Collection</button>}
        </nav>
    );
}
