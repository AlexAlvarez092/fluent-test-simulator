import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TestDetail, TestService } from '../services/TestService';
import LoadingSpinnerIcon from '../shared/components/LoadingSpinnerIcon';
import QuizPageHeader from '../shared/components/QuizPageHeader';
import { reportAsyncError } from '../shared/services/errorHandling';

type AnswerSelection = Record<string, string[]>;

interface TestRunPageProps {
    testId: string | null;
    onQuizSubmitted: () => void;
    onBackToCollection: () => void;
    onError: () => void;
}

export default function TestRunPage({ testId, onQuizSubmitted, onBackToCollection, onError }: TestRunPageProps) {
    const testService = useMemo(() => new TestService(), []);

    const [testDetail, setTestDetail] = useState<TestDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [saving, setSaving] = useState(false);
    const [selection, setSelection] = useState<AnswerSelection>({});
    const [hasPendingAutoSave, setHasPendingAutoSave] = useState(false);
    const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isHeaderLoading = loading || saving || submitting || hasPendingAutoSave;

    useEffect(() => {
        const load = async () => {
            if (!testId) {
                return;
            }

            try {
                setLoading(true);
                const detail = await testService.getTestDetail(testId);
                setTestDetail(detail);
                const nextSelection: AnswerSelection = {};
                for (let i = 0; i < detail.questions.length; i += 1) {
                    const question = detail.questions[i];
                    nextSelection[question.question_id] = question.selected_answer_ids || [];
                }
                setSelection(nextSelection);
                setHasPendingAutoSave(false);
            } catch (err: any) {
                reportAsyncError(err, onError);
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

                    const answers = testDetail.questions.map((question) => ({
                        question_id: question.question_id,
                        selected_answer_ids: selection[question.question_id] || [],
                    }));

                    await testService.saveTestProgress({
                        test_id: testDetail.test.sys_id,
                        answers,
                    });
                    setHasPendingAutoSave(false);
                } catch (err: any) {
                    reportAsyncError(err, onError);
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
            setHasPendingAutoSave(false);

            if (autoSaveTimerRef.current) {
                clearTimeout(autoSaveTimerRef.current);
            }

            const answers = testDetail.questions.map((question) => ({
                question_id: question.question_id,
                selected_answer_ids: selection[question.question_id] || [],
            }));

            await testService.submitTest({
                test_id: testDetail.test.sys_id,
                answers,
            });
            onQuizSubmitted();
        } catch (err: any) {
            reportAsyncError(err, onError);
        } finally {
            setSubmitting(false);
        }
    };

    const quizHeader = (
        <QuizPageHeader title="Quiz" loading={isHeaderLoading} onBackToCollection={onBackToCollection} />
    );

    if (!testId) {
        return (
            <div>
                {quizHeader}
                <p>No quiz selected.</p>
            </div>
        );
    }

    return (
        <div>
            {quizHeader}

            {loading ? (
                <div className="inline-loading-state" aria-live="polite" aria-label="Loading quiz" />
            ) : !testDetail ? (
                <div>Quiz not found.</div>
            ) : (
                <div>
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
                                {question.answers.map((answer) => {
                                    const isSelected = selected.includes(answer.sys_id);
                                    const answerStateClass =
                                        isCompleted && answer.is_correct
                                            ? 'is-correct'
                                            : isCompleted && isSelected && !answer.is_correct
                                              ? 'is-wrong'
                                              : '';

                                    return (
                                        <label key={answer.sys_id} className="answer-option">
                                            <input
                                                type={isMultiple ? 'checkbox' : 'radio'}
                                                name={`q-${question.question_id}`}
                                                value={answer.sys_id}
                                                checked={isSelected}
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
                                            <span className={`answer-option-text ${answerStateClass}`}>
                                                {answer.answer}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        );
                    })}

                    {testDetail.test.status !== 'completed' && (
                        <button
                            type="button"
                            className="submit-with-spinner quiz-submit-button"
                            data-label="Submit Quiz"
                            title="Submit quiz"
                            onClick={handleSubmit}
                            disabled={submitting}
                        >
                            {submitting ? (
                                <LoadingSpinnerIcon className="button-loading-icon" />
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
                                    <span>Submit</span>
                                </span>
                            )}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
