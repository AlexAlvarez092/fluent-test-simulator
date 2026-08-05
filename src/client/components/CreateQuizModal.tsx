import React from 'react';
import LoadingSpinnerIcon from '../shared/components/LoadingSpinnerIcon';
import { QuestionCount, QuizMode } from '../shared/models/OpenCollectionTypes';

interface CreateQuizModalProps {
    isOpen: boolean;
    creatingQuiz: boolean;
    questionCount: QuestionCount;
    mode: QuizMode;
    onClose: () => void;
    onSubmit: (event: React.FormEvent) => void;
    onQuestionCountChange: (value: QuestionCount) => void;
    onModeChange: (value: QuizMode) => void;
}

export default function CreateQuizModal({
    isOpen,
    creatingQuiz,
    questionCount,
    mode,
    onClose,
    onSubmit,
    onQuestionCountChange,
    onModeChange,
}: CreateQuizModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="app-modal-backdrop" role="presentation" onClick={onClose}>
            <div
                className="app-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-quiz-modal-title"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="app-modal-header">
                    <h2 id="create-quiz-modal-title">Create new quiz</h2>
                    <button
                        type="button"
                        className="text-action-button"
                        data-label="Close"
                        title="Close dialog"
                        onClick={onClose}
                        disabled={creatingQuiz}
                    >
                        <span className="submit-button-content">
                            <span className="button-leading-icon" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-default">
                                    <path
                                        fill="currentColor"
                                        d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"
                                    />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-hover">
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

                <form className="modal-create-form" onSubmit={onSubmit}>
                    <div className="modal-form-row">
                        <label htmlFor="question-count">Number of questions</label>
                        <select
                            id="question-count"
                            value={questionCount}
                            onChange={(event) => onQuestionCountChange(event.target.value as QuestionCount)}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="40">40</option>
                        </select>
                    </div>

                    <div className="modal-form-row">
                        <label htmlFor="quiz-mode">Quiz mode</label>
                        <select
                            id="quiz-mode"
                            value={mode}
                            onChange={(event) => onModeChange(event.target.value as QuizMode)}
                        >
                            <option value="never_seen">Never seen</option>
                            <option value="random">Random</option>
                            <option value="last_attempt_failed">Last attempt failed</option>
                            <option value="ever_failed">Ever failed</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="submit-with-spinner"
                        data-label="Create quiz"
                        title="Create quiz"
                        disabled={creatingQuiz}
                    >
                        {creatingQuiz ? (
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
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-hover">
                                        <path
                                            fill="currentColor"
                                            d="m6.8 13l2.9 2.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T3.426 12t.063-.375t.212-.325l4.6-4.6q.275-.275.7-.275t.7.275t.275.7t-.275.7L6.8 11H19V8q0-.425.288-.712T20 7t.713.288T21 8v3q0 .825-.587 1.413T19 13z"
                                        />
                                    </svg>
                                </span>
                                <span>Create quiz</span>
                            </span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
