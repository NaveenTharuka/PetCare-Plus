"use client";

import Head from "next/head";
import styles from "./VetDashboard.module.css";
import { useEffect, useState } from "react";
import { getVetAppointments } from "@/apiServices/appointment.api";
import { useAuth } from "@/auth/AuthProvider";
import VetSideBar from "../vetComponents/vetSidebar";
import Appointment from "../vetComponents/todayAppointments";
import VetLoader from "../vetComponents/VetLoader";
import Loader from "@/components/Loader";

const quickActions = [
    { icon: "event", label: "View Appointments" },
    { icon: "person_search", label: "Search Patients" },
    { icon: "inventory", label: "Inventory Check" },
];

export default function Dashboard() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    const [todaySchedule, setTodaySchedule] = useState([])
    const [upcomingSchedule, setUpcomingSchedule] = useState([])
    const [completedSchedule, setCompletedSchedule] = useState([])

    const { user } = useAuth()

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    useEffect(() => {

        function filterAppointments(appointments) {
            const now = new Date();
            const formatted = now.toISOString().split('T')[0];

            if (!appointments) return;

            const filtered = appointments.filter((app) => app.appointment_date === formatted);
            setTodaySchedule(filtered);

            const later = appointments.filter((app) => app.appointment_date > formatted);
            setUpcomingSchedule(later);

            const completed = appointments.filter((app) => app.appointment_date < formatted);
            setCompletedSchedule(completed);
        }

        async function fetchAppointments(vet) {
            try {
                setError(undefined);
                const res = await getVetAppointments(vet.id)
                console.log(res.data)
                if (res) {
                    filterAppointments(res.data)
                }
            } catch (e) {
                setError(e.message)
                console.log(e)
            } finally {
                setLoading(false)
            }
        }

        // Check if user exists before fetching
        if (user?.id) {
            fetchAppointments(user)
        }
    }, [user])

    const nextAppointment = todaySchedule[0];

    return (
        <>
            <div className={styles.root}>
                <div className={styles.shell}>
                    {/* SIDE NAVBAR */}
                    <VetSideBar />

                    {/* MAIN CANVAS */}
                    <main className={styles.main}>
                        {/* CONTENT AREA */}
                        {loading ? (
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                                <VetLoader />
                            </div>
                        ) : (<div className={styles.content}>
                            {/* Welcome */}
                            <section className={styles.welcome}>
                                <div className={styles.welcomeText}>
                                    <h2 className={styles.welcomeHeading}>Good Morning, Dr. {user?.name}</h2>
                                    <p className={styles.welcomeSub}>
                                        {todaySchedule.length > 0
                                            ? `You have ${todaySchedule.length} appointment${todaySchedule.length === 1 ? "" : "s"} scheduled today${nextAppointment?.petName ? `, starting with ${nextAppointment.petName}` : ""}${nextAppointment?.time ? ` at ${nextAppointment.time}` : ""}.`
                                            : "You have no appointments scheduled today."}
                                    </p>
                                </div>
                                <div className={styles.welcomeMeta}>
                                    <span className={styles.statusPill}>
                                        <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>
                                            wb_sunny
                                        </span>
                                        Clinic Status: Optimistic
                                    </span>
                                    <div className={styles.dateText}>{formattedDate}</div>
                                </div>
                            </section>

                            {error && (
                                <div className={styles.errorBanner} role="alert">
                                    Couldn&apos;t load appointments: {error}
                                </div>
                            )}

                            {/* Stats bento grid */}
                            <section className={styles.statsGrid}>
                                <div className={styles.statCard}>
                                    <div className={styles.statCardTop}>
                                        <div className={styles.statIcon}>
                                            <span className="material-symbols-outlined">event_note</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className={styles.statLabel}>Today&apos;s Appts</p>
                                        <h3 className={styles.statValue}>{todaySchedule.length}</h3>
                                    </div>
                                </div>

                                <div className={styles.statCardMuted}>
                                    <div className={styles.statCardTop}>
                                        <div className={styles.statIconSecondary}>
                                            <span className="material-symbols-outlined">upcoming</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className={styles.statLabel}>Upcoming</p>
                                        <h3 className={styles.statValue}>{upcomingSchedule.length}</h3>
                                    </div>
                                </div>

                                <div className={styles.statCard}>
                                    <div className={styles.statCardTop}>
                                        <div className={styles.statIconTertiary}>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                pets
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className={styles.statLabel}>Total Patients</p>
                                        <h3 className={styles.statValue}>
                                            {todaySchedule.length + upcomingSchedule.length + completedSchedule.length}
                                        </h3>
                                    </div>
                                </div>

                                <div className={styles.statCardPrimary}>
                                    <div className={styles.statCardTop}>
                                        <div className={styles.statIconOnPrimary}>
                                            <span className="material-symbols-outlined">check_circle</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className={styles.statLabelOnPrimary}>Completed Visits</p>
                                        <h3 className={styles.statValueOnPrimary}>{completedSchedule.length}</h3>
                                    </div>
                                </div>
                            </section>

                            {/* Layout: schedule + sidebar */}
                            <div className={styles.layout}>
                                {/* Schedule */}
                                <div className={styles.scheduleCol}>
                                    <div className={styles.scheduleHeader}>
                                        <h3 className={styles.sectionTitle}>Today&apos;s Schedule</h3>
                                        <button className={styles.linkButton} type="button">
                                            View Full Calendar
                                        </button>
                                    </div>

                                    <div className={styles.tableCard}>
                                        <div className={styles.tableScroll}>
                                            <table className={styles.table}>
                                                <thead>
                                                    <tr className={styles.tableHeadRow}>
                                                        <th>Time</th>
                                                        <th>Pet Name</th>
                                                        <th>Owner</th>
                                                        <th>Status</th>
                                                        <th className={styles.thRight}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className={styles.tableBody}>
                                                    {todaySchedule.length > 0 ? (
                                                        todaySchedule.map((appt) => (
                                                            <Appointment key={appt.id} appt={appt} />
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={5} className={styles.emptyRow}>
                                                                No appointments scheduled for today.
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className={styles.loadMoreWrap}>
                                            <button className={styles.loadMoreButton} type="button">
                                                Load more appointments
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Side column */}
                                <aside className={styles.asideCol}>
                                    <div className={styles.quickActions}>
                                        <h3 className={styles.quickActionsTitle}>Quick Actions</h3>
                                        <div className={styles.quickActionsGrid}>
                                            {quickActions.map((action) => (
                                                <button className={styles.quickAction} type="button" key={action.label}>
                                                    <div className={styles.quickActionLeft}>
                                                        <div className={styles.quickActionIcon}>
                                                            <span className="material-symbols-outlined">{action.icon}</span>
                                                        </div>
                                                        <span className={styles.quickActionLabel}>{action.label}</span>
                                                    </div>
                                                    <span className={`material-symbols-outlined ${styles.quickActionChevron}`}>
                                                        chevron_right
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.banner}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            className={styles.bannerImg}
                                            alt="Modern veterinary clinic sanctuary"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuzjvykVj_AgqBxYh_NJLtHU8WJaoaQxzlh479GIw8PKIv7Fk1XrR8RvFMfDb2WRZApUIByL3CFgs4rT_jbYWVZBiKBhIKsPGZkESyjk2uPSZsf1at2ye7xlOCTsNXe1GGr3uf8ILyC6aC2x_6CV6gcdLc3dQsEt5FSh2cj4dnlu57wDyFdnOMVMlUA8poLjfIVDws-s09TnGlQ5xspmjfI4cTQobTravOxNuWvdeBeG8_0bpVOHAe"
                                        />
                                        <div className={styles.bannerOverlay}>
                                            <h4 className={styles.bannerTitle}>Patient Sanctuary Guidelines</h4>
                                            <p className={styles.bannerText}>
                                                Maintain our tactile excellence through personalized care for every pet.
                                            </p>
                                            <button className={styles.bannerButton} type="button">
                                                Read Protocol
                                            </button>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>)}


                    </main>
                </div>

                {/* Large Desktop FAB */}
                <button className={styles.desktopFab} type="button" aria-label="Add new patient">
                    <span className="material-symbols-outlined" style={{ fontSize: "1.875rem" }}>
                        person_add
                    </span>
                </button>
            </div>
        </>
    );
}