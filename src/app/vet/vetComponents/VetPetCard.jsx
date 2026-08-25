import styles from "../patients/Patients.module.css";

const statusClass = {
    regular: styles.statusRegular,
    urgent: styles.statusUrgent,
    new: styles.statusNew,
};


export default function VetPetCard({ pet }) {
    return (
        <div className={styles.card}>
            <div className={styles.cardImageWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={styles.cardImage} src={pet.image_url} alt={pet.name} />
            </div>
            <div className={styles.cardInfo}>
                <h3 className={styles.cardName}>{pet.name}</h3>
                <p className={styles.cardBreed}>{pet.breed}</p>
            </div>
            <div className={styles.cardMeta}>
                <p className={styles.metaLine}>
                    Owner: <span className={styles.metaValue}>{pet.owner_id}</span>
                </p>
                <p className={styles.metaLine}>
                    Last Visit: <span className={styles.metaValue}>{pet.lastVisit}</span>
                </p>
            </div>
            <button className={styles.viewProfileBtn}>View Profile</button>
        </div>
    )
}