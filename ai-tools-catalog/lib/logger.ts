import { auth } from './firebase';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const logUserActivity = async (action: string, toolSlug?: string, metadata?: Record<string, unknown>) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
        await fetch(`${API_URL}/users/activity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firebaseUid: user.uid,
                action,
                toolSlug,
                metadata
            })
        });
    } catch (error) {
        console.error('Failed to log activity:', error);
        // Fail silently to not disrupt user experience
    }
};
