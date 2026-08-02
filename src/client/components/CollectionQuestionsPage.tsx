import React, { useEffect, useMemo, useState } from 'react';
import { OpenCollectionOverview, OpenCollectionService } from '../services/OpenCollectionService';

type SelectedCollection = {
    sys_id: string;
    name: string;
};

type QuestionFilter = 'all' | 'never_seen' | 'correct' | 'ever_failed' | 'last_attempt_failed';

interface CollectionQuestionsPageProps {
    collection: SelectedCollection | null;
    filter: QuestionFilter;
    onBackToCollection: () => void;
    onError: () => void;
}

export default function CollectionQuestionsPage({
    collection,
    filter,
    onBackToCollection,
    onError,
}: CollectionQuestionsPageProps) {
    const openCollectionService = useMemo(() => new OpenCollectionService(), []);

    const [overview, setOverview] = useState<OpenCollectionOverview | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadOverview = async () => {
            if (!collection?.sys_id) {
                return;
            }

            try {
                setLoading(true);
                const data = await openCollectionService.getOverview(collection.sys_id);
                setOverview(data);
            } catch (err: any) {
                onError();
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        void loadOverview();
    }, [collection?.sys_id, openCollectionService]);

    if (!collection) {
        return (
            <div>
                <h1>Collection Questions</h1>
                <p>No collection selected.</p>
            </div>
        );
    }

    const filterTitleMap: Record<QuestionFilter, string> = {
        all: 'All Questions',
        never_seen: 'Never Seen Questions',
        correct: 'Correct Questions',
        ever_failed: 'Ever Failed Questions',
        last_attempt_failed: 'Last Attempt Failed Questions',
    };

    const allQuestions = overview?.questions || [];
    const groupIds = overview?.question_groups || {
        never_seen: [],
        correct: [],
        ever_failed: [],
        last_attempt_failed: [],
    };

    const filterSet =
        filter === 'all'
            ? null
            : new Set(
                  filter === 'never_seen'
                      ? groupIds.never_seen
                      : filter === 'correct'
                        ? groupIds.correct
                        : filter === 'ever_failed'
                          ? groupIds.ever_failed
                          : groupIds.last_attempt_failed
              );

    const filteredQuestions = filterSet
        ? allQuestions.filter((question) => filterSet.has(question.sys_id))
        : allQuestions;

    return (
        <div>
            <div className="quiz-page-header-row">
                <h1 className="page-title-with-loading">
                    <span className="title-loading-icon" data-loading={loading ? 'true' : 'false'} aria-hidden="true">
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
                    {collection.name}
                </h1>
                <button
                    type="button"
                    className="text-action-button back-to-collection-button"
                    data-label="Back to collection"
                    title="Back to collection"
                    onClick={onBackToCollection}
                >
                    <span className="back-icon-stack" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-default">
                            <path d="m6.523 12.5l3.735 3.735q.146.146.153.344q.006.198-.153.363q-.166.166-.357.168t-.357-.162l-4.382-4.383q-.243-.242-.243-.565t.243-.566l4.382-4.382q.147-.146.347-.153q.201-.007.367.159q.16.165.162.353q.003.189-.162.354L6.523 11.5h12.38q.214 0 .358.143t.143.357t-.143.357t-.357.143z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-hover">
                            <path d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12t-.288.713T19 13z" />
                        </svg>
                    </span>
                    Back to collection
                </button>
            </div>

            <h2>{filterTitleMap[filter]}</h2>
            {loading ? (
                <div className="inline-loading-state" aria-live="polite" aria-label="Loading questions" />
            ) : !filteredQuestions.length ? (
                <div>No questions found for this filter.</div>
            ) : (
                <div>
                    {filteredQuestions.map((question, index) => (
                        <div key={question.sys_id}>
                            <h3>
                                {index + 1}. {question.question}
                            </h3>
                            {question.rationale && <p>Rationale: {question.rationale}</p>}
                            {question.docs && <p>Docs: {question.docs}</p>}
                            <ul>
                                {question.answers.map((answer) => (
                                    <li key={answer.sys_id} className="answer-option">
                                        <span className={`answer-option-text ${answer.is_correct ? 'is-correct' : ''}`}>
                                            {answer.answer}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
