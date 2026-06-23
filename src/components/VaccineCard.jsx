import styles from "../app/user/me/pets/[petId]/page.module.css";

export default function VaccineCard({ vax, onEdit, onDelete }) {

    const isValid = vax.dueDate > new Date().toISOString().split('T')[0];
    const badgeClass = isValid ? styles.vaxBadgeValid : styles.vaxBadgeExpired;
    const badgeText = isValid ? "VALID" : "EXPIRED";

    const handleEdit = () => {
        if (onEdit) {
            onEdit(vax);
        }
    };

    const handleDelete = async () => {
        if (!onDelete) return;

        // Confirm before deleting
        if (window.confirm(`Are you sure you want to delete the vaccine for "${vax.vaccineName}"?`)) {
            try {
                await onDelete(vax.id);
            } catch (error) {
                console.error('Failed to delete vaccine:', error);
                alert('Failed to delete visit. Please try again.');
            }
        }
    };

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
                    <button onClick={handleEdit} className="rounded-[12px] text-xs font-bold hover:scale-110 hover:text-primary transition-all">
                        <span className="material-symbols-outlined">
                            edit
                        </span>
                    </button>

                    <button onClick={handleDelete} className="rounded-[12px] text-xs font-bold hover:scale-110 hover:text-red-500 transition-all">
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