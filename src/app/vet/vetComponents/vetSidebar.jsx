import { usePathname } from 'next/navigation';
import styles from '../dashboard/VetDashboard.module.css';

export default function VetSideBar() {

    const path = usePathname()

    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                <a className={path == "/vet/dashboard" ? styles.navLinkActive : styles.navLink} href="/vet/dashboard" >
                    <span className="material-symbols-outlined">dashboard</span>
                    <span>Dashboard</span>
                </a>
                <a className={path == "/vet/appointment" ? styles.navLinkActive : styles.navLink} href="#">
                    <span className="material-symbols-outlined">calendar_today</span>
                    <span>Appointments</span>
                </a>
                <a className={path == "/vet/patients" ? styles.navLinkActive : styles.navLink} href="/vet/patients/">
                    <span className="material-symbols-outlined">pets</span>
                    <span>Patients</span>
                </a>
            </nav>

            <button className={styles.ctaButton} type="button">
                New Appointment
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
    )
}