"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import VetProtectedRoutes from "@/auth/VetProtectedRoutes";
import VetSideBar from "../../vetComponents/vetSidebar";
import VetLoader from "../../vetComponents/VetLoader";
import { useAuth } from "@/auth/AuthProvider";
import { getVetAppointmentDetails } from "@/apiServices/appointment.api";

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

    useEffect(() => {
        if (loading || !user?.id || !appointmentId) return;

        async function loadAppointment() {
            try {
                const data = await getVetAppointmentDetails(user.id, appointmentId);
                setAppointment(data);
            } catch (err) {
                setError(err.message);
            }
        }

        loadAppointment();
    }, [appointmentId, loading, user?.id]);

    return (
        <VetProtectedRoutes>
            <div className="min-h-screen bg-background text-on-surface font-body">
                <VetSideBar />

                <main className="ml-0 md:ml-64 min-h-screen pt-20 md:pt-8 px-4 md:px-10 pb-12">
                    <Link
                        href="/vet/appointments"
                        className="inline-flex items-center gap-2 text-primary font-semibold mb-8 hover:opacity-75"
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
                            <VetLoader />
                        )
                    ) : (
                        <>
                            <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-8">
                                <div>
                                    <p className="text-sm text-on-surface-variant mb-2">
                                        Appointment #{appointment.id.slice(0, 8).toUpperCase()}
                                    </p>
                                    <h1 className="font-headline text-3xl md:text-4xl font-extrabold">
                                        Appointment Details
                                    </h1>
                                </div>

                                <span className="w-fit px-4 py-2 rounded-full bg-tertiary-container text-on-tertiary-container text-sm font-bold uppercase">
                                    {appointment.status}
                                </span>
                            </header>

                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                                <aside className="xl:col-span-3 space-y-6">
                                    <section className="bg-surface-container-low rounded-xl p-6">
                                        <h2 className="font-headline font-bold text-lg mb-5 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary">pets</span>
                                            Patient
                                        </h2>

                                        <div className="text-center">
                                            {appointment.pet_avatar ? (
                                                <img
                                                    src={appointment.pet_avatar}
                                                    alt={appointment.pet_name}
                                                    className="w-28 h-28 object-cover rounded-xl mx-auto mb-4 border-4 border-surface-container-lowest"
                                                />
                                            ) : (
                                                <div className="w-28 h-28 rounded-xl mx-auto mb-4 bg-primary-container flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-5xl text-primary">pets</span>
                                                </div>
                                            )}

                                            <h3 className="font-headline text-xl font-bold">
                                                {appointment.pet_name}
                                            </h3>
                                            <p className="text-on-surface-variant text-sm mt-1">
                                                {[appointment.pet_breed, appointment.pet_species]
                                                    .filter(Boolean)
                                                    .join(" • ")}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2 mt-6 text-center bg-surface-container-lowest rounded-xl p-4">
                                            <div>
                                                <p className="text-xs text-on-surface-variant">Age</p>
                                                <p className="font-bold text-sm">
                                                    {calculateAge(appointment.pet_date_of_birth)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-on-surface-variant">Sex</p>
                                                <p className="font-bold text-sm">
                                                    {appointment.pet_gender || "—"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-on-surface-variant">Weight</p>
                                                <p className="font-bold text-sm">
                                                    {appointment.pet_weight ? `${appointment.pet_weight} kg` : "—"}
                                                </p>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-6">
                                        <h2 className="font-headline font-bold text-lg mb-5 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary">person</span>
                                            Owner Info
                                        </h2>

                                        <p className="font-bold">{appointment.owner_name}</p>
                                        <p className="text-sm text-on-surface-variant mt-4">
                                            {appointment.owner_phone || "No phone number"}
                                        </p>
                                        <p className="text-sm text-on-surface-variant mt-2 break-all">
                                            {appointment.owner_email || "No email address"}
                                        </p>
                                    </section>
                                </aside>

                                <section className="xl:col-span-6 bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-6 md:p-8">
                                    <p className="text-sm font-bold uppercase tracking-wider text-primary mb-3">
                                        Visit request
                                    </p>
                                    <h2 className="font-headline text-2xl font-bold mb-8">
                                        {appointment.reason}
                                    </h2>

                                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                        <div className="bg-surface-container-low rounded-xl p-5">
                                            <span className="material-symbols-outlined text-primary">event</span>
                                            <p className="text-sm text-on-surface-variant mt-3">Date</p>
                                            <p className="font-headline font-bold text-lg mt-1">
                                                {formatDate(appointment.appointment_date)}
                                            </p>
                                        </div>

                                        <div className="bg-surface-container-low rounded-xl p-5">
                                            <span className="material-symbols-outlined text-primary">schedule</span>
                                            <p className="text-sm text-on-surface-variant mt-3">Time</p>
                                            <p className="font-headline font-bold text-lg mt-1">
                                                {appointment.appointment_time}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-3">
                                            Owner&apos;s Notes
                                        </h3>
                                        <div className="bg-surface-container-low rounded-xl p-5 leading-7">
                                            {appointment.reason}
                                        </div>
                                    </div>
                                </section>

                                <aside className="xl:col-span-3">
                                    <section className="bg-surface-container-low rounded-xl p-6">
                                        <h2 className="font-headline text-xl font-bold mb-5">
                                            Management
                                        </h2>

                                        <Link
                                            href="/vet/patients"
                                            className="w-full bg-primary text-on-primary rounded-full py-3 px-5 font-bold flex justify-center gap-2"
                                        >
                                            <span className="material-symbols-outlined">folder_open</span>
                                            View Full Record
                                        </Link>
                                    </section>
                                </aside>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </VetProtectedRoutes>
    );
}
