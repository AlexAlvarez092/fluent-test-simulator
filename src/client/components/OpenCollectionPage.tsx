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
                    className="text-action-button new-quiz-button"
                    data-label="New quiz"
                    title="Create quiz"
                    onClick={handleOpenCreateModal}
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
                        <span>New quiz</span>
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
                                <span className="submit-button-content">
                                    <span className="button-leading-icon" aria-hidden="true">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            className="icon-default"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"
                                            />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            className="icon-hover"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
                                            />
                                        </svg>
                                    </span>
                                    <span>Close</span>
                                </span>
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
                                    <span className="submit-button-content">
                                        <span className="button-leading-icon" aria-hidden="true">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                className="icon-default"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="m5.916 12.5l3.746 3.746q.14.14.15.345q.01.203-.15.363t-.354.16t-.354-.16l-4.389-4.389q-.13-.13-.183-.267q-.053-.136-.053-.298t.053-.298t.184-.267l4.388-4.389q.14-.14.344-.15t.364.15t.16.354t-.16.354L5.916 11.5h12.469q.269 0 .442-.173t.173-.442V8q0-.213.143-.357T19.5 7.5t.357.143T20 8v2.885q0 .67-.472 1.143q-.472.472-1.143.472z"
                                                />
                                            </svg>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                className="icon-hover"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="m6.8 13l2.9 2.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T3.426 12t.063-.375t.212-.325l4.6-4.6q.275-.275.7-.275t.7.275t.275.7t-.275.7L6.8 11H19V8q0-.425.288-.712T20 7t.713.288T21 8v3q0 .825-.587 1.413T19 13z"
                                                />
                                            </svg>
                                        </span>
                                        <span>Create Quiz</span>
                                    </span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
