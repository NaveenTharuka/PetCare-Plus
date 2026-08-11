import styles from '../dashboard/VetDashboard.module.css';

export default function VetSideBar({ navItems }) {
    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                <a className={styles.navLinkActive} href="#">
                    <span className="material-symbols-outlined">dashboard</span>
                    <span>Dashboard</span>
                </a>
                <a className={styles.navLink} href="#">
                    <span className="material-symbols-outlined">calendar_today</span>
                    <span>Appointments</span>
                </a>
                <a className={styles.navLink} href="#">
                    <span className="material-symbols-outlined">pets</span>
                    <span>Patients</span>
                </a>
                <a className={styles.navLink} href="#">
                    <span className="material-symbols-outlined">description</span>
                    <span>Records</span>
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