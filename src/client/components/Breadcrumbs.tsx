import React from 'react';

export type BreadcrumbItem = {
    key: string;
    label: string;
    page?: string;
};

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    onNavigate: (page: string) => void;
}

export default function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
    if (items.length === 0) {
        return null;
    }

    return (
        <nav className="app-breadcrumbs" aria-label="Breadcrumbs">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <span key={item.key} className="app-breadcrumb-item">
                        {item.page && !isLast ? (
                            <button type="button" onClick={() => onNavigate(item.page as string)}>
                                {item.label}
                            </button>
                        ) : (
                            <span>{item.label}</span>
                        )}
                        {!isLast && <span> / </span>}
                    </span>
                );
            })}
        </nav>
    );
}
