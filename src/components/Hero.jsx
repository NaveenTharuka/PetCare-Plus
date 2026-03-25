"use client";
import Image from "next/image";
import HeroImage from "../../public/hero-dog.png"
import Link from "next/link";

export default function Hero() {
    return (
        <section style={{ position: "relative", overflow: "hidden", minHeight: "90vh", background: "#FDFBF7" }}>
            {/* Decorative blur glow */}
            <div style={{
                position: "absolute",
                left: -120,
                top: 200,
                width: 500,
                height: 500,
                borderRadius: "50%",
                background: "rgba(228, 183, 87, 0.35)",
                filter: "blur(120px)",
                pointerEvents: "none",
                zIndex: 0
            }} />

            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 48, position: "relative", zIndex: 1 }}>
                {/* Left Content */}
                <div style={{ flex: 1, maxWidth: 620 }}>
                    <h1 style={{
                        fontFamily: "'Montserrat Alternates', sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(2.8rem, 6vw, 5rem)",
                        lineHeight: 1.08,
                        color: "#92633a",
                        marginBottom: 24,
                        marginTop: 40
                    }}>
                        Your Pet Deserves the Best Care.
                    </h1>
                    <p style={{
                        fontFamily: "'Lunasima', sans-serif",
                        fontSize: "1.15rem",
                        lineHeight: 1.7,
                        color: "#6c6c6c",
                        marginBottom: 40,
                        maxWidth: 500
                    }}>
                        Store medical reports, track treatments, and manage your pet&apos;s health anytime, anywhere.
                    </p>

                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                        <Link href="/signup" id="hero-get-started" style={{
                            fontFamily: "'Lunasima', sans-serif",
                            fontWeight: 600,
                            fontSize: "1.1rem",
                            background: "#92633a",
                            color: "white",
                            padding: "16px 36px",
                            borderRadius: 36,
                            textDecoration: "none",
                            boxShadow: "0 4px 20px rgba(146,99,58,0.35)",
                            transition: "all 0.25s ease",
                            display: "inline-block"
                        }}
                            onMouseEnter={e => { e.currentTarget.style.background = "#7d5431"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(146,99,58,0.45)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "#92633a"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(146,99,58,0.35)"; }}
                        >
                            Try PetCare+ Free
                        </Link>
                        <Link href="#demo" id="hero-watch-demo" style={{
                            fontFamily: "'Lunasima', sans-serif",
                            fontSize: "1.1rem",
                            color: "rgba(0,0,0,0.66)",
                            border: "1.5px solid rgba(146,99,58,0.45)",
                            padding: "16px 36px",
                            borderRadius: 36,
                            textDecoration: "none",
                            transition: "all 0.25s ease",
                            display: "inline-block",
                            backdropFilter: "blur(4px)"
                        }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = "#92633a"; e.currentTarget.style.background = "rgba(146,99,58,0.06)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(146,99,58,0.45)"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; }}
                        >
                            Watch Demo
                        </Link>
                    </div>

                    {/* Trusted by */}
                    <div style={{ marginTop: 48, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                        <span style={{
                            fontFamily: "'Lunasima', sans-serif",
                            fontSize: "0.95rem",
                            color: "#908e8c"
                        }}>Trusted By</span>
                        <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
                            {["PAWPRINT", "VETCORP", "HEALTHYPET"].map(brand => (
                                <span key={brand} style={{
                                    fontFamily: "'Catamaran', sans-serif",
                                    fontWeight: 800,
                                    fontStyle: "italic",
                                    fontSize: "1rem",
                                    color: "rgba(146,99,58,0.7)",
                                    letterSpacing: "0.05em"
                                }}>{brand}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                    marginTop: "20px"
                }}>
                    <div style={{
                        position: "relative",
                        width: "clamp(250px, 30vw, 500px)",
                        aspectRatio: "3/4",
                        borderRadius: 32,
                        overflow: "hidden",
                    }}>
                        <Image
                            src={HeroImage}
                            alt="Happy pet with PetCare+"
                            fill
                            style={{ objectFit: "contain", mixBlendMode: "multiply" }}
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}