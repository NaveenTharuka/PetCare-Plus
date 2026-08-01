"use client"
import React, { useState, useEffect } from 'react';
import styles from './VetDashboard.module.css';
import VetSideBar from '../vetComponents/vetSidebar';

const VetDashboard = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('Overview');

    // Staggered entrance animation trigger
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const appointments = [
        {
            time: '09:00 AM',
            pet: 'Luna',
            owner: 'Sarah Jenkins',
            status: 'Checked-in',
            statusType: 'checkedin',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv0-MvFByUxGyhmrS05xZbMkRSePNuytO_Ye1oPJRPRuJ26FlRwNpxVkY7Qpz-9LQb2DsIql2SAur1NPpkTpk4ORo6LMqgWAB25OuahVwCzqcrx13BVizq1IFAWdUD96Vq6A5cKeFkkLOXwYW1L8M1yE8_eqIL-LtR1FSfvBKy7DqepVYLmqMf7GYw10zn6AMYA4gbLr9wr10i5gPFF00POPP8zhas_i6NC-YIZO-4vC_kae2cIh94',
        },
        {
            time: '10:30 AM',
            pet: 'Oliver',
            owner: 'James Wilson',
            status: 'Confirmed',
            statusType: 'confirmed',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcpsAv2h71YSELULfO1kcabMRTifPiTQqMYcX1rjPy_KaN28Mzz_fPnt1wotXvwXsvcYqFcttyRfEk9AiusI7M4AQ2gMUsGmAZt7-NsgIWOCmwjG-X8vfkfm32jpAFKTof-swA0rvHBHS9AQ81dhvpSSIyLK4KpPsgVzc1UcNh1eO-Al5aUeCmi7j5DgV6cvkl7rBe3TarNuAv2TyLWByTv5VxPh2_laoBTmOJoEAxbG-evWneGdYT',
        },
        {
            time: '11:15 AM',
            pet: 'Bella',
            owner: 'Emma Thompson',
            status: 'Confirmed',
            statusType: 'confirmed',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBStoDfAkBfrDaCKiACzQmcjj4V0LiTgaloeFm-ElAcJpF8oOQHZshVm21d0dmLO-Fgrm17OwQiJV8WAhL1oDVX4N3gkB9OXu88WnlJRJjNP_3PrzkzqtFpgZd9zJjv0BfZk4Ig--LtkR_X3y8scEH9RStVtGfuLj_wuEq6UnIJH-4PkZnefB7Q5qAjISR1WYuay0QBJ42HrfP3ZWOB-dV5g8s3ACgppWIhtp2xxtjd6nx6HJ0inXx6',
        },
        {
            time: '01:45 PM',
            pet: 'Cooper',
            owner: 'Michael Davis',
            status: 'Urgent',
            statusType: 'urgent',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEUP4u793mYw2PlRTAKBeMdpAWNaqPG3ok9NDkS32nvGbzWgh7zDHW1PnKVhU4Y4ywx4uDsBSz1-3NR4Lwp38qD1blxc_WzYfsx5XQ3hs9JFFJBLfoOofjI9qhBL-j3WkmWwGSE1X2wKmd7L2deG7Qm4qDrrDSMGYuHLVMWd48BWN3Ry-kZx5inOSv98rM6bti-VR1lRQljoPGF6BY0u4f73ZjkDeRcortGHZE1s9VppZX8VtFcm88',
        },
    ];

    const stats = [
        {
            label: "Today's Appts",
            value: '12',
            change: '+2 today',
            icon: 'event_note',
            bg: 'bg-primary-container',
            text: 'text-primary',
            cardBg: 'bg-surface-container-lowest',
            hasShadow: true,
        },
        {
            label: 'Upcoming',
            value: '24',
            icon: 'upcoming',
            bg: 'bg-secondary-container',
            text: 'text-secondary',
            cardBg: 'bg-surface-container-low',
            hasShadow: false,
        },
        {
            label: 'Total Patients',
            value: '1,284',
            change: 'New: 4',
            icon: 'pets',
            bg: 'bg-tertiary-container',
            text: 'text-tertiary',
            cardBg: 'bg-surface-container-lowest',
            hasShadow: true,
            filledIcon: true,
        },
        {
            label: 'Completed Visits',
            value: '8',
            icon: 'check_circle',
            bg: 'bg-white/20',
            text: 'text-white',
            cardBg: 'bg-primary',
            hasShadow: true,
            isAccent: true,
        },
    ];

    const quickActions = [
        { label: 'View Appointments', icon: 'event' },
        { label: 'Search Patients', icon: 'person_search' },
        { label: 'Inventory Check', icon: 'inventory' },
    ];

    const navItems = [
        { label: 'Dashboard', icon: 'dashboard', active: true },
        { label: 'Appointments', icon: 'calendar_today', active: false },
        { label: 'Patients', icon: 'pets', active: false },
        { label: 'Records', icon: 'description', active: false },
    ];

    const topNavItems = ['Overview', 'Clinic Map', 'Reports'];

    const getStatusClasses = (type) => {
        switch (type) {
            case 'checkedin':
                return 'bg-tertiary-container/40 text-on-tertiary-container';
            case 'urgent':
                return 'bg-error-container/20 text-on-error-container';
            default:
                return 'bg-surface-container-highest text-on-surface-variant';
        }
    };

    return (
        <div className={`${styles.vetDashboard} bg-surface text-on-surface antialiased overflow-hidden`}>
            <div className="flex h-screen w-full overflow-hidden font-headline">
                {/* SIDE NAVBAR — Desktop */}
                <VetSideBar navItems={navItems} />

                {/* MAIN CANVAS */}
                <main className="flex-1 md:ml-64 h-full overflow-y-auto relative bg-surface">
                    {/* TOP NAVBAR */}
                    <header className="flex justify-between items-center px-6 w-full h-16 sticky top-0 z-40 bg-surface dark:bg-surface-dim glass-nav">
                        <div className="flex items-center gap-4 flex-1">
                            {/* Mobile menu toggle */}
                            <button
                                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high text-on-surface-variant"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
                            </button>

                            {/* Search Bar */}
                            <div className="relative w-full max-w-md group">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all outline-none text-sm"
                                    placeholder="Search patients, owners, or records..."
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            {/* Nav links (Desktop) */}
                            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
                                {topNavItems.map((item) => (
                                    <a
                                        key={item}
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); setActiveTab(item); }}
                                        className={`py-5 transition-colors duration-200 ${activeTab === item
                                            ? 'text-primary font-bold border-b-2 border-primary'
                                            : 'text-on-surface-variant hover:text-primary'
                                            }`}
                                    >
                                        {item}
                                    </a>
                                ))}
                            </nav>

                            {/* Trailing Actions */}
                            <div className="flex items-center gap-2">
                                <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high text-on-surface-variant cursor-pointer active:opacity-80 transition-all">
                                    <span className="material-symbols-outlined">notifications</span>
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high text-on-surface-variant cursor-pointer active:opacity-80 transition-all">
                                    <span className="material-symbols-outlined">settings</span>
                                </button>
                                <div className="h-8 w-[1px] bg-outline-variant/30 mx-2 hidden sm:block" />
                                <div className="flex items-center gap-3">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-xs font-bold text-on-surface">Dr. Vance</p>
                                        <p className="text-[10px] text-on-surface-variant">Senior Vet</p>
                                    </div>
                                    <img
                                        className="w-10 h-10 rounded-full border-2 border-primary-container object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu0E_zTHjgoZUNPztk4NPQ9w5E7J0_kq8uIPEwReHdN_5KNZhhpVE4C3yflIMzwOArNHUR97om7yFXPX7qzMLaM6r2TTZmzzwHyr7vh--sB6dFiC9Gu5za0C1uxRQeSQioYbNErxLKA1E-NdjHo4NHs_7mlNvW4fQTB-ti_6iaYSZcanP2RizfW22KLSYp6iOzy7ifuTbD9TfJQ-vaQ0ERIQfSHQJyLnyzLtB-I8YtLmKw1mDnMBVu"
                                        alt="Dr. Vance"
                                    />
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Mobile Menu Overlay */}
                    {mobileMenuOpen && (
                        <div className={`md:hidden fixed inset-0 z-50 bg-surface-container-lowest p-4 ${styles.slideInRight}`}>
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">
                                        <span className={`${styles.iconFilled} material-symbols-outlined`}>pets</span>
                                    </div>
                                    <h1 className="font-headline font-black text-primary">PetCare Plus</h1>
                                </div>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <nav className="space-y-2">
                                {navItems.map((item) => (
                                    <a
                                        key={item.label}
                                        href="#"
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold ${item.active
                                            ? 'bg-primary-container text-on-primary-container'
                                            : 'text-on-surface-variant hover:bg-surface-container-high'
                                            }`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <span className="material-symbols-outlined">{item.icon}</span>
                                        <span>{item.label}</span>
                                    </a>
                                ))}
                            </nav>
                            <button className="mt-6 w-full py-3 px-4 bg-gradient-to-br from-primary to-primary-dim text-white rounded-full font-semibold shadow-lg">
                                New Appointment
                            </button>
                        </div>
                    )}

                    {/* CONTENT AREA */}
                    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12">
                        {/* Welcome Section */}
                        <section className={`flex flex-col md:flex-row justify-between items-end gap-6 ${mounted ? styles.fadeInUp : 'opacity-0'}`}>
                            <div className="space-y-2">
                                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface">Good Morning, Dr. Vance</h2>
                                <p className="text-on-surface-variant max-w-lg leading-relaxed text-sm">
                                    The sanctuary is busy today. You have 12 appointments scheduled, starting with Luna the Golden Retriever in 15 minutes.
                                </p>
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="px-4 py-2 bg-tertiary-container text-on-tertiary-container rounded-full text-xs font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">wb_sunny</span>
                                    Clinic Status: Optimistic
                                </span>
                                <div className="text-on-surface-variant text-sm font-medium">October 24, 2023</div>
                            </div>
                        </section>

                        {/* Stats Bento Grid */}
                        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <div
                                    key={stat.label}
                                    className={`${styles.bentoCard} ${stat.cardBg} p-6 rounded-lg flex flex-col justify-between h-40 ${stat.hasShadow ? 'shadow-sm' : ''
                                        } border border-outline-variant/5 ${mounted ? styles.fadeInUp : 'opacity-0'}`}
                                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.text}`}>
                                            <span className={`material-symbols-outlined ${stat.filledIcon ? styles.iconFilled : ''}`}>
                                                {stat.icon}
                                            </span>
                                        </div>
                                        {stat.change && !stat.isAccent && (
                                            <span className={`text-xs font-bold ${stat.text}`}>{stat.change}</span>
                                        )}
                                    </div>
                                    <div>
                                        <p className={`text-xs font-bold uppercase tracking-wider ${stat.isAccent ? 'text-white/70' : 'text-on-surface-variant'}`}>
                                            {stat.label}
                                        </p>
                                        <h3 className={`text-3xl font-black ${stat.isAccent ? 'text-white' : 'text-on-surface'}`}>
                                            {stat.value}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* Layout: Main Content + Sidebar */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                            {/* Appointment Table (2/3) */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="flex justify-between items-center px-2">
                                    <h3 className="text-xl font-bold text-on-surface">Today&apos;s Schedule</h3>
                                    <button className="text-sm font-bold text-primary hover:underline transition-all">View Full Calendar</button>
                                </div>
                                <div className="bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/5">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="text-[10px] uppercase tracking-widest text-on-surface-variant font-black border-b border-outline-variant/10">
                                                    <th className="px-4 md:px-6 py-4">Time</th>
                                                    <th className="px-4 md:px-6 py-4">Pet Name</th>
                                                    <th className="px-4 md:px-6 py-4 hidden sm:table-cell">Owner</th>
                                                    <th className="px-4 md:px-6 py-4">Status</th>
                                                    <th className="px-4 md:px-6 py-4 text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-outline-variant/5">
                                                {appointments.map((appt, index) => (
                                                    <tr
                                                        key={appt.pet}
                                                        className={`hover:bg-surface-container-highest/30 transition-colors group ${mounted ? styles.fadeInUp : 'opacity-0'}`}
                                                        style={{ animationDelay: `${(index + 5) * 100}ms` }}
                                                    >
                                                        <td className="px-4 md:px-6 py-5 font-bold text-primary text-sm whitespace-nowrap">{appt.time}</td>
                                                        <td className="px-4 md:px-6 py-5">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container flex-shrink-0">
                                                                    <img className="w-full h-full object-cover" src={appt.img} alt={appt.pet} />
                                                                </div>
                                                                <span className="font-bold text-on-surface text-sm">{appt.pet}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 md:px-6 py-5 text-sm text-on-surface-variant hidden sm:table-cell">{appt.owner}</td>
                                                        <td className="px-4 md:px-6 py-5">
                                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusClasses(appt.statusType)}`}>
                                                                {appt.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 md:px-6 py-5 text-right">
                                                            <button className="p-2 hover:bg-primary/10 text-primary rounded-full transition-colors">
                                                                <span className="material-symbols-outlined text-xl">visibility</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="p-4 bg-surface-container-low text-center">
                                        <button className="text-xs font-bold text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors">
                                            Load more appointments
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Side Section (1/3) */}
                            <aside className="space-y-8">
                                {/* Quick Actions Section */}
                                <div className={`space-y-4 ${mounted ? styles.fadeInUp : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
                                    <h3 className="text-lg font-bold text-on-surface px-1">Quick Actions</h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        {quickActions.map((action) => (
                                            <button
                                                key={action.label}
                                                className={`group flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant/10 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 shadow-sm ${styles.quickActionBtn}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-primary-container group-hover:bg-white/20 flex items-center justify-center text-primary group-hover:text-white transition-colors">
                                                        <span className="material-symbols-outlined">{action.icon}</span>
                                                    </div>
                                                    <span className="font-bold text-sm">{action.label}</span>
                                                </div>
                                                <span className="material-symbols-outlined text-xl opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                                                    chevron_right
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Specialized Banner */}
                                <div className={`relative overflow-hidden rounded-lg aspect-[4/5] shadow-xl ${mounted ? styles.fadeInUp : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
                                    <img
                                        className="absolute inset-0 w-full h-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuzjvykVj_AgqBxYh_NJLtHU8WJaoaQxzlh479GIw8PKIv7Fk1XrR8RvFMfDb2WRZApUIByL3CFgs4rT_jbYWVZBiKBhIKsPGZkESyjk2uPSZsf1at2ye7xlOCTsNXe1GGr3uf8ILyC6aC2x_6CV6gcdLc3dQsEt5FSh2cj4dnlu57wDyFdnOMVMlUA8poLjfIVDws-s09TnGlQ5xspmjfI4cTQobTravOxNuWvdeBeG8_0bpVOHAe"
                                        alt="Modern veterinary clinic sanctuary"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 space-y-2">
                                        <h4 className="text-white font-bold text-xl leading-tight">Patient Sanctuary Guidelines</h4>
                                        <p className="text-white/80 text-xs">Maintain our tactile excellence through personalized care for every pet.</p>
                                        <button className="mt-4 w-full py-2 bg-white text-on-surface rounded-full text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all active:scale-95 transform">
                                            Read Protocol
                                        </button>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>

                    {/* Footer Spacing */}
                    <footer className="h-20" />
                </main>
            </div>

            {/* BOTTOM NAVBAR (Mobile) */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-container-lowest glass-nav flex items-center justify-around px-2 z-50 pb-safe">
                <button className="flex flex-col items-center justify-center gap-1 text-primary">
                    <span className={`${styles.iconFilled} material-symbols-outlined`}>dashboard</span>
                    <span className="text-[10px] font-bold">Dash</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1 text-on-surface-variant">
                    <span className="material-symbols-outlined">calendar_today</span>
                    <span className="text-[10px] font-bold">Appts</span>
                </button>
                <div className="relative -top-4">
                    <button className="w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform hover:scale-105">
                        <span className="material-symbols-outlined text-3xl">add</span>
                    </button>
                </div>
                <button className="flex flex-col items-center justify-center gap-1 text-on-surface-variant">
                    <span className="material-symbols-outlined">pets</span>
                    <span className="text-[10px] font-bold">Pets</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1 text-on-surface-variant">
                    <span className="material-symbols-outlined">person</span>
                    <span className="text-[10px] font-bold">Profile</span>
                </button>
            </nav>

            {/* Large Desktop FAB */}
            <button className="hidden md:flex fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-primary to-primary-dim text-white rounded-full shadow-2xl items-center justify-center hover:scale-105 active:scale-95 transition-all z-40">
                <span className="material-symbols-outlined text-3xl">person_add</span>
            </button>
        </div>
    );
};

export default VetDashboard;