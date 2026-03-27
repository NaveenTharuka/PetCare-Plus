"use client";
import styles from "./Steps.module.css";

const steps = [
    {
        number: "1",
        title: "Create a Pet Profile",
        description: "Add your dog, cat or any pet with their basic details, breed and age."
    },
    {
        number: "2",
        title: "Upload Medical Reports",
        description: "Store blood reports, prescriptions and digital records in our encrypted cloud storage."
    },
    {
        number: "3",
        title: "Track Health History",
        description: "Access your pet's medical timeline from anywhere, anytime and any device."
    },
];

export default function Steps() {
    return (
        <section style={{ padding: "80px 0", background: "#FDFBF7" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
                <div style={{
                    background: "#f6f1ec",
                    borderRadius: 50,
                    boxShadow: "13px 15px 41px rgba(0,0,0,0.15)",
                    overflow: "hidden",
                    display: "grid",
                    gridTemplateColumns: "minmax(240px, 320px) 1fr",
                    minHeight: 520
                }}
                >
                    {/* Left Panel */}
                    <div className={styles.process}>
                        <div style={{
                            fontFamily: "'Niramit', sans-serif",
                            fontWeight: 300,
                            fontSize: "1.6rem",
                            color: "white",
                            marginBottom: 24
                        }}>
                            🐾 The Process
                        </div>
                        <h2 style={{
                            fontFamily: "'Niramit', sans-serif",
                            fontWeight: 700,
                            fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                            color: "white",
                            lineHeight: 1.15
                        }}>
                            Simple Steps to Better Pet Health
                        </h2>
                    </div>

                    {/* Steps List */}
                    <div style={{ padding: "48px 48px 48px 56px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 40 }}>
                        {steps.map((step, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 28 }}>
                                {/* Step Number */}
                                <div style={{
                                    minWidth: 72,
                                    height: 72,
                                    background: "rgba(212,212,212,0.37)",
                                    borderRadius: 24,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontFamily: "'Catamaran', sans-serif",
                                    fontWeight: 800,
                                    fontSize: "2.2rem",
                                    color: "rgba(169,102,66,0.86)",
                                    transition: "all 0.3s ease",
                                    cursor: "default"
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(146,99,58,0.15)"; e.currentTarget.style.transform = "scale(1.08)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(212,212,212,0.37)"; e.currentTarget.style.transform = "scale(1)"; }}
                                >
                                    {step.number}
                                </div>
                                {/* Step Text */}
                                <div>
                                    <h3 style={{
                                        fontFamily: "'Catamaran', sans-serif",
                                        fontWeight: 700,
                                        fontSize: "1.3rem",
                                        color: "#92633a",
                                        marginBottom: 6
                                    }}>
                                        {step.title}
                                    </h3>
                                    <p style={{
                                        fontFamily: "'Lunasima', sans-serif",
                                        fontSize: "0.95rem",
                                        color: "#908e8c",
                                        lineHeight: 1.65
                                    }}>
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </section>
    );
}