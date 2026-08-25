import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './VetSidebar.module.css';

export default function VetSideBar() {
    const path = usePathname();

    const isDashboard = path === '/vet/dashboard';
    const isAppointments = path?.startsWith('/vet/appointments') || path === '/vet/appointment';
    const isPatients = path?.startsWith('/vet/patients');

    return (
        <aside className={styles.sidebar}>
            {/* Brand / Logo */}
            <Link href="/vet/dashboard" className={styles.brand}>
                <div className={styles.brandMark}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', fontVariationSettings: "'FILL' 1" }}>
                        pets
                    </span>
                </div>
                <div className={styles.brandInfo}>
                    <span className={styles.brandTitle}>PetCare+</span>
                    <span className={styles.brandSubtitle}>Clinic Ecosystem</span>
                </div>
            </Link>

            {/* Nav */}
            <nav className={styles.nav}>
                <Link
                    className={isDashboard ? styles.navLinkActive : styles.navLink}
                    href="/vet/dashboard"
                >
                    <span className="material-symbols-outlined">dashboard</span>
                    <span>Dashboard</span>
                </Link>
                <Link
                    className={isAppointments ? styles.navLinkActive : styles.navLink}
                    href="/vet/appointments"
                >
                    <span className="material-symbols-outlined">calendar_today</span>
                    <span>Appointments</span>
                </Link>
                <Link
                    className={isPatients ? styles.navLinkActive : styles.navLink}
                    href="/vet/patients"
                >
                    <span className="material-symbols-outlined">pets</span>
                    <span>Patients</span>
                </Link>
            </nav>

            <button className={styles.ctaButton} type="button">
                <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>add</span>
                <span>New Appointment</span>
            </button>

            <div className={styles.sidebarFooter}>
                <a className={styles.navLink} href="#">
                    <span className="material-symbols-outlined">help</span>
                    <span>Help Center</span>
                </a>
                <a className={styles.navLink} href="#">
                    <span className="material-symbols-outlined">logout</span>
                    <span>Logout</span>
                </a>
            </div>
        </aside>
    );
}