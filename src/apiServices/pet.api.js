import api from "../auth/apiClient";


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
