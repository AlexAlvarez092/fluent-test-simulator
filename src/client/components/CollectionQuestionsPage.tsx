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
}

export default function CollectionQuestionsPage({ collection, filter }: CollectionQuestionsPageProps) {
    const openCollectionService = useMemo(() => new OpenCollectionService(), []);

    const [overview, setOverview] = useState<OpenCollectionOverview | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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
                setError('Failed to load collection questions: ' + (err.message || 'Unknown error'));
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
            <h1>{collection.name}</h1>

            {error && (
                <div>
                    {error}
                    <button title="Dismiss message" onClick={() => setError(null)}>
                        Dismiss
                    </button>
                </div>
            )}

            <h2>{filterTitleMap[filter]}</h2>
            {loading ? (
                <div>Loading questions...</div>
            ) : !filteredQuestions.length ? (
                <div>No questions found for this filter.</div>
            ) : (
                <div>
                    {filteredQuestions.map((question, index) => (
                        <div key={question.sys_id}>
                            <h3>
                                {index + 1}. {question.question}
                            </h3>
                            <p>Type: {question.type}</p>
                            {question.rationale && <p>Rationale: {question.rationale}</p>}
                            {question.docs && <p>Docs: {question.docs}</p>}
                            <ul>
                                {question.answers.map((answer) => (
                                    <li key={answer.sys_id}>
                                        {answer.answer}
                                        {answer.is_correct ? ' (Correct)' : ''}
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
