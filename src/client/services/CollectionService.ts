// Extend Window interface to include g_ck property
declare global {
    interface Window {
        g_ck: string;
    }
}

export class CollectionService {
    private readonly customApiPath: string;

    constructor() {
        this.customApiPath = '/api/x_2119443_test_sim/test_simulator_api/collections';
    }

    // Return all collections with saved status for current user
    async list(options?: { savedOnly?: boolean }) {
        try {
            const query = new URLSearchParams();
            if (options?.savedOnly) {
                query.set('saved_only', 'true');
            }

            const url = query.toString() ? `${this.customApiPath}?${query.toString()}` : this.customApiPath;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'X-UserToken': window.g_ck,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `HTTP error ${response.status}`);
            }

            const payload = await response.json();

            // Scripted REST responses may vary depending on wrapper behavior.
            // Normalize to a plain array so callers can safely map over it.
            if (Array.isArray(payload?.result)) {
                return payload.result;
            }

            if (Array.isArray(payload?.result?.result)) {
                return payload.result.result;
            }

            if (Array.isArray(payload)) {
                return payload;
            }

            return [];
        } catch (error) {
            console.error('Error fetching collections from custom API:', error);
            throw error;
        }
    }
}
