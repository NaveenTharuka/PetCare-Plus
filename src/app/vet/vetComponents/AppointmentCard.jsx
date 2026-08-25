import styles from '../appointments/AppointmentManagement.module.css'

export default function AppointmentCard({ appt }) {
    return (
        (
            <tr className={styles.tableRow}>
                <td>
                    <div className={styles.petCell}>
                        {appt.avatar ? <img src={appt.avatar} alt={appt.pet} className={styles.petAvatar} /> : <span className="material-symbols-outlined">pets</span>}
                        <div>
                            <p className={styles.petName}>{appt.pet}</p>
                            <p className={styles.ownerName}>Owner: {appt.owner}</p>
                        </div>
                    </div>
                </td>
                <td>
                    <div>
                        <span className={styles.date}>{appt.appointment_date}</span>
                        <span className={styles.time}>{appt.appointment_time}</span>
                    </div>
                </td>
                <td>
                    <div className={styles.reasonCell}>
                        <span className={`${styles.reasonDot} ${appt.dotColor}`}></span>
                        <span>{appt.reason}</span>
                    </div>
                </td>
                <td>
                    <span className={`${styles.statusBadge} ${appt.statusClass}`}>
                        {appt.status}
                    </span>
                </td>
            </tr>
        )
    )
}