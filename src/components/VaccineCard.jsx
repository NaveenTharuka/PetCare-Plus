import styles from "../app/user/me/pets/[petId]/page.module.css";

export default function VaccineCard({ vax }) {
    return (
        <div className={styles.vaxItem}>
            <div className={styles.vaxHeader}>
                <div>
                    <p className={styles.vaxTitle}>{vax.vaccineName}</p>
                    <p className={styles.vaxClinic}>{vax.vetName}</p>
                </div>
                <div className={styles.vaxBadge}>
                    VALID
                </div>
            </div>

            <div className={styles.vaxDatesGrid}>
                <div>
                    <p className={styles.vaxDateLabel}>Admin</p>
                    <p className={styles.vaxDateValue}>{vax.vaccineDate}</p>
                </div>
                <div>
                    <p className={styles.vaxDateLabel}>Due</p>
                    <p className={styles.vaxDateValue}>{vax.dueDate}</p>
                </div>
            </div>

            <p className={styles.vaxNotes}>{vax.notes}</p>
        </div>
    )
}