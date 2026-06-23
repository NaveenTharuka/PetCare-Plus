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

export async function updateVetVisit(pet_id, formdata) {
    try {
        const res = api.put(`/visit/update/${pet_id}`, formdata)
        return res
    } catch (err) {
        console.log("Error updating visit")
        return err
    }
}

export async function deleteVisit(visitId) {
    try {
        const res = await api.delete(`/visit/${visitId}/delete`)
        return res.data
    } catch (err) {
        alert(`Error deleting vet visit : ${err}`)
    }
}