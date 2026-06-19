import styles from "../app/user/me/pets/[petId]/page.module.css";

export default function VaccineCard({ vax }) {

    const isValid = vax.dueDate > new Date().toISOString().split('T')[0];
    const badgeClass = isValid ? styles.vaxBadgeValid : styles.vaxBadgeExpired;
    const badgeText = isValid ? "VALID" : "EXPIRED";

    return (
        <div className={styles.vaxItem}>
            <div className={styles.vaxHeader}>
                <div>
                    <p className={styles.vaxTitle}>{vax.vaccineName}</p>
                    <p className={styles.vaxClinic}>{vax.vetName}</p>
                </div>
                <div className={badgeClass}>
                    {badgeText}
                </div>
                <div className="flex gap-2">
                    <button className="rounded-[12px] text-xs font-bold hover:scale-110 hover:text-primary transition-all">
                        <span className="material-symbols-outlined">
                            edit
                        </span>
                    </button>

                    <button className="rounded-[12px] text-xs font-bold hover:scale-110 hover:text-red-500 transition-all">
                        <span className="material-symbols-outlined">
                            delete
                        </span>
                    </button>
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