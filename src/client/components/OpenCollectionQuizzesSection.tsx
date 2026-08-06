import React from 'react';
import SectionHeadingWithLoading from '../shared/components/SectionHeadingWithLoading';
import { OpenCollectionQuizSummary } from '../shared/models/OpenCollectionTypes';

interface OpenCollectionQuizzesSectionProps {
    loading: boolean;
    quizzes: OpenCollectionQuizSummary[];
    onOpenQuiz: (quizId: string, createdOn?: string) => void;
}

export default function OpenCollectionQuizzesSection({
    loading,
    quizzes,
    onOpenQuiz,
}: OpenCollectionQuizzesSectionProps) {
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
                <div className="quizzes-content-slot" aria-hidden="true"></div>
            ) : !quizzes.length ? (
                <div className="quizzes-content-slot">No quizzes yet for this collection.</div>
            ) : (
                <div className="quizzes-content-slot">
                    <table className="quizzes-table">
                        <tbody>
                            {quizzes.map((quiz) => {
                                const isInProgress = quiz.status === 'in_progress';
                                const canOpen = isInProgress || quiz.status === 'completed';
                                const actionLabel = isInProgress ? 'Continue' : 'Review';

                                return (
                                    <tr
                                        key={quiz.sys_id}
                                        className={
                                            canOpen
                                                ? 'quizzes-row collection-row collection-row-clickable quizzes-row-clickable'
                                                : 'quizzes-row collection-row'
                                        }
                                        onClick={canOpen ? () => onOpenQuiz(quiz.sys_id, quiz.created_on) : undefined}
                                        tabIndex={canOpen ? 0 : undefined}
                                        title={canOpen ? 'Open quiz' : 'Quiz unavailable'}
                                        aria-label={
                                            canOpen
                                                ? `${actionLabel} quiz created on ${quiz.created_on}`
                                                : `Quiz ${formatStatus(quiz.status)}`
                                        }
                                    >
                                        <td>{formatStatus(quiz.status)}</td>
                                        <td>
                                            {quiz.status === 'completed' && quiz.total_questions > 0
                                                ? `${quiz.correct_count}/${quiz.total_questions}`
                                                : ''}
                                        </td>
                                        <td>{quiz.created_on}</td>
                                        <td>
                                            {canOpen ? (
                                                <span
                                                    className="text-action-button quizzes-action-button"
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
