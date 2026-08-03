import React from 'react';
import SectionHeadingWithLoading from '../shared/components/SectionHeadingWithLoading';
import { OpenCollectionTestSummary } from '../shared/models/OpenCollectionTypes';

interface OpenCollectionTestsSectionProps {
    loading: boolean;
    tests: OpenCollectionTestSummary[];
    onOpenTest: (testId: string, createdOn?: string) => void;
}

export default function OpenCollectionTestsSection({ loading, tests, onOpenTest }: OpenCollectionTestsSectionProps) {
    const formatStatus = (status: string) => {
        const normalized = status.replaceAll('_', ' ').toLowerCase();
        return normalized.charAt(0).toUpperCase() + normalized.slice(1);
    };

    return (
        <>
            <div className="section-title-row section-title-row-secondary">
                <SectionHeadingWithLoading title="Previous quizzes" loading={loading} />
            </div>

            {loading ? (
                <div className="tests-content-slot" aria-hidden="true"></div>
            ) : !tests.length ? (
                <div className="tests-content-slot tests-empty-message">No quizzes yet for this collection.</div>
            ) : (
                <div className="tests-content-slot">
                    <table className="tests-table">
                        <tbody>
                            {tests.map((test) => {
                                const isInProgress = test.status === 'in_progress';
                                const canOpen = isInProgress || test.status === 'completed';
                                const actionLabel = isInProgress ? 'Continue' : 'Review';

                                return (
                                    <tr
                                        key={test.sys_id}
                                        className={
                                            canOpen
                                                ? 'tests-row collection-row collection-row-clickable tests-row-clickable'
                                                : 'tests-row collection-row'
                                        }
                                        onClick={canOpen ? () => onOpenTest(test.sys_id, test.created_on) : undefined}
                                        tabIndex={canOpen ? 0 : undefined}
                                        title={canOpen ? 'Open quiz' : 'Quiz unavailable'}
                                        aria-label={
                                            canOpen
                                                ? `${actionLabel} quiz created on ${test.created_on}`
                                                : `Quiz ${formatStatus(test.status)}`
                                        }
                                    >
                                        <td>{formatStatus(test.status)}</td>
                                        <td>
                                            {test.status === 'completed' && test.total_questions > 0
                                                ? `${test.correct_count}/${test.total_questions}`
                                                : ''}
                                        </td>
                                        <td>{test.created_on}</td>
                                        <td>
                                            {canOpen ? (
                                                <span
                                                    className="text-action-button tests-action-button"
                                                    data-label={actionLabel}
                                                    aria-hidden="true"
                                                >
                                                    {actionLabel}
                                                </span>
                                            ) : (
                                                <span>-</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}
