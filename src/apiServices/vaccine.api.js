import api from "@/auth/apiClient";

export async function addVaccine(vaccineData) {
    try {
        const response = await api.post(`pet/${vaccineData.pet_id}/vaccine/add`, vaccineData);
        return response;
    } catch (error) {
        console.error("Error adding vaccine:", error);
        return null;
    }
}

export async function deleteVaccine(vaccineId) {
    try {
        const response = await api.delete(`/vaccine/delete/${vaccineId}`);
        return response;
    } catch (error) {
        console.error("Error deleting vaccine:", error);
        throw error;
    }
}

export async function editVaccine(id, formData) {
    try {
        const res = await api.put(`/vaccine/update/${id}`, formData)
        return res;
    } catch (error) {
        console.error("Error editing vaccine:", error);
        throw error;
    }
}