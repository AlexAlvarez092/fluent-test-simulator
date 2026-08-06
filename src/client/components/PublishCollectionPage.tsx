import React, { useMemo, useState } from 'react';
import { CollectionService } from '../services/CollectionService';
import LoadingSpinnerIcon from '../shared/components/LoadingSpinnerIcon';
import { reportAsyncError } from '../shared/services/errorHandling';

interface PublishCollectionPageProps {
    onError: () => void;
    onPublished: () => void;
}

export default function PublishCollectionPage({ onError, onPublished }: PublishCollectionPageProps) {
    const [payloadText, setPayloadText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const collectionService = useMemo(() => new CollectionService(), []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        let parsedPayload: unknown;
        try {
            parsedPayload = JSON.parse(payloadText);
        } catch (_error) {
            setError('The body must be valid JSON');
            return;
        }

        try {
            setSubmitting(true);
            await collectionService.publish(parsedPayload);
            onPublished();
        } catch (err: any) {
            reportAsyncError(err, onError);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="publish-page">
            <h1>Publish collection</h1>

            {error && (
                <div className="publish-feedback publish-feedback-error" role="status" aria-live="polite">
                    <span>{error}</span>
                    <button
                        type="button"
                        className="text-action-button"
                        data-label="Dismiss"
                        title="Dismiss message"
                        onClick={() => setError(null)}
                    >
                        Dismiss
                    </button>
                </div>
            )}

            <form className="publish-form" onSubmit={handleSubmit}>
                <div className="modal-form-row">
                    <textarea
                        id="publish-body"
                        className="publish-json-input"
                        value={payloadText}
                        onChange={(event) => setPayloadText(event.target.value)}
                        rows={18}
                        placeholder='{"collection":{"name":"My collection","questions":[...]}}'
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="submit-with-spinner publish-submit-button"
                    data-label="Publish collection"
                    title="Publish collection"
                    disabled={submitting}
                >
                    {submitting ? (
                        <LoadingSpinnerIcon className="button-loading-icon" />
                    ) : (
                        <span className="submit-button-content">
                            <span className="icon-stack" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-default">
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
                            <span>Publish collection</span>
                        </span>
                    )}
                </button>
            </form>
        </div>
    );
}
