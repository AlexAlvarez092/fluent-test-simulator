import React, { useEffect, useMemo, useState } from 'react';
import { SubmitTestResult, TestDetail, TestService } from '../services/TestService';

type AnswerSelection = Record<string, string[]>;

interface TestRunPageProps {
    testId: string | null;
}

export default function TestRunPage({ testId }: TestRunPageProps) {
    const testService = useMemo(() => new TestService(), []);

    const [testDetail, setTestDetail] = useState<TestDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitResult, setSubmitResult] = useState<SubmitTestResult | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [selection, setSelection] = useState<AnswerSelection>({});

    useEffect(() => {
        const load = async () => {
            if (!testId) {
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const detail = await testService.getTestDetail(testId);
                setTestDetail(detail);
                setSelection({});
                setSubmitResult(null);
                setSubmitError(null);
            } catch (err: any) {
                setError('Failed to load test detail: ' + (err.message || 'Unknown error'));
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        void load();
    }, [testId, testService]);

    const setSingleAnswer = (questionId: string, answerId: string) => {
        setSelection((previous) => ({
            ...previous,
            [questionId]: [answerId],
        }));
    };

    const toggleMultipleAnswer = (questionId: string, answerId: string, checked: boolean) => {
        setSelection((previous) => {
            const current = previous[questionId] || [];
            const next = checked ? [...new Set([...current, answerId])] : current.filter((id) => id !== answerId);

            return {
                ...previous,
                [questionId]: next,
            };
        });
    };

    const handleSubmit = async () => {
        if (!testDetail) {
            return;
        }

        try {
            setSubmitting(true);
            setSubmitError(null);

            const answers = testDetail.questions.map((question) => ({
                question_id: question.question_id,
                selected_answer_ids: selection[question.question_id] || [],
            }));

            const result = await testService.submitTest({
                test_id: testDetail.test.sys_id,
                answers,
            });

            setSubmitResult(result);
            const refreshed = await testService.getTestDetail(testDetail.test.sys_id);
            setTestDetail(refreshed);
        } catch (err: any) {
            setSubmitError('Failed to submit test: ' + (err.message || 'Unknown error'));
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    if (!testId) {
        return (
            <div>
                <h1>Test</h1>
                <p>No test selected.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Test</h1>

            {error && (
                <div>
                    {error}
                    <button onClick={() => setError(null)}>Dismiss</button>
                </div>
            )}

            {loading ? (
                <div>Loading test...</div>
            ) : !testDetail ? (
                <div>Test not found.</div>
            ) : (
                <div>
                    <h2>{testDetail.test.collection_name}</h2>
                    <p>Test ID: {testDetail.test.sys_id}</p>
                    <p>Status: {testDetail.test.status}</p>

                    {submitError && (
                        <div>
                            {submitError}
                            <button onClick={() => setSubmitError(null)}>Dismiss</button>
                        </div>
                    )}

                    {submitResult && (
                        <div>
                            <p>Submitted successfully.</p>
                            <p>
                                Score: {submitResult.correct_count}/{submitResult.total_questions} (
                                {submitResult.score_percent}
                                %)
                            </p>
                        </div>
                    )}

                    {testDetail.questions.map((question, index) => {
                        const selected = selection[question.question_id] || [];
                        const isMultiple = question.type === 'multiple';
                        const isLocked = submitting || testDetail.test.status === 'completed';

                        return (
                            <div key={question.test_question_id}>
                                <h3>
                                    {index + 1}. {question.question}
                                </h3>

                                {question.answers.map((answer) => (
                                    <label key={answer.sys_id}>
                                        <input
                                            type={isMultiple ? 'checkbox' : 'radio'}
                                            name={`q-${question.question_id}`}
                                            value={answer.sys_id}
                                            checked={selected.includes(answer.sys_id)}
                                            disabled={isLocked}
                                            onChange={(event) => {
                                                if (isMultiple) {
                                                    toggleMultipleAnswer(
                                                        question.question_id,
                                                        answer.sys_id,
                                                        event.target.checked
                                                    );
                                                } else {
                                                    setSingleAnswer(question.question_id, answer.sys_id);
                                                }
                                            }}
                                        />
                                        {answer.answer}
                                    </label>
                                ))}
                            </div>
                        );
                    })}

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={submitting || testDetail.test.status === 'completed'}
                    >
                        {submitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            )}
        </div>
    );
}
