"use client";
import Image from "next/image";

const features = [
    {
        emoji: "📂",
        title: "Medical Records",
        description: "Securely store and organize every blood report and prescription in our encrypted cloud storage."
    },
    {
        emoji: "☁️",
        title: "Access from Anywhere",
        description: "Access your pet's data from any device, anytime, without worrying. We are available 24/7."
    },
    {
        emoji: "🩺",
        title: "Vet-Approved Platform",
        description: "Trusted and reviewed by veterinary professionals to ensure the best care standards."
    },
];

export default function Services() {
    return (
        <section style={{ background: "#FDFBF7", padding: "100px 0" }}>
            <div className="max-w-7xl mx-auto px-6">
                {/* Heading */}
                <div style={{ textAlign: "center", marginBottom: 72 }}>
                    <h2 style={{
                        fontFamily: "'Catamaran', sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(2rem, 4vw, 3.2rem)",
                        color: "#92633a",
                        lineHeight: 1.2,
                        maxWidth: 640,
                        margin: "0 auto 16px"
                    }}>
                        Why PetCare+ Is the Choice of Professionals
                    </h2>
                    <p style={{
                        fontFamily: "'Lunasima', sans-serif",
                        fontSize: "1.05rem",
                        color: "#908e8c",
                        maxWidth: 480,
                        margin: "0 auto",
                        lineHeight: 1.7
                    }}>
                        Everything you need to keep your pet healthy, organized in one beautiful platform.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
                    {/* Photo Collage */}
                    <div style={{ position: "relative", height: 480, minWidth: 280, maxWidth: 420 }}>
                        {/* Top-left large photo */}
                        <div style={{
                            position: "absolute",
                            top: 0,
                            left: 20,
                            width: 220,
                            height: 210,
                            borderRadius: 40,
                            overflow: "hidden",
                            boxShadow: "6px 8px 24px rgba(0,0,0,0.2)",
                            transform: "rotate(-3deg)",
                            transition: "transform 0.3s ease"
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = "rotate(-3deg) scale(1.03)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "rotate(-3deg)"}
                        >
                            <Image src="/victor-g-N04FIfHhv_k-unsplash.jpg" alt="Pet 1" fill style={{ objectFit: "cover" }} />
                        </div>
                        {/* Top-right photo */}
                        <div style={{
                            position: "absolute",
                            top: 80,
                            left: 180,
                            width: 205,
                            height: 195,
                            borderRadius: 40,
                            overflow: "hidden",
                            boxShadow: "6px 8px 24px rgba(0,0,0,0.2)",
                            transform: "rotate(9deg)",
                            transition: "transform 0.3s ease"
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = "rotate(9deg) scale(1.03)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "rotate(9deg)"}
                        >
                            <Image src="/pauline-loroy-U3aF7hgUSrk-unsplash.jpg" alt="Pet 2" fill style={{ objectFit: "cover" }} />
                        </div>
                        {/* Bottom-left photo */}
                        <div style={{
                            position: "absolute",
                            bottom: 10,
                            left: 30,
                            width: 220,
                            height: 210,
                            borderRadius: 40,
                            overflow: "hidden",
                            boxShadow: "6px 8px 24px rgba(0,0,0,0.2)",
                            transform: "rotate(-4deg)",
                            transition: "transform 0.3s ease"
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = "rotate(-4deg) scale(1.03)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "rotate(-4deg)"}
                        >
                            <Image src="/oscar-sutton-yihlaRCCvd4-unsplash.jpg" alt="Pet 3" fill style={{ objectFit: "cover" }} />
                        </div>
                    </div>

                    {/* Feature Cards */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 28, justifyContent: "center" }}>
                        {features.map((feat, i) => (
                            <div
                                key={i}
                                style={{
                                    display: "flex",
                                    gap: 20,
                                    alignItems: "flex-start",
                                    padding: "24px 28px",
                                    background: "white",
                                    borderRadius: 20,
                                    boxShadow: "0 2px 20px rgba(146,99,58,0.08)",
                                    transition: "all 0.3s ease",
                                    cursor: "default"
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(146,99,58,0.15)"; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 20px rgba(146,99,58,0.08)"; }}
                            >
                                {/* Icon */}
                                <div style={{
                                    width: 64,
                                    height: 64,
                                    minWidth: 64,
                                    background: "rgba(232,196,184,0.35)",
                                    borderRadius: 20,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "1.8rem"
                                }}>
                                    {feat.emoji}
                                </div>
                                {/* Text */}
                                <div>
                                    <h3 style={{
                                        fontFamily: "'Catamaran', sans-serif",
                                        fontWeight: 700,
                                        fontSize: "1.25rem",
                                        color: "#92633a",
                                        marginBottom: 6
                                    }}>
                                        {feat.title}
                                    </h3>
                                    <p style={{
                                        fontFamily: "'Lunasima', sans-serif",
                                        fontSize: "0.95rem",
                                        color: "#908e8c",
                                        lineHeight: 1.6
                                    }}>
                                        {feat.description}
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