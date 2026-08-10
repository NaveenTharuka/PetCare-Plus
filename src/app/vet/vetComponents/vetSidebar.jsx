import styles from '../dashboard/VetDashboard.module.css';

export default function VetSideBar({ navItems }) {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.brand}>
                <div className={styles.brandMark}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                        pets
                    </span>
                </div>
                <div>
                    <h1 className={styles.brandTitle}>PetCare Plus</h1>
                    <p className={styles.brandSubtitle}>Veterinary Clinic</p>
                </div>
            </div>

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