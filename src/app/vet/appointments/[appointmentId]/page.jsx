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

                <main className="ml-0 md:ml-64 min-h-screen pt-20 md:pt-8 px-4 md:px-12 pb-20">
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
                            <VetLoader />
                        )
                    ) : (
                        <>
                            <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-10">
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

                            <div className="max-w-7xl grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-10">
                                <aside className="xl:col-span-3 space-y-8">
                                    <section className="bg-surface-container-low rounded-[32px] p-8 shadow-[0_20px_40px_rgba(49,51,49,0.06)] relative overflow-hidden">
                                        <div className="absolute -right-8 -top-8 w-40 h-40 bg-primary-container rounded-full opacity-20 blur-3xl" />
                                        <h2 className="relative font-headline font-semibold text-lg text-on-surface mb-6 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary text-xl">pets</span>
                                            Patient
                                        </h2>

                                        <div className="relative text-center">
                                            {appointment.pet_avatar ? (
                                                <div className="w-36 h-36 rounded-full bg-surface-container-lowest p-2 shadow-sm mx-auto mb-4">
                                                    <img src={appointment.pet_avatar} alt={appointment.pet_name} className="w-full h-full object-cover rounded-full" />
                                                </div>
                                            ) : (
                                                <div className="w-36 h-36 rounded-full mx-auto mb-4 bg-surface-container-lowest flex items-center justify-center shadow-sm">
                                                    <span className="material-symbols-outlined text-5xl text-primary">pets</span>
                                                </div>
                                            )}

                                            <h3 className="font-headline text-2xl font-bold text-on-surface">
                                                {appointment.pet_name}
                                            </h3>
                                            <p className="text-on-surface-variant text-sm mt-1">
                                                {[appointment.pet_breed, appointment.pet_species]
                                                    .filter(Boolean)
                                                    .join(" • ")}
                                            </p>
                                        </div>

                                        <div className="relative flex justify-between items-center w-full mt-6">
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

                                    <section className="bg-surface-container-lowest rounded-[32px] border border-outline-variant/10 p-8 shadow-[0_20px_40px_rgba(49,51,49,0.06)]">
                                        <h2 className="font-headline font-semibold text-lg text-on-surface mb-6 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary text-xl">person</span>
                                            Owner Info
                                        </h2>

                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-14 h-14 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-headline font-bold text-xl">
                                                {appointment.owner_name?.slice(0, 2).toUpperCase()}
                                            </div>
                                            <div><p className="font-bold text-on-surface text-lg">{appointment.owner_name}</p><p className="text-sm text-on-surface-variant">Primary Contact</p></div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3"><span className="material-symbols-outlined text-on-surface-variant text-xl">call</span><div><p className="text-sm font-semibold text-on-surface">{appointment.owner_phone || "No phone number"}</p><p className="text-xs text-on-surface-variant mt-0.5">Mobile</p></div></div>
                                            <div className="flex items-start gap-3"><span className="material-symbols-outlined text-on-surface-variant text-xl">mail</span><div><p className="text-sm font-semibold text-on-surface break-all">{appointment.owner_email || "No email address"}</p><p className="text-xs text-on-surface-variant mt-0.5">Email</p></div></div>
                                        </div>
                                    </section>
                                </aside>

                                <section className="xl:col-span-6 bg-surface-container-lowest rounded-[32px] border border-outline-variant/10 p-8 shadow-[0_20px_40px_rgba(49,51,49,0.06)]">
                                    <div className="mb-8"><h2 className="font-headline text-3xl font-bold text-on-surface mb-3">
                                        {appointment.reason}
                                    </h2><p className="text-on-surface-variant text-sm flex items-center gap-2"><span className="material-symbols-outlined text-base">schedule</span> Appointment requested by pet owner</p></div>

                                    <div className="grid sm:grid-cols-2 gap-4 mb-10">
                                        <div className="bg-surface-container-low rounded-3xl p-6 flex items-center gap-5"><div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center shadow-sm"><span className="material-symbols-outlined text-primary">event</span></div><div><p className="text-sm text-on-surface-variant mb-1 font-semibold">Date</p><p className="font-headline font-bold text-on-surface text-lg">
                                                {formatDate(appointment.appointment_date)}
                                            </p></div></div>

                                        <div className="bg-surface-container-low rounded-3xl p-6 flex items-center gap-5"><div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center shadow-sm"><span className="material-symbols-outlined text-primary">schedule</span></div><div><p className="text-sm text-on-surface-variant mb-1 font-semibold">Time</p><p className="font-headline font-bold text-on-surface text-lg">
                                                {appointment.appointment_time}
                                            </p></div></div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface mb-4">
                                            Owner&apos;s Notes
                                        </h3>
                                        <div className="bg-surface-container-low rounded-3xl p-6 text-on-surface-variant text-sm leading-relaxed italic">
                                            {appointment.reason}
                                        </div>
                                    </div>
                                </section>

                                <aside className="xl:col-span-3">
                                    <section className="bg-surface-container-lowest rounded-[32px] border border-outline-variant/10 p-8 shadow-[0_20px_40px_rgba(49,51,49,0.06)]">
                                        <h2 className="font-headline text-xl font-bold text-on-surface mb-6">
                                            Management
                                        </h2>

                                        <Link
                                            href="/vet/patients"
                                            className="w-full bg-surface-container-lowest border border-outline-variant/20 text-on-surface-variant rounded-full py-4 px-6 font-semibold flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors shadow-sm"
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
