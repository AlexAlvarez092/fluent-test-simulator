import React, { useEffect, useMemo, useState } from 'react';
import { OpenCollectionOverview, OpenCollectionService } from '../services/OpenCollectionService';
import QuizPageHeader from '../shared/components/QuizPageHeader';
import { reportAsyncError } from '../shared/services/errorHandling';

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
                reportAsyncError(err, onError);
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
            <QuizPageHeader title={collection.name} loading={loading} onBackToCollection={onBackToCollection} />

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
