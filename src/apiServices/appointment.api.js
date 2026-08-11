import api from "../auth/apiClient";

export async function getVetAppointments(vet_id) {
    try {
        const response = await api.get(`/vet/${vet_id}/appointments`);
        return response;
    } catch (error) {
        return error;
    }
}

export async function getUserAppointments(owner_id) {
    try {
        const response = await api.get(`/owner/${owner_id}/appointments`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}