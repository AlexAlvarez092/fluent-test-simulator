import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SaveTestProgressResult, SubmitTestResult, TestDetail, TestService } from '../services/TestService';

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
    const [saveResult, setSaveResult] = useState<SaveTestProgressResult | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [saving, setSaving] = useState(false);
    const [selection, setSelection] = useState<AnswerSelection>({});
    const [hasPendingAutoSave, setHasPendingAutoSave] = useState(false);
    const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
                const nextSelection: AnswerSelection = {};
                for (let i = 0; i < detail.questions.length; i += 1) {
                    const question = detail.questions[i];
                    nextSelection[question.question_id] = question.selected_answer_ids || [];
                }
                setSelection(nextSelection);
                setSubmitResult(null);
                setSaveResult(null);
                setHasPendingAutoSave(false);
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
        setHasPendingAutoSave(true);
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
        setHasPendingAutoSave(true);
    };

    useEffect(() => {
        if (!testDetail || testDetail.test.status === 'completed' || !hasPendingAutoSave || submitting) {
            return;
        }

        if (autoSaveTimerRef.current) {
            clearTimeout(autoSaveTimerRef.current);
        }

        autoSaveTimerRef.current = setTimeout(() => {
            const save = async () => {
                try {
                    setSaving(true);
                    setSubmitError(null);
                    setSubmitResult(null);

                    const answers = testDetail.questions.map((question) => ({
                        question_id: question.question_id,
                        selected_answer_ids: selection[question.question_id] || [],
                    }));

                    const result = await testService.saveTestProgress({
                        test_id: testDetail.test.sys_id,
                        answers,
                    });

                    setSaveResult(result);
                    setHasPendingAutoSave(false);
                } catch (err: any) {
                    setSubmitError('Failed to save progress: ' + (err.message || 'Unknown error'));
                    console.error(err);
                } finally {
                    setSaving(false);
                }
            };

            void save();
        }, 700);

        return () => {
            if (autoSaveTimerRef.current) {
                clearTimeout(autoSaveTimerRef.current);
            }
        };
    }, [hasPendingAutoSave, selection, submitting, testDetail, testService]);

    const handleSubmit = async () => {
        if (!testDetail) {
            return;
        }

        try {
            setSubmitting(true);
            setSubmitError(null);
            setSaveResult(null);
            setHasPendingAutoSave(false);

            if (autoSaveTimerRef.current) {
                clearTimeout(autoSaveTimerRef.current);
            }

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
                    {testDetail.test.status !== 'completed' && (
                        <p>
                            Auto-save:{' '}
                            {saving ? 'Saving...' : hasPendingAutoSave ? 'Pending changes...' : 'All changes saved'}
                        </p>
                    )}

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

                    {saveResult && (
                        <div>
                            <p>Progress saved.</p>
                            <p>Questions saved: {saveResult.saved_questions_count}</p>
                        </div>
                    )}

                    {testDetail.questions.map((question, index) => {
                        const selected = selection[question.question_id] || [];
                        const isMultiple = question.type === 'multiple';
                        const isLocked = submitting || saving || testDetail.test.status === 'completed';
                        const isCompleted = testDetail.test.status === 'completed';

                        return (
                            <div key={question.test_question_id}>
                                <h3>
                                    {index + 1}. {question.question}
                                </h3>
                                {isCompleted && <p>Question result: {question.status}</p>}

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
                                        {isCompleted && answer.is_correct && ' (Correct)'}
                                        {isCompleted &&
                                            selected.includes(answer.sys_id) &&
                                            !answer.is_correct &&
                                            ' (Your wrong answer)'}
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
