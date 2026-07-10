import React, { useMemo, useState } from 'react';
import { CollectionService } from '../services/CollectionService';

export default function PublishCollectionPage() {
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
            const response = await collectionService.publish(parsedPayload);
            const publishResult = response?.result;
            setSuccess(publishResult ? 'Collection published successfully' : 'Collection published successfully');
            setPayloadText('');
        } catch (err: any) {
            setError('Failed to publish collection: ' + (err.message || 'Unknown error'));
            console.error(err);
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
                    <button onClick={() => setError(null)}>Dismiss</button>
                </div>
            )}

            {success && (
                <div>
                    {success}
                    <button onClick={() => setSuccess(null)}>Dismiss</button>
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
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Publishing...' : 'Publish'}
                </button>
            </form>
        </div>
    );
}
