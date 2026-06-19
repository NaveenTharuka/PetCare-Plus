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
        console.error("Error fetching user by supabase token:");
        return null;
    }
}

export async function updateUser(id, userData) {
    try {
        const response = await api.patch(`/user/${id}/update`, userData);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        return null;
    }
}

export async function uploadProfilePicture(id, image) {

    try {
        const formdata = new FormData()
        formdata.append('file', image)
        const response = await api.post(`/user/${id}/profile/upload`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading profile picture:", error);
        return null;
    }
}