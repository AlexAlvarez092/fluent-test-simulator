import React, { useEffect, useMemo, useState } from 'react';
import { OpenCollectionOverview, OpenCollectionService } from '../services/OpenCollectionService';

type SelectedCollection = {
    sys_id: string;
    name: string;
};

interface CollectionQuestionsPageProps {
    collection: SelectedCollection | null;
}

export default function CollectionQuestionsPage({ collection }: CollectionQuestionsPageProps) {
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

    return (
        <div>
            <h1>{collection.name}</h1>

            {error && (
                <div>
                    {error}
                    <button onClick={() => setError(null)}>Dismiss</button>
                </div>
            )}

            <h2>Collection Questions</h2>
            {loading ? (
                <div>Loading questions...</div>
            ) : !overview?.questions?.length ? (
                <div>No questions found for this collection.</div>
            ) : (
                <div>
                    {overview.questions.map((question, index) => (
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
