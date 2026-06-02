import api from "../auth/apiClient";

export default async function getUserById(id) {
    try {
        const response = await api.get(`/user/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user by id:", error);
        return null;
    }
}

export async function getUserBySupabaseToken(token) {
    try {
        const response = await api.get(`/google_user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error) {
        console.error("Error fetching user by supabase token:", error);
        return null;
    }
}