import styles from "./Wellness.module.css";
import Image from "next/image";
import Patient from "../../public/patient.png"


export default function Wellness() {
    return (
        <section className={styles.container}>
            <div className={styles.wellnessContainer} style={{
                fontFamily: "'Catamaran', sans-serif",
                fontSize: "1.6rem",
            }}>
                <div className={styles.left}>
                    <div style={{ padding: "20px" }}>
                        <div className={styles.leftIcon}> <Image src={Patient} alt="Icon" className="p-2" /></div>
                        <h1 className={styles.leftTitle} style={{
                            fontFamily: "'Catamaran', sans-serif",
                            fontWeight: 800,
                        }}>Complete Medical Records</h1>
                        <p className={styles.leftDesc}>Keep vaccinations, surgical history, and lab results in one encrypted digital vault. Never lose a vet report again</p>
                    </div>
                    <div className={styles.leftPhoto}>
                        <div className={styles.leftPhotoInner}>
                            <img src="https://picsum.photos/500/500" alt="Medical Records" />
                        </div>
                    </div>
                </div>

                <div className={styles.right}>
                    <div className={styles.rightTop}>
                        <h1 className={styles.rightTopTitle} style={{
                            fontFamily: "'Catamaran', sans-serif",
                            fontWeight: 800,
                        }}>Smart Reminders</h1>
                        <p className={styles.rightTopDesc}>Never miss a vaccination or deworming schedule again. Get timely alerts and track your pet's preventive care</p>
                    </div>
                    <div className={styles.rightBottom}>
                        <div className={styles.rightBottomLeft}>
                            <h1 className={styles.rightBottomLeftTitle} style={{
                                fontFamily: "'Catamaran', sans-serif",
                                fontWeight: 800,
                            }}>Pet Health Dashboard</h1>
                            <p className={styles.rightBottomLeftDesc}>Track weight, food intake, and activity levels. Get insights and recommendations to keep your pet healthy and happy</p>
                        </div>
                        <div className={styles.rightBottomRight}>
                            <h1 className={styles.rightBottomRightTitle} style={{
                                fontFamily: "'Catamaran', sans-serif",
                                fontWeight: 800,
                            }}>Health Tracking</h1>
                            <p className={styles.rightBottomRightDesc}>Monitor vital signs, medication schedules, and appointment history all in one place for comprehensive pet care</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}