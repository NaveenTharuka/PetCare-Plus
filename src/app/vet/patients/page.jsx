"use client"
import Head from "next/head";
import styles from "./Patients.module.css";
import VetPetCard from "../vetComponents/VetPetCard";
import { useEffect, useState } from "react";
import { getAllPets } from "@/apiServices/pet.api";
import VetSideBar from "../vetComponents/vetSidebar";
import VetLoader from "../vetComponents/VetLoader";

const barHeights = [40, 60, 35, 75, 55, 90, 45];

export default function PatientsPage() {

    const [patients, setPatients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPets() {
            setIsLoading(true);
            try {
                const res = await getAllPets();
                setPatients(res ?? []);
            } catch (err) {
                console.error("Failed to fetch pets:", err);
                setPatients([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPets();
    }, []);

    return (
        <>
            <div className={styles.shell}>
                {/* Side Nav */}
                <VetSideBar />

                {/* Main Content */}
                <main className={styles.main}>

                    {isLoading ? (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                            <VetLoader />
                        </div>
                    ) : (
                        <>
                            <header className={styles.topNav}>
                                <div className={styles.searchWrap}>
                                    <div className={styles.searchInner}>
                                        <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
                                        <input className={styles.searchInput} type="text" placeholder="Search Patients..." />
                                    </div>
                                </div>
                            </header>

                            <div className={styles.canvas}>
                                {/* Page Header */}
                                <div className={styles.pageHeader}>
                                    <div>
                                        <h2 className={styles.pageTitle}>Patient Directory</h2>
                                        <p className={styles.pageSubtitle}>
                                            Managing {patients.length.toLocaleString()} fuzzy friends today.
                                        </p>
                                    </div>
                                    <div className={styles.headerActions}>
                                        <button className={styles.filterBtn}>
                                            <span className={`material-symbols-outlined ${styles.btnIconSm}`}>filter_list</span>
                                            Filter
                                        </button>
                                        <button className={styles.sortBtn}>
                                            <span className={`material-symbols-outlined ${styles.btnIconSm}`}>sort</span>
                                            Recently Visited
                                        </button>
                                    </div>
                                </div>

                                {/* Patient Grid */}
                                <div className={styles.grid}>
                                    {patients.map((p) => (
                                        <VetPetCard pet={p} key={p.id} />
                                    ))}
                                </div>

                                {/* Bento Stats Section */}
                                <div className={styles.bentoGrid}>
                                    <div className={styles.wellnessCard}>
                                        <div className={styles.wellnessLeft}>
                                            <h4 className={styles.wellnessTitle}>Weekly Wellness Insights</h4>
                                            <p className={styles.wellnessCopy}>
                                                Your clinic has successfully completed 45 preventive screenings this week. You&apos;re 12% ahead
                                                of last month&apos;s goals.
                                            </p>
                                            <div className={styles.statsRow}>
                                                <div className={styles.statBox}>
                                                    <p className={styles.statLabel}>Vaccinations</p>
                                                    <p className={styles.statValuePrimary}>124</p>
                                                </div>
                                                <div className={styles.statBox}>
                                                    <p className={styles.statLabel}>New Leads</p>
                                                    <p className={styles.statValueTertiary}>+18</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.chartBox}>
                                            <div className={styles.chartBars}>
                                                {barHeights.map((h, i) => (
                                                    <div
                                                        key={i}
                                                        className={styles.chartBar}
                                                        style={{ height: `${h}%`, opacity: [1, 0.8, 0.6, 0.4, 0.2, 1, 0.7][i] }}
                                                    />
                                                ))}
                                            </div>
                                            <div className={styles.chartFade} />
                                        </div>

                                        <div className={styles.tipBox}>
                                            <div className={styles.tipHeader}>
                                                <span className={`material-symbols-outlined ${styles.tipIcon}`}>lightbulb</span>
                                                <span className={styles.tipLabel}>Clinic Tip</span>
                                            </div>
                                            <p className={styles.tipCopy}>
                                                Regular dental checkups can prevent heart disease in older patients. Remind owners during annual
                                                exams.
                                            </p>
                                            <a href="#" className={styles.tipLink}>
                                                Read More Tips
                                            </a>
                                        </div>
                                    </div>

                                    <div className={styles.suppliesCard}>
                                        <div>
                                            <span className={`material-symbols-outlined ${styles.suppliesIcon}`}>medical_services</span>
                                            <h4 className={styles.suppliesTitle}>Supplies Alert</h4>
                                            <p className={styles.suppliesCopy}>
                                                Stock for &apos;Rabies Vaccination Type B&apos; is running low. Re-order suggested by EOD.
                                            </p>
                                        </div>
                                        <button className={styles.orderBtn}>Order Supplies</button>
                                    </div>
                                </div>
                            </div>

                            <footer className={styles.footer}>
                                <p>© 2023 PetCare Plus Management Ecosystem. All rights reserved.</p>
                            </footer>
                        </>
                    )}
                </main>
            </div>

            {/* Floating Action Button */}
            <button className={styles.fab}>
                <span className={`material-symbols-outlined ${styles.fabIcon}`}>add</span>
                <span className={styles.fabTooltip}>Add New Patient</span>
            </button>
        </>
    );
}