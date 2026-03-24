"use client";
import Image from "next/image";
import Link from "next/link";

const footerLinks = {
    Features: ["Home", "Reports", "Services", "Plans"],
    Support: ["Help Center", "FAQ", "Contact Us"],
    Resources: ["Blogs", "Documentation", "Community"],
    Company: ["About Us", "Careers", "Privacy Policy"],
};

export default function Footer() {
    return (
        <footer style={{ background: "#92633a", color: "white", paddingTop: 80, paddingBottom: 40 }}>
            <div className="max-w-7xl mx-auto px-6">
                {/* Join Us Banner */}
                <div style={{
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: 32,
                    padding: "56px 48px",
                    textAlign: "center",
                    marginBottom: 80,
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.2)"
                }}>
                    <h2 style={{
                        fontFamily: "'Catamaran', sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(2rem, 4vw, 3rem)",
                        marginBottom: 12
                    }}>Ready to Join Us?</h2>
                    <p style={{
                        fontFamily: "'Lunasima', sans-serif",
                        fontSize: "1.05rem",
                        opacity: 0.85,
                        marginBottom: 36,
                        maxWidth: 480,
                        margin: "0 auto 36px"
                    }}>
                        Download the PetCare+ app and start managing your pet&apos;s health today.
                    </p>
                    <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                        <button style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            background: "white",
                            color: "#92633a",
                            border: "none",
                            borderRadius: 16,
                            padding: "14px 28px",
                            fontFamily: "'Catamaran', sans-serif",
                            fontWeight: 700,
                            fontSize: "1rem",
                            cursor: "pointer",
                            transition: "all 0.25s ease",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.15)"
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)"; }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="#92633a">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                            </svg>
                            App Store
                        </button>
                        <button style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            background: "white",
                            color: "#92633a",
                            border: "none",
                            borderRadius: 16,
                            padding: "14px 28px",
                            fontFamily: "'Catamaran', sans-serif",
                            fontWeight: 700,
                            fontSize: "1rem",
                            cursor: "pointer",
                            transition: "all 0.25s ease",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.15)"
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)"; }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="#92633a">
                                <path d="M3.18 23.76c.3.17.64.25.99.23l.14-.03L14.93 12 3.31.04.03.27C.01.37 0 .47 0 .58v22.84c0 .12.06.24.18.34zM19.83 8.52l-2.66-1.54-3.5 3.5 3.5 3.5 2.69-1.55c.77-.44.77-1.47-.03-1.91zM4.63 1.23l10.47 10.48-3.19 3.19L1.55 4.08 4.63 1.23zm.01 21.55l-3.09-3.09 10.36-10.36 3.19 3.19-10.46 10.26z"/>
                            </svg>
                            Google Play
                        </button>
                    </div>
                </div>

                {/* Links Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(4, 1fr)", gap: 40, marginBottom: 60 }}>
                    {/* Brand column */}
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                            <Image src="/Logo.webp" alt="PetCare+" width={44} height={44} style={{ objectFit: "contain" }} />
                            <span style={{ fontFamily: "'Catamaran', sans-serif", fontWeight: 800, fontSize: "1.5rem" }}>PetCare+</span>
                        </div>
                        <p style={{ fontFamily: "'Lunasima', sans-serif", fontSize: "0.9rem", opacity: 0.8, lineHeight: 1.7, maxWidth: 220 }}>
                            Your trusted partner in pet health management. Storing, tracking, and caring for your pet&apos;s wellbeing.
                        </p>
                    </div>

                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 style={{ fontFamily: "'Catamaran', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: 16 }}>
                                {category}
                            </h4>
                            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                                {links.map(link => (
                                    <li key={link}>
                                        <Link href="#" style={{
                                            fontFamily: "'Lunasima', sans-serif",
                                            fontSize: "0.9rem",
                                            color: "rgba(255,255,255,0.8)",
                                            textDecoration: "none",
                                            transition: "all 0.2s",
                                            display: "inline-block"
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.color = "white"; e.currentTarget.style.transform = "translateX(4px)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.8)"; e.currentTarget.style.transform = "translateX(0)"; }}
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                    <p style={{ fontFamily: "'Lunasima', sans-serif", fontSize: "0.9rem", opacity: 0.75 }}>
                        © 2026 PetCare+. All rights reserved.
                    </p>
                    <div style={{ display: "flex", gap: 24 }}>
                        {["Privacy Policy", "Terms of Service"].map(item => (
                            <Link key={item} href="#" style={{ fontFamily: "'Lunasima', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", textDecoration: "none", transition: "color 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.color = "white"}
                            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.75)"}
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>


        </footer>
    );
}