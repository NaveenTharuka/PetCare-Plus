"use client";

import Head from "next/head";
import styles from "./VetDashboard.module.css";
import { useEffect, useState } from "react";
import { getVetAppointments } from "@/apiServices/appointment.api";
import { useAuth } from "@/auth/AuthProvider";
import VetSideBar from "../vetComponents/vetSidebar";
import Appointment from "../vetComponents/todayAppointments";

const quickActions = [
    { icon: "event", label: "View Appointments" },
    { icon: "person_search", label: "Search Patients" },
    { icon: "inventory", label: "Inventory Check" },
];

export default function Dashboard() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [todaySchedule, setTodaySchedule] = useState([])
    const { user } = useAuth()

    useEffect(() => {
        async function fetchAppointments(vet) {
            try {
                setLoading(true)
                const res = await getVetAppointments(vet.id)
                // FIX: Set the fetched appointments to state
                setTodaySchedule(res.data || [])
            } catch (e) {
                setError(e.message)
                console.log(e)
            } finally {
                setLoading(false)
            }
        }

        // FIX: Check if user exists before fetching
        if (user?.id) {
            fetchAppointments(user)
        }
    }, [user])

    return (
        <>
            {/* NOTE: in a real Next.js app these font/icon links belong in app/layout.jsx
          (App Router) or pages/_document.jsx (Pages Router), not in a page component.
          They're included here via next/head so this file renders correctly on its own. */}
            <Head>
                <title>PetCare Plus | Veterinarian Dashboard</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className={styles.root}>
                <div className={styles.shell}>
                    {/* SIDE NAVBAR */}
                    <VetSideBar />

                    {/* MAIN CANVAS */}
                    <main className={styles.main}>
                        {/* TOP NAVBAR */}
                        <header className={styles.topbar}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1 }}>
                                <div className={styles.searchWrap}>
                                    <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
                                    <input
                                        className={styles.searchInput}
                                        placeholder="Search patients, owners, or records..."
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                                <nav className={styles.topNav}>
                                    <a className={styles.topNavLinkActive} href="#">
                                        Overview
                                    </a>
                                    <a className={styles.topNavLink} href="#">
                                        Clinic Map
                                    </a>
                                    <a className={styles.topNavLink} href="#">
                                        Reports
                                    </a>
                                </nav>

                                <div className={styles.trailingActions}>
                                    <button className={styles.iconButton} type="button" aria-label="Notifications">
                                        <span className="material-symbols-outlined">notifications</span>
                                    </button>
                                    <button className={styles.iconButton} type="button" aria-label="Settings">
                                        <span className="material-symbols-outlined">settings</span>
                                    </button>
                                    <div className={styles.divider} />
                                    <div className={styles.profile}>
                                        <div className={styles.profileText}>
                                            <p className={styles.profileName}>Dr. Vance</p>
                                            <p className={styles.profileRole}>Senior Vet</p>
                                        </div>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            className={styles.avatar}
                                            alt="A professional headshot of a friendly veterinarian"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu0E_zTHjgoZUNPztk4NPQ9w5E7J0_kq8uIPEwReHdN_5KNZhhpVE4C3yflIMzwOArNHUR97om7yFXPX7qzMLaM6r2TTZmzzwHyr7vh--sB6dFiC9Gu5za0C1uxRQeSQioYbNErxLKA1E-NdjHo4NHs_7mlNvW4fQTB-ti_6iaYSZcanP2RizfW22KLSYp6iOzy7ifuTbD9TfJQ-vaQ0ERIQfSHQJyLnyzLtB-I8YtLmKw1mDnMBVu"
                                        />
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* CONTENT AREA */}
                        <div className={styles.content}>
                            {/* Welcome */}
                            <section className={styles.welcome}>
                                <div className={styles.welcomeText}>
                                    <h2 className={styles.welcomeHeading}>Good Morning, Dr. Vance</h2>
                                    <p className={styles.welcomeSub}>
                                        The sanctuary is busy today. You have 12 appointments scheduled, starting with Luna the
                                        Golden Retriever in 15 minutes.
                                    </p>
                                </div>
                                <div className={styles.welcomeMeta}>
                                    <span className={styles.statusPill}>
                                        <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>
                                            wb_sunny
                                        </span>
                                        Clinic Status: Optimistic
                                    </span>
                                    <div className={styles.dateText}>August 12, 2026</div>
                                </div>
                            </section>

                            {/* Stats bento grid */}
                            <section className={styles.statsGrid}>
                                <div className={styles.statCard}>
                                    <div className={styles.statCardTop}>
                                        <div className={styles.statIcon}>
                                            <span className="material-symbols-outlined">event_note</span>
                                        </div>
                                        <span className={styles.statBadge}>+2 today</span>
                                    </div>
                                    <div>
                                        <p className={styles.statLabel}>Today&apos;s Appts</p>
                                        <h3 className={styles.statValue}>12</h3>
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
                                        <h3 className={styles.statValue}>24</h3>
                                    </div>
                                </div>

                                <div className={styles.statCard}>
                                    <div className={styles.statCardTop}>
                                        <div className={styles.statIconTertiary}>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                pets
                                            </span>
                                        </div>
                                        <span className={styles.statBadgeTertiary}>New: 4</span>
                                    </div>
                                    <div>
                                        <p className={styles.statLabel}>Total Patients</p>
                                        <h3 className={styles.statValue}>1,284</h3>
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
                                        <h3 className={styles.statValueOnPrimary}>8</h3>
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
                                                    {todaySchedule.map((appt) => (
                                                        <Appointment key={appt.id} appt={appt} />
                                                    ))}
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
                        </div>


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