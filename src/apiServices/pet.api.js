import PetProfileEdit from "@/app/user/me/pets/[petId]/edit/page";
import api from "../auth/apiClient";


export async function getPetById(petId) {
    try {
        const res = await api.get(`/pet/${petId}`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export async function getPetsByUserId(id) {
    try {
        const res = await api.get(`/pets/user/${id}`);
        return res.data;
    } catch {
        window.alert("Error")
    }
}

export async function addPet(Pet, userId) {
    try {
        const res = await api.post(`/pets/user/${userId}`, Pet);
        alert("Pet added successfully!");
        return res.data;
    } catch (error) {
        console.error("Error in addPet:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function addPetPicture(petId, picture) {
    try {
        const formData = new FormData();
        formData.append('file', picture);

        const res = await api.post(`/pet/${petId}/picture/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        alert("Pet picture added successfully!");
        return res.data;
    } catch (error) {
        console.error("Error in addPetPicture:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function deletePet(pet) {
    try {
        const res = await api.delete(`/pets/delete/${pet.id}`);
        alert("Pet deleted successfully!");
        return res.data;
    } catch (error) {
        console.error("Error in deletePet:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function editPet(pet, petId) {
    try {
        const res = await api.put(`/pets/edit/${petId}`, pet)
        console.log(res)
        return res.data;
    } catch (error) {
        console.error("Error in editPet:", error.response ? error.response.data : error.message);
        throw error;
    }
}