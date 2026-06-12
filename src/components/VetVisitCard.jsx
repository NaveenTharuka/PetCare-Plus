import styles from "../app/user/me/pets/[petId]/page.module.css";

export default function VetVisitCard({ visit, index }) {
    const brownColors = [
        styles.vetVisitDotBrown,
        styles.vetVisitDotLightBrown,
        styles.vetVisitDotDarkBrown,
        styles.vetVisitDotWarmBrown,
        styles.vetVisitDotCinnamon,
        styles.vetVisitDotCoffee,
    ];

    const dotColor = brownColors[(index ?? 0) % brownColors.length];

    return (
        <div className={styles.vetVisitItem}>
            <div className={`${styles.vetVisitDot} ${dotColor}`}></div>
            <div>
                <p className={styles.vetVisitDateType}>
                    {visit.visit_date} <span className={styles.vetVisitSeparator}>•</span> {visit.reason}
                </p>
                <p className={styles.vetVisitTitle}>{visit.vet_name}</p>
                <p className={styles.vetVisitNotes}>{visit.note}</p>
            </div>
        </div>
    );
}