export class UserCollectionService {
    private readonly saveCollectionPath: string;

    constructor() {
        this.saveCollectionPath = '/api/x_2119443_test_sim/test_simulator_api/collections/save';
    }

    // Save a collection for the authenticated user through the custom Test Simulator API
    async saveCollection(collectionId: string) {
        try {
            const response = await fetch(this.saveCollectionPath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-UserToken': window.g_ck,
                },
                body: JSON.stringify({
                    collection_id: collectionId,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `HTTP error ${response.status}`);
            }

            return response.json();
        } catch (error) {
            console.error('Error saving collection:', error);
            throw error;
        }
    }
}
