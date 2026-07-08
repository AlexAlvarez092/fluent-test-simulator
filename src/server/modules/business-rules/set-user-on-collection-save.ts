import { gs } from '@servicenow/glide';

export function setUserOnCollectionSave(current: any, previous: any) {
    const user = current.getValue('user');

    // If user field is empty, fill it with the current authenticated user
    if (!user) {
        const currentUserId = gs.getUserID();
        current.setValue('user', currentUserId);
    }
}
