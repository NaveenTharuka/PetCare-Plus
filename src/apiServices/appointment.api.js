import api from "../auth/apiClient";

export async function createAppointment(appointment) {
    try {
        const response = await api.post("/appointment", appointment);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.detail || "Unable to create the appointment.";
        throw new Error(typeof message === "string" ? message : "Unable to create the appointment.");
    }
}

export async function getVetAppointments(vet_id) {
    try {
        const response = await api.get(`/vet/${vet_id}/appointments`);
        return response.data;
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

export async function updateStatus(appointment_id, status) {
    try {
        const response = await api.put(`/appointment/${appointment_id}/status`, { status });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getVetAppointmentDetails(vetId, appointmentId) {
    try {
        const response = await api.get(
            `/vet/${vetId}/appointments/${appointmentId}`
        );
        return response.data;
    } catch (error) {
        const message = error.response?.data?.detail || "Unable to load appointment details.";
        throw new Error(message);
    }
}

export async function updateVetAppointment(vetId, appointmentId, updates) {
    try {
        const response = await api.patch(
            `/vet/${vetId}/appointments/${appointmentId}`,
            updates
        );
        return response.data;
    } catch (error) {
        const message = error.response?.data?.detail || "Unable to update the appointment.";
        throw new Error(message);
    }
}

export async function getVetAvailability(vetId, appointmentDate) {
    try {
        const response = await api.get(`/vet/${vetId}/availability`, {
            params: { appointment_date: appointmentDate },
        });
        return response.data.booked_times || [];
    } catch (error) {
        const message = error.response?.data?.detail || "Unable to load appointment availability.";
        throw new Error(message);
    }
}
