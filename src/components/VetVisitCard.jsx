// components/VetVisitCard.jsx
import { useState } from 'react';
import styles from "../app/user/me/pets/[petId]/page.module.css";

export default function VetVisitCard({ visit, index, onEdit, onDelete }) {
    const brownColors = [
        styles.vetVisitDotBrown,
        styles.vetVisitDotLightBrown,
        styles.vetVisitDotDarkBrown,
        styles.vetVisitDotWarmBrown,
        styles.vetVisitDotCinnamon,
        styles.vetVisitDotCoffee,
    ];

    const dotColor = brownColors[(index ?? 0) % brownColors.length];
    const [isDeleting, setIsDeleting] = useState(false);

    const handleEdit = () => {
        if (onEdit) {
            onEdit(visit);
        }
    };

    const handleDelete = async () => {
        if (!onDelete) return;

        // Confirm before deleting
        if (window.confirm(`Are you sure you want to delete the visit for "${visit.reason}"?`)) {
            setIsDeleting(true);
            try {
                await onDelete(visit.id || index);
            } catch (error) {
                console.error('Failed to delete visit:', error);
                alert('Failed to delete visit. Please try again.');
            } finally {
                setIsDeleting(false);
            }
        }
    };

    // Format date if it's a string
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <div className={styles.vetVisitItem}>
            <div className={styles.vetVisitContent}>
                <div className={styles.vetVisitLeft}>
                    <div className={`${styles.vetVisitDot} ${dotColor}`}></div>
                    <div style={{ flex: 1 }}>
                        <p className={styles.vetVisitDateType}>
                            {formatDate(visit.visit_date)}
                            <span className={styles.vetVisitSeparator}>•</span>
                            {visit.reason}
                        </p>
                        <p className={styles.vetVisitTitle}>{visit.vet_name}</p>
                        {visit.note && (
                            <p className={styles.vetVisitNotes}>{visit.note}</p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className={styles.vetVisitActions}>
                    <button
                        className={styles.vetVisitEditBtn}
                        onClick={handleEdit}
                        aria-label="Edit visit"
                        title="Edit visit"
                        type="button"
                    >
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button
                        className={styles.vetVisitDeleteBtn}
                        onClick={handleDelete}
                        disabled={isDeleting}
                        aria-label="Delete visit"
                        title="Delete visit"
                        type="button"
                    >
                        <span className="material-symbols-outlined">
                            {isDeleting ? 'progress_activity' : 'delete'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}