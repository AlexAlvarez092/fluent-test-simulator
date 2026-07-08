import React from 'react';

interface NavigationProps {
    onNavigate: (page: string) => void;
    currentPage: string;
}

export default function Navigation({ onNavigate, currentPage }: NavigationProps) {
    return (
        <nav>
            <button onClick={() => onNavigate('home')}>Home</button>
            <button onClick={() => onNavigate('collections')}>Collections</button>
        </nav>
    );
}
