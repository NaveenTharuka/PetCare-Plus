import api from "../auth/apiClient";

export async function getVetVisitsByPetId(petId) {
    try {
        const response = await api.get(`/visits/pet/${petId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching vet visits:", error);
        return [];
    }
}

export async function addVetVisit(data) {

    try {
        const response = api.post('/visits/create', data)
        return response
    } catch (error) {
        console.error("Error adding vet visit:", error);
        throw error;
    }
}