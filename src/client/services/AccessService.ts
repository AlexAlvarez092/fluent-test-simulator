declare global {
    interface Window {
        g_ck: string;
    }
}

export type CurrentUserRoles = {
    is_admin: boolean;
    is_user: boolean;
    access: 'admin' | 'user' | 'none';
};

export class AccessService {
    private readonly currentUserRolesPath: string;

    constructor() {
        this.currentUserRolesPath = '/api/x_2119443_test_sim/test_simulator_api/me/roles';
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
                throw new Error(errorData.error?.message || errorData.error || `HTTP error ${response.status}`);
            }

            const payload = await response.json();
            const rawRoles = payload?.result;

            return {
                is_admin: Boolean(rawRoles?.is_admin),
                is_user: Boolean(rawRoles?.is_user),
                access: rawRoles?.access === 'admin' || rawRoles?.access === 'user' ? rawRoles.access : 'none',
            };
        } catch (error) {
            console.error('Error fetching current user roles:', error);
            throw error;
        }
    }
}
