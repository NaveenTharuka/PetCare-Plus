import api from "../auth/apiClient";

export async function getDownloadLinkById(id) {
    try {
        const res = await api.get(`pet/report/${id}/download`)
        return res.data
    } catch {
        alert("Error getting donwload link!")
        return null
    }
}

export async function uploadReport(petId, title, file) {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', file);

        const response = await api.post(`pet/${petId}/report/upload`, formData, {
            headers: {
                'Content-Type': undefined  // Let browser set it
            }
        });
        return response;
    } catch (error) {
        console.error("Upload error:", error);
        throw error;
    }
}