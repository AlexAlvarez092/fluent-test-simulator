import React from 'react';

interface InteractiveTableRowProps {
    rowKey: string;
    isInteractive: boolean;
    interactiveTitle: string;
    busyTitle: string;
    interactiveAriaLabel: string;
    busyAriaLabel: string;
    onActivate: () => void;
    children: React.ReactNode;
}

export default function InteractiveTableRow({
    rowKey,
    isInteractive,
    interactiveTitle,
    busyTitle,
    interactiveAriaLabel,
    busyAriaLabel,
    onActivate,
    children,
}: InteractiveTableRowProps) {
    return (
        <tr
            key={rowKey}
            className={isInteractive ? 'collection-row collection-row-clickable' : 'collection-row'}
            onClick={isInteractive ? onActivate : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            title={isInteractive ? interactiveTitle : busyTitle}
            aria-label={isInteractive ? interactiveAriaLabel : busyAriaLabel}
        >
            {children}
        </tr>
    );
}
