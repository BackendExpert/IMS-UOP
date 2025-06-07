import { jwtDecode } from 'jwt-decode';

export function getUserInfoFromToken() {
    const token = localStorage.getItem('login');
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);

        const username = decoded.username || decoded.user?.username || null;
        const email = decoded.email || decoded.user?.email || null;
        const roles = decoded.role || decoded.roles || decoded.user?.roles || [];

        if (!username || !email || roles.length === 0) {
            return null;
        }

        // ✅ Encode email using Base64 and store it
        const encodedEmail = btoa(email); // `btoa()` encodes to Base64
        localStorage.setItem('loginE', encodedEmail);

        return { username, email, roles };
    } catch (error) {
        console.error('Invalid token', error);
        return null;
    }
}
