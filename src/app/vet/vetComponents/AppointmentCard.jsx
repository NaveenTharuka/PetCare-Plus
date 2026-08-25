import styles from '../appointments/AppointmentManagement.module.css';

export default function AppointmentCard({ appt }) {
    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed':
                return styles.statusConfirmed;
            case 'arrived':
                return styles.statusArrived;
            case 'pending':
                return styles.statusPending;
            case 'completed':
                return styles.statusCompleted;
            case 'cancelled':
            case 'rejected':
                return styles.statusCancelled;
            default:
                return styles.statusConfirmed;
        }
    };

    const getDotColor = (reason) => {
        const r = reason?.toLowerCase() || '';
        if (r.includes('urgent') || r.includes('emergency')) {
            return styles.dotError;
        }
        if (r.includes('vaccin') || r.includes('surgery')) {
            return styles.dotTertiary;
        }
        return styles.dotPrimary;
    };

    const statusBadgeClass = appt.statusClass || getStatusClass(appt.status);
    const dotColorClass = appt.dotColor || getDotColor(appt.reason);

    return (
        <tr className={styles.tableRow}>
            <td>
                <div className={styles.petCell}>
                    {appt.avatar ? (
                        <img src={appt.avatar} alt={appt.pet} className={styles.petAvatar} />
                    ) : (
                        <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: '#7b5749' }}>
                            pets
                        </span>
                    )}
                    <div>
                        <p className={styles.petName}>{appt.pet}</p>
                        <p className={styles.ownerName}>Owner: {appt.owner}</p>
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <span className={styles.date}>{appt.appointment_date || appt.date}</span>
                    <span className={styles.time}>{appt.appointment_time || appt.time}</span>
                </div>
            </td>
            <td>
                <div className={styles.reasonCell}>
                    <span className={`${styles.reasonDot} ${dotColorClass}`}></span>
                    <span>{appt.reason}</span>
                </div>
            </td>
            <td>
                <span className={`${styles.statusBadge} ${statusBadgeClass}`}>
                    {appt.status}
                </span>
            </td>
        </tr>
    );
}