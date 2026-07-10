declare global {
    interface Window {
        g_ck: string;
    }
}

export class CollectionService {
    private readonly collectionsListPath: string;
    private readonly publishCollectionPath: string;

    constructor() {
        this.collectionsListPath = '/api/x_2119443_test_sim/test_simulator_api/collections';
        this.publishCollectionPath = '/api/x_2119443_test_sim/test_simulator_api/collections/publish';
    }

    async list(options?: { savedOnly?: boolean }) {
        try {
            const query = new URLSearchParams();
            if (options?.savedOnly) {
                query.set('saved_only', 'true');
            }

            const url = query.toString() ? `${this.collectionsListPath}?${query.toString()}` : this.collectionsListPath;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'X-UserToken': window.g_ck,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.result?.error || `HTTP error ${response.status}`);
            }

            const payload = await response.json();
            if (!Array.isArray(payload?.result)) {
                throw new Error('Invalid response contract: expected result array');
            }

            return payload.result.map((row: any) => ({
                sys_id: String(row?.sys_id || ''),
                name: String(row?.name || ''),
                is_saved: String(row?.is_saved || 'false') === 'true',
            }));
        } catch (error) {
            console.error('Error fetching collections from custom API:', error);
            throw error;
        }
    }

    async publish(payload: unknown) {
        try {
            const response = await fetch(this.publishCollectionPath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-UserToken': window.g_ck,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.result?.error || `HTTP error ${response.status}`);
            }

            const responsePayload = await response.json();
            if (!responsePayload?.result || typeof responsePayload.result !== 'object') {
                throw new Error('Invalid response contract: expected result object');
            }

            return responsePayload;
        } catch (error) {
            console.error('Error publishing collection:', error);
            throw error;
        }
    }
}
