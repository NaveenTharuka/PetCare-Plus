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