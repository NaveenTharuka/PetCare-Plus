"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import VetProtectedRoutes from "@/auth/VetProtectedRoutes";
import VetSideBar from "../../vetComponents/vetSidebar";
import VetLoader from "../../vetComponents/VetLoader";
import { useAuth } from "@/auth/AuthProvider";
import { getVetAppointmentDetails, updateVetAppointment } from "@/apiServices/appointment.api";

function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(`${date}T00:00:00`));
}

function calculateAge(dateOfBirth) {
    if (!dateOfBirth) return "—";

    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();

    if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
            today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return `${age} yrs`;
}

export default function VetAppointmentDetailPage() {
    const { appointmentId } = useParams();
    const { user, loading } = useAuth();
    const [appointment, setAppointment] = useState(null);
    const [error, setError] = useState("");
    const [notes, setNotes] = useState("");
    const [schedule, setSchedule] = useState({ appointment_date: "", appointment_time: "" });
    const [isRescheduling, setIsRescheduling] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [actionMessage, setActionMessage] = useState("");
    const [actionError, setActionError] = useState("");

    useEffect(() => {
        if (loading || !user?.id || !appointmentId) return;

        async function loadAppointment() {
            try {
                const data = await getVetAppointmentDetails(user.id, appointmentId);
                setAppointment(data);
                setNotes(data.notes || "");
                setSchedule({
                    appointment_date: data.appointment_date,
                    appointment_time: data.appointment_time,
                });
            } catch (err) {
                setError(err.message);
            }
        }

        loadAppointment();
    }, [appointmentId, loading, user?.id]);

    const applyUpdate = async (updates, message) => {
        setActionError("");
        setActionMessage("");
        setIsSaving(true);

        try {
            const updatedAppointment = await updateVetAppointment(user.id, appointmentId, updates);
            setAppointment(updatedAppointment);
            setNotes(updatedAppointment.notes || "");
            setSchedule({
                appointment_date: updatedAppointment.appointment_date,
                appointment_time: updatedAppointment.appointment_time,
            });
            setActionMessage(message);
            setIsRescheduling(false);
        } catch (err) {
            setActionError(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveNotes = () => applyUpdate({ notes }, "Internal notes saved.");
    const handleReschedule = (event) => {
        event.preventDefault();
        applyUpdate(schedule, "Appointment rescheduled and the owner notified.");
    };

    return (
        <VetProtectedRoutes>
            <div className="min-h-screen bg-background text-on-surface font-body">
                <VetSideBar />

                <main className="ml-0 md:ml-64 min-h-screen pt-20 md:pt-8 px-4 md:px-8 pb-12">
                    <Link
                        href="/vet/appointments"
                        className="inline-flex items-center gap-2 text-sm text-on-surface-variant font-semibold mb-8 hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Back to appointments
                    </Link>

                    {loading || !appointment ? (
                        error ? (
                            <div className="bg-error-container/20 text-on-error-container rounded-xl p-6">
                                {error}
                            </div>
                        ) : (
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                                <VetLoader />
                            </div>
                        )
                    ) : (
                        <>
                            <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                                <div>
                                    <p className="text-sm text-on-surface-variant font-medium mb-1">
                                        Appointment #{appointment.id.slice(0, 8).toUpperCase()}
                                    </p>
                                    <h1 className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-on-surface leading-tight">
                                        Appointment Details
                                    </h1>
                                </div>

                                <span className="inline-flex items-center gap-1.5 w-fit px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container text-xs font-semibold tracking-wide">
                                    <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container" />
                                    {appointment.status}
                                </span>
                            </header>

                            <div className="max-w-7xl grid grid-cols-1 xl:grid-cols-12 gap-6">
                                <aside className="xl:col-span-3 space-y-6">
                                    <section className="bg-surface-container-low rounded-xl p-6 shadow-sm relative overflow-hidden">
                                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-container rounded-full opacity-20 blur-3xl" />
                                        <h2 className="relative font-headline font-semibold text-base text-on-surface mb-5 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary text-xl">pets</span>
                                            Patient
                                        </h2>

                                        <div className="relative text-center">
                                            {appointment.pet_avatar ? (
                                                <div className="w-28 h-28 rounded-full bg-surface-container-lowest p-2 shadow-sm mx-auto mb-3">
                                                    <img src={appointment.pet_avatar} alt={appointment.pet_name} className="w-full h-full object-cover rounded-full" />
                                                </div>
                                            ) : (
                                                <div className="w-28 h-28 rounded-full mx-auto mb-3 bg-surface-container-lowest flex items-center justify-center shadow-sm">
                                                    <span className="material-symbols-outlined text-4xl text-primary">pets</span>
                                                </div>
                                            )}

                                            <h3 className="font-headline text-xl font-bold text-on-surface">
                                                {appointment.pet_name}
                                            </h3>
                                            <p className="text-on-surface-variant text-sm mt-1">
                                                {[appointment.pet_breed, appointment.pet_species]
                                                    .filter(Boolean)
                                                    .join(" • ")}
                                            </p>
                                        </div>

                                        <div className="relative flex justify-between items-center w-full mt-5">
                                            <div>
                                                <p className="text-xs text-on-surface-variant mb-1 uppercase tracking-wider font-semibold">Age</p>
                                                <p className="font-semibold text-on-surface text-sm">
                                                    {calculateAge(appointment.pet_date_of_birth)}
                                                </p>
                                            </div>
                                            <div className="w-px h-8 bg-surface-container-highest" />
                                            <div>
                                                <p className="text-xs text-on-surface-variant mb-1 uppercase tracking-wider font-semibold">Sex</p>
                                                <p className="font-semibold text-on-surface text-sm">
                                                    {appointment.pet_gender || "—"}
                                                </p>
                                            </div>
                                            <div className="w-px h-8 bg-surface-container-highest" />
                                            <div>
                                                <p className="text-xs text-on-surface-variant mb-1 uppercase tracking-wider font-semibold">Weight</p>
                                                <p className="font-semibold text-on-surface text-sm">
                                                    {appointment.pet_weight ? `${appointment.pet_weight} kg` : "—"}
                                                </p>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-6 shadow-sm">
                                        <h2 className="font-headline font-semibold text-base text-on-surface mb-5 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary text-xl">person</span>
                                            Owner Info
                                        </h2>

                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-headline font-bold text-lg">
                                                {appointment.owner_name?.slice(0, 2).toUpperCase()}
                                            </div>
                                            <div><p className="font-bold text-on-surface">{appointment.owner_name}</p><p className="text-xs text-on-surface-variant">Primary Contact</p></div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3"><span className="material-symbols-outlined text-on-surface-variant text-xl">call</span><div><p className="text-sm font-semibold text-on-surface">{appointment.owner_phone || "No phone number"}</p><p className="text-xs text-on-surface-variant mt-0.5">Mobile</p></div></div>
                                            <div className="flex items-start gap-3"><span className="material-symbols-outlined text-on-surface-variant text-xl">mail</span><div><p className="text-sm font-semibold text-on-surface break-all">{appointment.owner_email || "No email address"}</p><p className="text-xs text-on-surface-variant mt-0.5">Email</p></div></div>
                                        </div>
                                    </section>
                                </aside>

                                <section className="xl:col-span-6 bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-6 md:p-7 shadow-sm">
                                    <div className="mb-6"><h2 className="font-headline text-2xl font-bold text-on-surface mb-2">
                                        {appointment.reason}
                                    </h2><p className="text-on-surface-variant text-sm flex items-center gap-2"><span className="material-symbols-outlined text-base">schedule</span> Appointment requested by pet owner</p></div>

                                    <div className="grid sm:grid-cols-2 gap-4 mb-7">
                                        <div className="bg-surface-container-low rounded-xl p-5 flex items-center gap-4"><div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center shadow-sm"><span className="material-symbols-outlined text-primary">event</span></div><div><p className="text-xs text-on-surface-variant mb-1 font-semibold">Date</p><p className="font-headline font-bold text-on-surface text-base">
                                            {formatDate(appointment.appointment_date)}
                                        </p></div></div>

                                        <div className="bg-surface-container-low rounded-xl p-5 flex items-center gap-4"><div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center shadow-sm"><span className="material-symbols-outlined text-primary">schedule</span></div><div><p className="text-xs text-on-surface-variant mb-1 font-semibold">Time</p><p className="font-headline font-bold text-on-surface text-base">
                                            {appointment.appointment_time}
                                        </p></div></div>
                                    </div>

                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface mb-3">
                                            Owner&apos;s Notes
                                        </h3>
                                        <div className="bg-surface-container-low rounded-xl p-5 text-on-surface-variant text-sm leading-relaxed italic">
                                            {appointment.reason}
                                        </div>
                                    </div>
                                </section>

                                <aside className="xl:col-span-3">
                                    <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-6 shadow-sm space-y-3">
                                        <h2 className="font-headline text-lg font-bold text-on-surface mb-5">
                                            Management
                                        </h2>

                                        {appointment.status === "Pending" && (
                                            <>
                                                <button
                                                    type="button"
                                                    disabled={isSaving}
                                                    onClick={() => applyUpdate({ status: "Confirmed" }, "Appointment approved and the owner notified.")}
                                                    className="w-full bg-primary text-on-primary rounded-xl py-3 px-4 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary-dim transition-colors disabled:opacity-60"
                                                >
                                                    <span className="material-symbols-outlined text-lg">check_circle</span>
                                                    Approve Appointment
                                                </button>
                                                <button
                                                    type="button"
                                                    disabled={isSaving}
                                                    onClick={() => applyUpdate({ status: "Rejected" }, "Appointment declined and the owner notified.")}
                                                    className="w-full border border-error text-error rounded-xl py-3 px-4 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-error-container/10 transition-colors disabled:opacity-60"
                                                >
                                                    <span className="material-symbols-outlined text-lg">cancel</span>
                                                    Decline Appointment
                                                </button>
                                            </>
                                        )}

                                        {appointment.status === "Confirmed" && (
                                            <button
                                                type="button"
                                                disabled={isSaving}
                                                onClick={() => applyUpdate({ status: "Completed" }, "Appointment marked as completed.")}
                                                className="w-full bg-primary text-on-primary rounded-xl py-3 px-4 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary-dim transition-colors disabled:opacity-60"
                                            >
                                                <span className="material-symbols-outlined text-lg">task_alt</span>
                                                Mark Completed
                                            </button>
                                        )}

                                        {!['Completed', 'Cancelled', 'Rejected'].includes(appointment.status) && (
                                            <button
                                                type="button"
                                                disabled={isSaving}
                                                onClick={() => setIsRescheduling((open) => !open)}
                                                className="w-full bg-secondary-container text-on-secondary-container rounded-xl py-3 px-4 text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
                                            >
                                                <span className="material-symbols-outlined text-lg">edit_calendar</span>
                                                Reschedule
                                            </button>
                                        )}

                                        {isRescheduling && (
                                            <form onSubmit={handleReschedule} className="pt-3 mt-3 border-t border-outline-variant/20 space-y-3">
                                                <label className="grid gap-1 text-xs font-semibold text-on-surface-variant">New date<input required type="date" value={schedule.appointment_date} onChange={(event) => setSchedule((current) => ({ ...current, appointment_date: event.target.value }))} className="bg-surface-container-low rounded-lg px-3 py-2 text-sm text-on-surface" /></label>
                                                <label className="grid gap-1 text-xs font-semibold text-on-surface-variant">New time<input required type="time" value={schedule.appointment_time} onChange={(event) => setSchedule((current) => ({ ...current, appointment_time: event.target.value }))} className="bg-surface-container-low rounded-lg px-3 py-2 text-sm text-on-surface" /></label>
                                                <button disabled={isSaving} type="submit" className="w-full bg-primary text-on-primary rounded-lg py-2.5 text-sm font-semibold disabled:opacity-60">{isSaving ? "Saving…" : "Save schedule"}</button>
                                            </form>
                                        )}

                                        <Link
                                            href="/vet/patients"
                                            className="w-full bg-surface-container-lowest border border-outline-variant/20 text-on-surface-variant rounded-xl py-3 px-4 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-lg">folder_open</span>
                                            View Patient Directory
                                        </Link>
                                    </section>

                                    <section className="bg-surface-container-low rounded-xl p-6 shadow-sm mt-6">
                                        <h2 className="font-headline text-base font-bold text-on-surface mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-on-surface-variant text-lg">edit_note</span>Internal Notes</h2>
                                        <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows="5" placeholder="Add private clinical notes…" className="w-full bg-surface-container-highest/50 rounded-lg p-3 text-sm text-on-surface placeholder:text-on-surface-variant/60 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20" />
                                        <button type="button" disabled={isSaving} onClick={handleSaveNotes} className="mt-3 text-sm font-semibold text-primary hover:text-primary-dim disabled:opacity-60">{isSaving ? "Saving…" : "Save notes"}</button>
                                    </section>

                                    {(actionMessage || actionError) && (
                                        <p className={`mt-4 rounded-lg p-3 text-sm ${actionError ? "bg-error-container/20 text-on-error-container" : "bg-tertiary-container text-on-tertiary-container"}`} role="status">
                                            {actionError || actionMessage}
                                        </p>
                                    )}
                                </aside>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </VetProtectedRoutes>
    );
}
