export class UserCollectionService {
    private readonly tableName: string;

    constructor() {
        this.tableName = 'x_2119443_test_sim_user_collection';
    }

    // Save a collection for the user
    // The Business Rule on the server will automatically set the user field to the current authenticated user
    async saveCollection(collectionId: string) {
        try {
            const response = await fetch(`/api/now/table/${this.tableName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-UserToken': window.g_ck,
                },
                body: JSON.stringify({
                    collection: collectionId,
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

    // Delete a user collection record by sys_id
    async delete(sysId: string) {
        try {
            const response = await fetch(`/api/now/table/${this.tableName}/${sysId}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'X-UserToken': window.g_ck,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `HTTP error ${response.status}`);
            }

            return response.ok;
        } catch (error) {
            console.error(`Error deleting user collection ${sysId}:`, error);
            throw error;
        }
    }
}
