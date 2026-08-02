import React, { useEffect, useMemo, useState } from 'react';
import { OpenCollectionOverview, OpenCollectionService } from '../services/OpenCollectionService';

type SelectedCollection = {
    sys_id: string;
    name: string;
};

type QuestionFilter = 'all' | 'never_seen' | 'correct' | 'ever_failed' | 'last_attempt_failed';

interface OpenCollectionPageProps {
    collection: SelectedCollection | null;
    onOpenTest: (testId: string, createdOn?: string) => void;
    onOpenQuestions: (filter: QuestionFilter) => void;
    onError: () => void;
}

export default function OpenCollectionPage({
    collection,
    onOpenTest,
    onOpenQuestions,
    onError,
}: OpenCollectionPageProps) {
    const openCollectionService = useMemo(() => new OpenCollectionService(), []);

    const [overview, setOverview] = useState<OpenCollectionOverview | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [createError, setCreateError] = useState<string | null>(null);
    const [createSuccess, setCreateSuccess] = useState<string | null>(null);
    const [creatingTest, setCreatingTest] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [questionCount, setQuestionCount] = useState<'10' | '20' | '40'>('10');
    const [mode, setMode] = useState<'never_seen' | 'random' | 'last_attempt_failed' | 'ever_failed'>('never_seen');

    const getFriendlyCreateErrorMessage = (
        modeValue: 'never_seen' | 'random' | 'last_attempt_failed' | 'ever_failed',
        rawError: string
    ) => {
        const modeLabelMap: Record<typeof modeValue, string> = {
            never_seen: 'Never Seen',
            random: 'Random',
            last_attempt_failed: 'Last Attempt Failed',
            ever_failed: 'Ever Failed',
        };

        if (rawError.includes('No questions available for mode')) {
            return `No questions are currently available for '${modeLabelMap[modeValue]}' mode. Try another mode.`;
        }

        if (rawError.includes('Unable to select questions for the new test')) {
            return 'Unable to build a quiz with the selected options. Please try a different mode or question count.';
        }

        return `Failed to create quiz: ${rawError}`;
    };

    const loadOverview = async () => {
        if (!collection?.sys_id) {
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const data = await openCollectionService.getOverview(collection.sys_id);
            setOverview(data);
        } catch (err: any) {
            setError('Failed to load collection overview: ' + (err.message || 'Unknown error'));
            onError();
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadOverview();
    }, [collection?.sys_id]);

    const handleCreateTest = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!collection?.sys_id) {
            setCreateError('Collection is required');
            return;
        }

        try {
            setCreatingTest(true);
            setCreateError(null);
            setCreateSuccess(null);

            const created = await openCollectionService.createTest({
                collection_id: collection.sys_id,
                question_count: questionCount,
                mode,
            });

            const createdTestId = created.test_id;
            if (!createdTestId) {
                throw new Error('Invalid response contract: test_id is required');
            }

            setCreateSuccess('Quiz created successfully');
            onOpenTest(createdTestId, created.created_on);
        } catch (err: any) {
            const rawMessage = err.message || 'Unknown error';
            setCreateError(getFriendlyCreateErrorMessage(mode, rawMessage));
            onError();
            console.error(err);
        } finally {
            setCreatingTest(false);
        }
    };

    if (!collection) {
        return (
            <div>
                <h1>Collection</h1>
                <p>No collection selected.</p>
            </div>
        );
    }

    const unauthorizedError = error && error.includes('HTTP error 401') ? error : null;

    if (unauthorizedError) {
        return <div>{unauthorizedError}</div>;
    }

    const stats = overview?.stats || {
        never_seen_count: 0,
        correct_count: 0,
        ever_failed_count: 0,
        last_attempt_failed_count: 0,
    };
    const allQuestionsCount = overview?.questions?.length || 0;

    const formatStatus = (status: string) => {
        const normalized = status.replaceAll('_', ' ').toLowerCase();
        return normalized.charAt(0).toUpperCase() + normalized.slice(1);
    };

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

    const renderSectionLoadingIcon = () => (
        <span className="section-loading-icon" data-loading={loading ? 'true' : 'false'} aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3c4.97 0 9 4.03 9 9"
                >
                    <animateTransform
                        attributeName="transform"
                        dur="1.5s"
                        repeatCount="indefinite"
                        type="rotate"
                        values="0 12 12;360 12 12"
                    />
                </path>
            </svg>
        </span>
    );

    const handleOpenCreateModal = () => {
        setCreateError(null);
        setCreateSuccess(null);
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        if (creatingTest) {
            return;
        }

        setCreateError(null);
        setCreateSuccess(null);
        setIsCreateModalOpen(false);
    };

    return (
        <div>
            <h1>{collection.name}</h1>

            {error && (
                <div>
                    {error}
                    <button title="Dismiss message" onClick={() => setError(null)}>
                        Dismiss
                    </button>
                </div>
            )}

            <div className="section-title-row">
                <div className="section-heading-with-loading">
                    {renderSectionLoadingIcon()}
                    <h2>Statistics</h2>
                </div>
                <button
                    type="button"
                    className="text-action-button"
                    data-label="+ New quiz"
                    title="Create quiz"
                    onClick={handleOpenCreateModal}
                >
                    + New quiz
                </button>
            </div>
            {loading ? (
                <div className="stats-content-slot" aria-hidden="true"></div>
            ) : (
                <div className="stats-content-slot">
                    <table className="stats-table">
                        <thead>
                            <tr>
                                <th>Never Seen</th>
                                <th>Correct</th>
                                <th>Ever Failed</th>
                                <th>Last Attempt Failed</th>
                                <th>All</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {renderStatsLink('Open Never Seen questions', stats.never_seen_count, 'never_seen')}
                                </td>
                                <td>{renderStatsLink('Open Correct questions', stats.correct_count, 'correct')}</td>
                                <td>
                                    {renderStatsLink(
                                        'Open Ever Failed questions',
                                        stats.ever_failed_count,
                                        'ever_failed'
                                    )}
                                </td>
                                <td>
                                    {renderStatsLink(
                                        'Open Last Attempt Failed questions',
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

            <div className="section-title-row section-title-row-secondary">
                <div className="section-heading-with-loading">
                    {renderSectionLoadingIcon()}
                    <h2>Previous Quizzes</h2>
                </div>
            </div>
            {loading ? (
                <div className="tests-content-slot" aria-hidden="true"></div>
            ) : !overview?.tests?.length ? (
                <div className="tests-content-slot tests-empty-message">No quizzes yet for this collection.</div>
            ) : (
                <div className="tests-content-slot">
                    <table className="tests-table">
                        <tbody>
                            {overview.tests.map((test) => {
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
                                        onKeyDown={
                                            canOpen
                                                ? (event) => {
                                                      if (event.key === 'Enter' || event.key === ' ') {
                                                          event.preventDefault();
                                                          onOpenTest(test.sys_id, test.created_on);
                                                      }
                                                  }
                                                : undefined
                                        }
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

            {isCreateModalOpen && (
                <div className="app-modal-backdrop" role="presentation" onClick={handleCloseCreateModal}>
                    <div
                        className="app-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="create-test-modal-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="app-modal-header">
                            <h2 id="create-test-modal-title">Create New Quiz</h2>
                            <button
                                type="button"
                                className="text-action-button"
                                data-label="Close"
                                title="Close dialog"
                                onClick={handleCloseCreateModal}
                                disabled={creatingTest}
                            >
                                Close
                            </button>
                        </div>

                        {createError && (
                            <div>
                                {createError}
                                <button type="button" title="Dismiss message" onClick={() => setCreateError(null)}>
                                    Dismiss
                                </button>
                            </div>
                        )}
                        {createSuccess && (
                            <div>
                                {createSuccess}
                                <button type="button" title="Dismiss message" onClick={() => setCreateSuccess(null)}>
                                    Dismiss
                                </button>
                            </div>
                        )}

                        <form className="modal-create-form" onSubmit={handleCreateTest}>
                            <div className="modal-form-row">
                                <label htmlFor="question-count">Number of questions</label>
                                <select
                                    id="question-count"
                                    value={questionCount}
                                    onChange={(event) => setQuestionCount(event.target.value as '10' | '20' | '40')}
                                >
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="40">40</option>
                                </select>
                            </div>

                            <div className="modal-form-row">
                                <label htmlFor="test-mode">Quiz mode</label>
                                <select
                                    id="test-mode"
                                    value={mode}
                                    onChange={(event) =>
                                        setMode(
                                            event.target.value as
                                                'never_seen' | 'random' | 'last_attempt_failed' | 'ever_failed'
                                        )
                                    }
                                >
                                    <option value="never_seen">Never Seen</option>
                                    <option value="random">Random</option>
                                    <option value="last_attempt_failed">Last Attempt Failed</option>
                                    <option value="ever_failed">Ever Failed</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="submit-with-spinner"
                                data-label="Create Quiz"
                                title="Create quiz"
                                disabled={creatingTest}
                            >
                                {creatingTest ? (
                                    <span className="button-loading-icon" aria-hidden="true">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 3c4.97 0 9 4.03 9 9"
                                            >
                                                <animateTransform
                                                    attributeName="transform"
                                                    dur="1.5s"
                                                    repeatCount="indefinite"
                                                    type="rotate"
                                                    values="0 12 12;360 12 12"
                                                />
                                            </path>
                                        </svg>
                                    </span>
                                ) : (
                                    'Create Quiz'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
