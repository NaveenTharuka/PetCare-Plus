'use client';

import { useEffect, useState, useMemo } from 'react';
import VetSideBar from '../vetComponents/vetSidebar';
import styles from './AppointmentManagement.module.css';
import AppointmentCard from '../vetComponents/AppointmentCard';
import { getVetAppointments } from '@/apiServices/appointment.api';
import { useAuth } from '@/auth/AuthProvider';
import VetLoader from '../vetComponents/VetLoader';

export default function AppointmentsPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('current');
    const [currentPage, setCurrentPage] = useState(1);
    const { user, loading } = useAuth();

    const ITEMS_PER_PAGE = 4;

    // Helper function to parse date strings safely
    const parseAppointmentDate = (dateStr) => {
        if (!dateStr) return null;
        try {
            return new Date(dateStr);
        } catch {
            return null;
        }
    };

    // Filter appointments by status and date
    const filterAppointments = useMemo(() => {
        if (!appointments.length) {
            return {
                current: [],
                completed: [],
                pending: [],
                cancelled: [],
                all: []
            };
        }

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        // Separate by status
        const pending = appointments.filter(appt =>
            appt.status?.toLowerCase() === 'pending'
        );

        const cancelled = appointments.filter(appt =>
            appt.status?.toLowerCase() === 'cancelled' ||
            appt.status?.toLowerCase() === 'canceled'
        );

        const completed = appointments.filter(appt =>
            appt.status?.toLowerCase() === 'completed' ||
            appt.status?.toLowerCase() === 'done' ||
            appt.status?.toLowerCase() === 'finished'
        );

        // Current appointments = confirmed/arrived + future dates
        const confirmedOrArrived = appointments.filter(appt =>
            appt.status?.toLowerCase() === 'confirmed' ||
            appt.status?.toLowerCase() === 'arrived'
        );

        // Filter confirmed/arrived by date
        const current = confirmedOrArrived.filter(appt => {
            const apptDate = parseAppointmentDate(appt.date);
            if (!apptDate) return false;

            const apptDay = new Date(apptDate.getFullYear(), apptDate.getMonth(), apptDate.getDate());
            return apptDay >= today;
        });

        // Past confirmed/arrived appointments (completed by date)
        const pastConfirmed = confirmedOrArrived.filter(appt => {
            const apptDate = parseAppointmentDate(appt.date);
            if (!apptDate) return false;

            const apptDay = new Date(apptDate.getFullYear(), apptDate.getMonth(), apptDate.getDate());
            return apptDay < today;
        });

        // Merge past confirmed with completed status
        const allCompleted = [...completed, ...pastConfirmed];

        return {
            current,
            completed: allCompleted,
            pending,
            cancelled,
            all: appointments
        };
    }, [appointments]);

    // Get filtered appointments based on active filter
    const getFilteredAppointments = useMemo(() => {
        switch (activeFilter) {
            case 'current':
                return filterAppointments.current;
            case 'completed':
                return filterAppointments.completed;
            case 'pending':
                return filterAppointments.pending;
            case 'cancelled':
                return filterAppointments.cancelled;
            case 'all':
                return filterAppointments.all;
            default:
                return filterAppointments.all;
        }
    }, [activeFilter, filterAppointments]);

    // Pagination
    const totalPages = Math.ceil(getFilteredAppointments.length / ITEMS_PER_PAGE);
    const paginatedAppointments = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return getFilteredAppointments.slice(startIndex, endIndex);
    }, [getFilteredAppointments, currentPage]);

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter]);

    useEffect(() => {
        async function fetchAppointments() {
            if (loading) {
                return; // Wait for auth to finish
            }

            if (!user?.id) {
                setAppointments([]);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const res = await getVetAppointments(user.id);
                console.log(res);

                setAppointments(Array.isArray(res) ? res : []);
            } catch (err) {
                console.error("Failed to fetch appointments:", err);
                setError("Failed to load appointments. Please try again.");
                setAppointments([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAppointments();
    }, [user?.id, loading]);

    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Get page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) {
                    pages.push(i);
                }
            } else if (currentPage >= totalPages - 2) {
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pages.push(i);
                }
            }
        }
        return pages;
    };

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <VetSideBar />

            {/* Mobile menu toggle */}
            <div className={styles.mobileToggle}>
                <button
                    className={styles.menuBtn}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>
            </div>

            <div
                className={`${styles.overlay} ${menuOpen ? styles.show : ''}`}
                onClick={() => setMenuOpen(false)}
            ></div>

            {/* Main content */}
            <main className={styles.main}>
                {/* Top Nav */}
                {isLoading ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                        <VetLoader />
                    </div>
                ) : error ? (
                    <div className={styles.errorContainer}>
                        <p>{error}</p>
                        <button
                            className={styles.retryBtn}
                            onClick={() => {
                                setIsLoading(true);
                                setError(null);
                                const refetch = async () => {
                                    try {
                                        const res = await getVetAppointments(user.id);
                                        setAppointments(Array.isArray(res) ? res : []);
                                    } catch (err) {
                                        setError("Failed to load appointments. Please try again.");
                                    } finally {
                                        setIsLoading(false);
                                    }
                                };
                                refetch();
                            }}
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <>
                        <header className={styles.topHeader}>
                            <div className={styles.searchWrap}>
                                <span className="material-symbols-outlined">search</span>
                                <input type="text" placeholder="Search appointments, pets, or owners..." />
                            </div>
                            <div className={styles.headerRight}>
                                <div className={styles.profileWrap}>
                                    <div className={`${styles.profileText} ${styles.hideMobile}`}>
                                        <p className={styles.profileName}>{user?.name || 'Dr. Sarah Mitchell'}</p>
                                        <p className={styles.profileRole}>{user?.role || 'Lead Veterinarian'}</p>
                                    </div>
                                    <img
                                        className={styles.avatar}
                                        src={user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1eFrOPSbiY96XVuzZE1gFujFssfKxp1ReBffiGTh3IP19isVygxGc7Nc5Z6ef-D18JTOmKfaGb_mVusBBSkmukUbj-i7AgJ-Ecgrw6ZigEq2vFNq9yJG-a490pYseinjoYvMGS4XkJoRoUMjSyrNWUhO7uXooOchywS0PJTxeDtSEOwGGlL1TIy36b-slQoP29GXwKtvgz-rEBOyDDEp4F9BRc6EEx-avp4_uVYQxmKmqQzWKmaeh'}
                                        alt={user?.name || 'Dr. Sarah Mitchell'}
                                    />
                                </div>
                            </div>
                        </header>

                        <div className={styles.content}>
                            <div className={styles.pageHeader}>
                                <div>
                                    <h2 className={styles.pageTitle}>Appointment Management</h2>
                                    <p className={styles.pageSub}>Review and manage your daily veterinary schedule.</p>
                                </div>
                                <div className={styles.viewToggle}>
                                    <button className={`${styles.viewBtn} ${styles.viewActive}`}>List View</button>
                                    <button className={styles.viewBtn}>Calendar View</button>
                                </div>
                            </div>

                            <div className={styles.filterBar}>
                                <div className={styles.filterTabs}>
                                    <button
                                        className={`${styles.filterTab} ${activeFilter === 'current' ? styles.filterActive : ''}`}
                                        onClick={() => setActiveFilter('current')}
                                    >
                                        Current <span className={styles.badge}>{filterAppointments.current.length}</span>
                                    </button>
                                    <button
                                        className={`${styles.filterTab} ${activeFilter === 'completed' ? styles.filterActive : ''}`}
                                        onClick={() => setActiveFilter('completed')}
                                    >
                                        Completed <span className={styles.badge}>{filterAppointments.completed.length}</span>
                                    </button>
                                    <button
                                        className={`${styles.filterTab} ${activeFilter === 'pending' ? styles.filterActive : ''}`}
                                        onClick={() => setActiveFilter('pending')}
                                    >
                                        Pending <span className={styles.badge}>{filterAppointments.pending.length}</span>
                                    </button>
                                    <button
                                        className={`${styles.filterTab} ${activeFilter === 'cancelled' ? styles.filterActive : ''}`}
                                        onClick={() => setActiveFilter('cancelled')}
                                    >
                                        Cancelled <span className={styles.badge}>{filterAppointments.cancelled.length}</span>
                                    </button>
                                    <button
                                        className={`${styles.filterTab} ${activeFilter === 'all' ? styles.filterActive : ''}`}
                                        onClick={() => setActiveFilter('all')}
                                    >
                                        All <span className={styles.badge}>{filterAppointments.all.length}</span>
                                    </button>
                                </div>
                            </div>

                            <div className={styles.tableWrap}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Pet &amp; Owner</th>
                                            <th>Schedule</th>
                                            <th>Reason</th>
                                            <th>Status</th>
                                            <th className={styles.actionsHead}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedAppointments.length > 0 ? (
                                            paginatedAppointments.map((appt) => (
                                                <AppointmentCard
                                                    key={appt.id || appt._id}
                                                    appt={appt}
                                                />
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className={styles.emptyState}>
                                                    No {activeFilter} appointments found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                {/* Pagination - Only show if there are appointments */}
                                {getFilteredAppointments.length > 0 && (
                                    <div className={styles.pagination}>
                                        <p className={styles.pageInfo}>
                                            Showing <span className={styles.highlight}>
                                                {Math.min(1 + (currentPage - 1) * ITEMS_PER_PAGE, getFilteredAppointments.length)}
                                            </span> - <span className={styles.highlight}>
                                                {Math.min(currentPage * ITEMS_PER_PAGE, getFilteredAppointments.length)}
                                            </span> of <span className={styles.highlight}>
                                                {getFilteredAppointments.length}
                                            </span> {activeFilter} appointments
                                        </p>
                                        <div className={styles.pageControls}>
                                            <button
                                                className={styles.pageBtn}
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                            >
                                                <span className="material-symbols-outlined">chevron_left</span>
                                            </button>

                                            {getPageNumbers().map((pageNum) => (
                                                <button
                                                    key={pageNum}
                                                    className={`${styles.pageBtn} ${currentPage === pageNum ? styles.pageActive : ''}`}
                                                    onClick={() => handlePageChange(pageNum)}
                                                >
                                                    {pageNum}
                                                </button>
                                            ))}

                                            <button
                                                className={styles.pageBtn}
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                            >
                                                <span className="material-symbols-outlined">chevron_right</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}