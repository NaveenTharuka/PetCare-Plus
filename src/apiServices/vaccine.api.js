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