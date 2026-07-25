import api from "@/auth/apiClient";

export const getNotificationsByUserId = async (userId) => {
    try {
        const res = await api.get(`/notifications/${userId}`)
        return res.data
    } catch (error) {
        return null
    }
}

export const markAsReadById = async (notifi_id) => {
    try {
        const res = await api.post(`/mark-as-read/${notifi_id}`)
        return res.data
    } catch (error) {
        return null
    }
}

export const markAsReadAll = async (user_id) => {
    try {
        const res = await api.post(`/mark-as-read/${user_id}/all`)
        return res.data
    } catch (error) {
        return null
    }
}

export const deleteNotification = async (notificationId) => {
    try {
        const res = await api.delete(`/notifications/delete/${notificationId}`)
        return res.data
    } catch (error) {
        return null
    }
}