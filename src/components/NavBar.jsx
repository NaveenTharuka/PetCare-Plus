"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full" style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 2px 20px rgba(0,0,0,0.08)"
        }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 80 }}>
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/Logo.webp" alt="PetCare+ Logo" width={48} height={48} className="object-contain" />
                    <span style={{
                        fontFamily: "'Catamaran', sans-serif",
                        fontWeight: 800,
                        fontSize: "1.6rem",
                        color: "#92633a"
                    }}>PetCare+</span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-10">
                    {[
                        { label: "Home", href: "/", active: true },
                        { label: "Reports", href: "/reports" },
                        { label: "Services", href: "/services" },
                        { label: "Contact Us", href: "/contact" },
                    ].map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            style={{
                                fontFamily: "'Lunasima', sans-serif",
                                fontSize: "1rem",
                                fontWeight: item.active ? 600 : 400,
                                color: item.active ? "#92633a" : "#a8a8a8",
                                textDecoration: "none",
                                transition: "color 0.2s ease",
                                position: "relative",
                            }}
                            onMouseEnter={e => e.target.style.color = "#92633a"}
                            onMouseLeave={e => e.target.style.color = item.active ? "#92633a" : "#a8a8a8"}
                        >
                            {item.label}
                            {item.active && (
                                <span style={{
                                    position: "absolute",
                                    bottom: -4,
                                    left: 0,
                                    right: 0,
                                    height: 2,
                                    background: "#92633a",
                                    borderRadius: 2
                                }} />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login" style={{
                        fontFamily: "'Lunasima', sans-serif",
                        fontSize: "1rem",
                        color: "#4A3728",
                        textDecoration: "none",
                        padding: "8px 16px",
                        transition: "color 0.2s"
                    }}
                    onMouseEnter={e => e.target.style.color = "#92633a"}
                    onMouseLeave={e => e.target.style.color = "#4A3728"}
                    >
                        Log In
                    </Link>
                    <Link href="/signup" style={{
                        fontFamily: "'Lunasima', sans-serif",
                        fontSize: "1rem",
                        fontWeight: 600,
                        background: "#92633a",
                        color: "white",
                        padding: "10px 24px",
                        borderRadius: 60,
                        textDecoration: "none",
                        transition: "all 0.25s ease",
                        boxShadow: "0 2px 8px rgba(146,99,58,0.3)"
                    }}
                    onMouseEnter={e => { e.target.style.background = "#7d5431"; e.target.style.boxShadow = "0 4px 16px rgba(146,99,58,0.45)"; e.target.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.target.style.background = "#92633a"; e.target.style.boxShadow = "0 2px 8px rgba(146,99,58,0.3)"; e.target.style.transform = "translateY(0)"; }}
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <span style={{ width: 24, height: 2, background: "#92633a", borderRadius: 2, transition: "all 0.3s", transform: mobileOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
                    <span style={{ width: 24, height: 2, background: "#92633a", borderRadius: 2, opacity: mobileOpen ? 0 : 1 }} />
                    <span style={{ width: 24, height: 2, background: "#92633a", borderRadius: 2, transition: "all 0.3s", transform: mobileOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div style={{ background: "rgba(255,255,255,0.97)", padding: "16px 24px 24px" }}>
                    {["Home", "Reports", "Services", "Contact Us"].map(item => (
                        <div key={item} style={{ padding: "12px 0", borderBottom: "1px solid rgba(146,99,58,0.1)" }}>
                            <Link href="/" style={{ color: "#4A3728", fontFamily: "'Lunasima', sans-serif", textDecoration: "none", fontSize: "1rem" }}>
                                {item}
                            </Link>
                        </div>
                    ))}
                    <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                        <Link href="/login" style={{ flex: 1, textAlign: "center", padding: "10px", border: "1px solid #92633a", borderRadius: 60, color: "#92633a", textDecoration: "none", fontFamily: "'Lunasima', sans-serif" }}>Log In</Link>
                        <Link href="/signup" style={{ flex: 1, textAlign: "center", padding: "10px", background: "#92633a", borderRadius: 60, color: "white", textDecoration: "none", fontFamily: "'Lunasima', sans-serif" }}>Get Started</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}