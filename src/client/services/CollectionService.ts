// Extend Window interface to include g_ck property
declare global {
    interface Window {
        g_ck: string;
    }
}

export class CollectionService {
    private readonly tableName: string;

    constructor() {
        this.tableName = 'x_2119443_test_sim_collection';
    }

    // Return all collections
    async list() {
        try {
            const searchParams = new URLSearchParams();
            searchParams.set('sysparm_display_value', 'all');
            searchParams.set('sysparm_fields', 'sys_id,name');
            searchParams.set('sysparm_query', 'ORDERBYDESCname');

            const response = await fetch(`/api/now/table/${this.tableName}?${searchParams.toString()}`, {
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

            const { result } = await response.json();
            return result || [];
        } catch (error) {
            console.error('Error fetching collections:', error);
            throw error;
        }
    }

    // Get a single collection by sys_id
    async get(sysId: string) {
        try {
            const searchParams = new URLSearchParams();
            searchParams.set('sysparm_display_value', 'all');

            const response = await fetch(`/api/now/table/${this.tableName}/${sysId}?${searchParams.toString()}`, {
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

            const { result } = await response.json();
            return result;
        } catch (error) {
            console.error(`Error fetching collection ${sysId}:`, error);
            throw error;
        }
    }

    // Create a new collection
    async create(data: { name: string }) {
        try {
            const response = await fetch(`/api/now/table/${this.tableName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-UserToken': window.g_ck,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `HTTP error ${response.status}`);
            }

            return response.json();
        } catch (error) {
            console.error('Error creating collection:', error);
            throw error;
        }
    }

    // Update a collection
    async update(sysId: string, data: { name: string }) {
        try {
            const response = await fetch(`/api/now/table/${this.tableName}/${sysId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-UserToken': window.g_ck,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `HTTP error ${response.status}`);
            }

            return response.json();
        } catch (error) {
            console.error(`Error updating collection ${sysId}:`, error);
            throw error;
        }
    }

    // Delete a collection
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
            console.error(`Error deleting collection ${sysId}:`, error);
            throw error;
        }
    }
}
