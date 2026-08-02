import React from 'react';

interface QuestionInfoTooltipProps {
    rationale?: string;
    docs?: string;
}

function getDocumentationUrl(docs: string): string | null {
    const value = docs.trim();
    if (!value) {
        return null;
    }

    if (value.startsWith('http://') || value.startsWith('https://')) {
        return value;
    }

    if (value.startsWith('www.')) {
        return `https://${value}`;
    }

    return `https://${value}`;
}

export default function QuestionInfoTooltip({ rationale = '', docs = '' }: QuestionInfoTooltipProps) {
    const rationaleText = rationale.trim();
    const docsUrl = getDocumentationUrl(docs);

    if (!rationaleText && !docsUrl) {
        return null;
    }

    return (
        <span className="question-info" aria-label="Question details">
            <span className="question-info-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-default">
                    <path
                        fill="currentColor"
                        d="M12.357 16.356q.143-.143.143-.356v-4.5q0-.213-.144-.356T11.999 11t-.356.144t-.143.356V16q0 .213.144.356t.357.144t.356-.144m.077-6.956q.182-.177.182-.438t-.177-.439T12 8.346t-.438.177t-.177.439t.181.438t.434.177t.434-.177m-.43 11.6q-1.867 0-3.511-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                    />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-hover">
                    <path
                        fill="currentColor"
                        d="M12.713 16.713Q13 16.425 13 16v-4q0-.425-.288-.712T12 11t-.712.288T11 12v4q0 .425.288.713T12 17t.713-.288m0-8Q13 8.425 13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9t.713-.288M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                    />
                </svg>
            </span>
            <span className="question-info-tooltip" role="tooltip">
                {rationaleText ? <span className="question-info-line">{rationaleText}</span> : null}
                {docsUrl ? (
                    <a className="question-info-link" href={docsUrl} target="_blank" rel="noreferrer">
                        Documentation
                    </a>
                ) : null}
            </span>
        </span>
    );
}
