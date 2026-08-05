declare global {
    interface Window {
        g_ck: string;
    }
}

export type CurrentUserRoles = {
    is_user: boolean;
    access: 'user' | 'none';
};

export class AccessService {
    private readonly currentUserRolesPath: string;

    constructor() {
        this.currentUserRolesPath = '/api/x_2119443_quiz_sim/quiz_simulator_api/me/roles';
    }

    async getCurrentUserRoles(): Promise<CurrentUserRoles> {
        try {
            const response = await fetch(this.currentUserRolesPath, {
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
            const rawRoles = payload?.result;

            if (!rawRoles || typeof rawRoles !== 'object') {
                throw new Error('Invalid response contract: expected result object');
            }

            return {
                is_user: rawRoles?.is_user === 'true',
                access: rawRoles?.access === 'user' ? rawRoles.access : 'none',
            };
        } catch (error) {
            console.error('Error fetching current user roles:', error);
            throw error;
        }
    }
}
