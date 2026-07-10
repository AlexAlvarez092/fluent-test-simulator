import React, { useEffect, useMemo, useState } from 'react';
import { OpenCollectionOverview, OpenCollectionService } from '../services/OpenCollectionService';

type SelectedCollection = {
    sys_id: string;
    name: string;
};

interface OpenCollectionPageProps {
    collection: SelectedCollection | null;
    onOpenTest: (testId: string) => void;
}

export default function OpenCollectionPage({ collection, onOpenTest }: OpenCollectionPageProps) {
    const openCollectionService = useMemo(() => new OpenCollectionService(), []);

    const [overview, setOverview] = useState<OpenCollectionOverview | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [createError, setCreateError] = useState<string | null>(null);
    const [createSuccess, setCreateSuccess] = useState<string | null>(null);
    const [creatingTest, setCreatingTest] = useState(false);
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
            return 'Unable to build a test with the selected options. Please try a different mode or question count.';
        }

        return `Failed to create test: ${rawError}`;
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

            setCreateSuccess(`Test created successfully (${createdTestId})`);
            onOpenTest(createdTestId);
        } catch (err: any) {
            const rawMessage = err.message || 'Unknown error';
            setCreateError(getFriendlyCreateErrorMessage(mode, rawMessage));
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

    const stats = overview?.stats || {
        never_seen_count: 0,
        correct_count: 0,
        ever_failed_count: 0,
        last_attempt_failed_count: 0,
    };

    const formatStatus = (status: string) => {
        const normalized = status.replaceAll('_', ' ').toLowerCase();
        return normalized.charAt(0).toUpperCase() + normalized.slice(1);
    };

    return (
        <div>
            <h1>{collection.name}</h1>

            {error && (
                <div>
                    {error}
                    <button onClick={() => setError(null)}>Dismiss</button>
                </div>
            )}

            <h2>Statistics</h2>
            {loading ? (
                <div>Loading statistics...</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Never Seen</th>
                            <th>Correct</th>
                            <th>Ever Failed</th>
                            <th>Last Attempt Failed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{stats.never_seen_count}</td>
                            <td>{stats.correct_count}</td>
                            <td>{stats.ever_failed_count}</td>
                            <td>{stats.last_attempt_failed_count}</td>
                        </tr>
                    </tbody>
                </table>
            )}

            <h2>Create New Test</h2>
            {createError && (
                <div>
                    {createError}
                    <button onClick={() => setCreateError(null)}>Dismiss</button>
                </div>
            )}
            {createSuccess && (
                <div>
                    {createSuccess}
                    <button onClick={() => setCreateSuccess(null)}>Dismiss</button>
                </div>
            )}

            <form onSubmit={handleCreateTest}>
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

                <label htmlFor="test-mode">Test mode</label>
                <select
                    id="test-mode"
                    value={mode}
                    onChange={(event) =>
                        setMode(event.target.value as 'never_seen' | 'random' | 'last_attempt_failed' | 'ever_failed')
                    }
                >
                    <option value="never_seen">Never Seen</option>
                    <option value="random">Random</option>
                    <option value="last_attempt_failed">Last Attempt Failed</option>
                    <option value="ever_failed">Ever Failed</option>
                </select>

                <button type="submit" disabled={creatingTest}>
                    {creatingTest ? 'Creating...' : 'Create Test'}
                </button>
            </form>

            <h2>Previous Tests</h2>
            {loading ? (
                <div>Loading tests...</div>
            ) : !overview?.tests?.length ? (
                <div>No tests yet for this collection.</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Result (%)</th>
                            <th>Created On</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {overview.tests.map((test) => {
                            const canContinue = test.status === 'in_progress';

                            return (
                                <tr key={test.sys_id}>
                                    <td>{formatStatus(test.status)}</td>
                                    <td>{test.result}</td>
                                    <td>{test.created_on}</td>
                                    <td>
                                        {canContinue ? (
                                            <button type="button" onClick={() => onOpenTest(test.sys_id)}>
                                                Continue
                                            </button>
                                        ) : (
                                            <span>-</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}
