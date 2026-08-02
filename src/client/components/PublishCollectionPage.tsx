import React, { useMemo, useState } from 'react';
import { CollectionService } from '../services/CollectionService';

interface PublishCollectionPageProps {
    onError: () => void;
}

export default function PublishCollectionPage({ onError }: PublishCollectionPageProps) {
    const [payloadText, setPayloadText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const collectionService = useMemo(() => new CollectionService(), []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        let parsedPayload: unknown;
        try {
            parsedPayload = JSON.parse(payloadText);
        } catch (_error) {
            setError('The body must be valid JSON');
            onError();
            return;
        }

        try {
            setSubmitting(true);
            const response = await collectionService.publish(parsedPayload);
            const publishResult = response?.result;
            setSuccess(publishResult ? 'Collection published successfully' : 'Collection published successfully');
            setPayloadText('');
        } catch (err: any) {
            setError('Failed to publish collection: ' + (err.message || 'Unknown error'));
            onError();
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const unauthorizedError = error && error.includes('HTTP error 401') ? error : null;

    if (unauthorizedError) {
        return <div>{unauthorizedError}</div>;
    }

    return (
        <div>
            <h1>Publish Collection</h1>

            {error && (
                <div>
                    {error}
                    <button title="Dismiss message" onClick={() => setError(null)}>
                        Dismiss
                    </button>
                </div>
            )}

            {success && (
                <div>
                    {success}
                    <button title="Dismiss message" onClick={() => setSuccess(null)}>
                        Dismiss
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <label htmlFor="publish-body">Collection JSON body</label>
                <br />
                <textarea
                    id="publish-body"
                    value={payloadText}
                    onChange={(event) => setPayloadText(event.target.value)}
                    rows={16}
                    cols={100}
                    placeholder='{"collection":{"name":"My Collection","questions":[...]}}'
                    required
                />
                <br />
                <button type="submit" title="Publish collection" disabled={submitting}>
                    {submitting ? (
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
                        'Publish'
                    )}
                </button>
            </form>
        </div>
    );
}
