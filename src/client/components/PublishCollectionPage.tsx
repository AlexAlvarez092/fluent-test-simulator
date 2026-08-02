import React, { useMemo, useState } from 'react';
import { CollectionService } from '../services/CollectionService';
import LoadingSpinnerIcon from '../shared/components/LoadingSpinnerIcon';
import { reportAsyncError } from '../shared/services/errorHandling';

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
            return;
        }

        try {
            setSubmitting(true);
            await collectionService.publish(parsedPayload);
            setSuccess('Collection published successfully');
            setPayloadText('');
        } catch (err: any) {
            reportAsyncError(err, onError);
        } finally {
            setSubmitting(false);
        }
    };

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
                    {submitting ? <LoadingSpinnerIcon className="button-loading-icon" /> : 'Publish'}
                </button>
            </form>
        </div>
    );
}
