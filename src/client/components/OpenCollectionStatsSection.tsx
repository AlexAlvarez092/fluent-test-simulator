import React from 'react';
import SectionHeadingWithLoading from '../shared/components/SectionHeadingWithLoading';
import { OpenCollectionStats, QuestionFilter } from '../shared/models/OpenCollectionTypes';

interface OpenCollectionStatsSectionProps {
    loading: boolean;
    stats: OpenCollectionStats;
    allQuestionsCount: number;
    onOpenQuestions: (filter: QuestionFilter) => void;
    onOpenCreateModal: () => void;
}

export default function OpenCollectionStatsSection({
    loading,
    stats,
    allQuestionsCount,
    onOpenQuestions,
    onOpenCreateModal,
}: OpenCollectionStatsSectionProps) {
    const renderStatsLink = (label: string, value: number, filter: QuestionFilter) => (
        <button
            type="button"
            className="stats-count-link"
            data-label={String(value)}
            title={label}
            onClick={() => onOpenQuestions(filter)}
            aria-label={label}
        >
            {value}
        </button>
    );

    return (
        <>
            <div className="section-title-row">
                <SectionHeadingWithLoading title="Statistics" loading={loading} />
                <button
                    type="button"
                    className="text-action-button new-quiz-button"
                    data-label="Create quiz"
                    title="Create quiz"
                    onClick={onOpenCreateModal}
                >
                    <span className="submit-button-content">
                        <span className="button-leading-icon" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-default">
                                <path
                                    fill="currentColor"
                                    d="M11.5 12.5h-5q-.213 0-.356-.144T6 11.999t.144-.356t.356-.143h5v-5q0-.213.144-.356T12.001 6t.356.144t.143.356v5h5q.213 0 .356.144t.144.357t-.144.356t-.356.143h-5v5q0 .213-.144.356t-.357.144t-.356-.144t-.143-.356z"
                                />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-hover">
                                <path
                                    fill="currentColor"
                                    d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"
                                />
                            </svg>
                        </span>
                        <span>Create quiz</span>
                    </span>
                </button>
            </div>

            {loading ? (
                <div className="stats-content-slot" aria-hidden="true"></div>
            ) : (
                <div className="stats-content-slot">
                    <table className="stats-table">
                        <thead>
                            <tr>
                                <th>Never seen</th>
                                <th>Correct</th>
                                <th>Ever failed</th>
                                <th>Last attempt failed</th>
                                <th>All</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {renderStatsLink('Open never seen questions', stats.never_seen_count, 'never_seen')}
                                </td>
                                <td>{renderStatsLink('Open correct questions', stats.correct_count, 'correct')}</td>
                                <td>
                                    {renderStatsLink(
                                        'Open ever failed questions',
                                        stats.ever_failed_count,
                                        'ever_failed'
                                    )}
                                </td>
                                <td>
                                    {renderStatsLink(
                                        'Open last attempt failed questions',
                                        stats.last_attempt_failed_count,
                                        'last_attempt_failed'
                                    )}
                                </td>
                                <td>{renderStatsLink('Open All questions', allQuestionsCount, 'all')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}
