import React, { useState } from 'react';
import styles from './AppointmentManagement.module.css';

const AppointmentManagement = () => {
    const [activeTab, setActiveTab] = useState('confirmed');
    const [hoveredRow, setHoveredRow] = useState(null);

    const appointments = [
        {
            id: 1,
            petName: 'Luna',
            petImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZae9t0u-bVl9cYMehn4smp19-XA9CJxg4AW-s9y2s-PqRirOvnDyWa8l5oQqeazGW8mQVcW6ZL3_38vnTNWyk2FRCleZKlpcW8DztLvZT9R72dmYN3TWHCCwiZ1NP0SmMXVNoYZiVpKbrDzatMt6RsSE5R5QGxsNgyyzKGAzWpxT2RhmjZmAdsJOSg3ryWWHnF_tSHGe1aUxX0hasLLsi0gbD8-mADdUgKR2KikpBTwf_ECUbeM3A',
            owner: 'Marcus Chen',
            date: 'Oct 24, 2023',
            time: '09:30 AM',
            reason: 'Annual Checkup',
            reasonColor: 'primary',
            status: 'Confirmed',
            statusType: 'confirmed'
        },
        {
            id: 2,
            petName: 'Oliver',
            petImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxk-7fjXsRNqTyc27X3-p1m2g2uY2VWClaVCckFUMohwUWoBd9B2AwFklQLsdHDWgNCOIjUGfUsy6XfOTeC-4Pk-xUjZ7goAtOaD04H1Xr6knm1t5rMQR-2Gz6uazLLFbQLNRlLyGnyIV4g6oZ7f_ur-rbmSr0UmSCPmR8LRlPcM5B1DxR-ADnq-lE8_dm_wYocV5qWPkO6Bufh52lbIVHTwCwaIs6nUvN_JNRIGrne2h_-ijo77nu',
            owner: 'Sophia Reynolds',
            date: 'Oct 24, 2023',
            time: '11:00 AM',
            reason: 'Urgent Care',
            reasonColor: 'error',
            status: 'Confirmed',
            statusType: 'confirmed'
        },
        {
            id: 3,
            petName: 'Buster',
            petImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfujxhSaI0H5Ia_FxVbi-swiODxYrtcjDBAb4MjssicFEiexfcjYj2-iGmEShqT75a36v9OhKiqYY7KE91YnvYTWUIDEQlNLVZED5YVnG4fwo253gW8aQYkfZtOa_297w11CqeqePaWFs07QDquyAw0_eCM2IUBsesFuZIyKyno7eUKrb8PAZpnj7FzBlJm7sQGll35_-mkXCt-ss8OjuqBOU-4yJxRaJiMcVSEBaej7GS423pFgww',
            owner: 'David Wilson',
            date: 'Oct 24, 2023',
            time: '01:45 PM',
            reason: 'Vaccination',
            reasonColor: 'tertiary',
            status: 'Arrived',
            statusType: 'arrived'
        },
        {
            id: 4,
            petName: 'Mochi',
            petImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2_R2wDm5WVeE1Z9S5TELD9qHn3l4i1U1JkFdaMFSKXVYVDdStZFbOQ7gZlQpDjhtnZ5vrkUvrx3WmDyKqDR4roLhSFOJosQutZsnEYhFvmE2prtJKeoQFw_iDZDO2XdmMTBlgHimtSG2Y00BBYSd2wf7V7H0YlZpPq5HpNc2hYuwxPC1q2GX-JQFiaUO7pZjygoUvbfOxg4QVFwA7Z4aCFGFllJfnwsQGwYvz_ZaEa_ENwZYRXlf_',
            owner: 'Elena Rodriguez',
            date: 'Oct 24, 2023',
            time: '03:15 PM',
            reason: 'Dental Cleaning',
            reasonColor: 'primary',
            status: 'Confirmed',
            statusType: 'confirmed'
        }
    ];

    const tabs = [
        { id: 'confirmed', label: 'Confirmed (24)' },
        { id: 'pending', label: 'Pending (8)' },
        { id: 'completed', label: 'Completed' },
        { id: 'cancelled', label: 'Cancelled' }
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case 'Confirmed':
                return styles.statusConfirmed;
            case 'Arrived':
                return styles.statusArrived;
            default:
                return styles.statusConfirmed;
        }
    };

    const getReasonColorClass = (color) => {
        switch (color) {
            case 'primary':
                return styles.reasonPrimary;
            case 'error':
                return styles.reasonError;
            case 'tertiary':
                return styles.reasonTertiary;
            default:
                return styles.reasonPrimary;
        }
    };

    return (
        <div className={styles.container}>
            {/* SideNavBar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logoIcon}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                            pets
                        </span>
                    </div>
                    <div>
                        <h1 className={styles.logoText}>PetCare Plus</h1>
                        <p className={styles.logoSubtext}>Veterinary Clinic</p>
                    </div>
                </div>
                <nav className={styles.nav}>
                    <a className={styles.navItem} href="#">
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className={styles.navLabel}>Dashboard</span>
                    </a>
                    <a className={`${styles.navItem} ${styles.navItemActive}`} href="#">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                            calendar_today
                        </span>
                        <span className={styles.navLabel}>Appointments</span>
                    </a>
                    <a className={styles.navItem} href="#">
                        <span className="material-symbols-outlined">pets</span>
                        <span className={styles.navLabel}>Patients</span>
                    </a>
                    <a className={styles.navItem} href="#">
                        <span className="material-symbols-outlined">description</span>
                        <span className={styles.navLabel}>Records</span>
                    </a>
                </nav>
                <div className={styles.sidebarFooter}>
                    <button className={styles.newAppointmentBtn}>
                        <span className="material-symbols-outlined">add</span>
                        New Appointment
                    </button>
                    <a className={styles.footerItem} href="#">
                        <span className="material-symbols-outlined">help</span>
                        <span className={styles.navLabel}>Help Center</span>
                    </a>
                    <a className={styles.footerItem} href="#">
                        <span className="material-symbols-outlined" style={{ color: '#a83836' }}>logout</span>
                        <span className={styles.navLabel}>Logout</span>
                    </a>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {/* TopNavBar */}
                <header className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div className={styles.searchContainer}>
                            <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#5e5f5d', fontSize: '14px' }}>
                                search
                            </span>
                            <input
                                className={styles.searchInput}
                                placeholder="Search appointments, pets, or owners..."
                                type="text"
                            />
                        </div>
                    </div>
                    <div className={styles.headerRight}>
                        <div className={styles.headerActions}>
                            <button className={styles.iconButton}>
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <button className={styles.iconButton}>
                                <span className="material-symbols-outlined">settings</span>
                            </button>
                        </div>
                        <div className={styles.userProfile}>
                            <div className={styles.userInfo}>
                                <p className={styles.userName}>Dr. Sarah Mitchell</p>
                                <p className={styles.userRole}>Lead Veterinarian</p>
                            </div>
                            <img
                                className={styles.userAvatar}
                                alt="Dr. Sarah Mitchell"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1eFrOPSbiY96XVuzZE1gFujFssfKxp1ReBffiGTh3IP19isVygxGc7Nc5Z6ef-D18JTOmKfaGb_mVusBBSkmukUbj-i7AgJ-Ecgrw6ZigEq2vFNq9yJG-a490pYseinjoYvMGS4XkJoRoUMjSyrNWUhO7uXooOchywS0PJTxeDtSEOwGGlL1TIy36b-slQoP29GXwKtvgz-rEBOyDDEp4F9BRc6EEx-avp4_uVYQxmKmqQzWKmaeh"
                            />
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className={styles.contentArea}>
                    <div className={styles.pageHeader}>
                        <div>
                            <h2 className={styles.pageTitle}>Appointment Management</h2>
                            <p className={styles.pageSubtitle}>Review and manage your daily veterinary schedule.</p>
                        </div>
                        <div className={styles.viewToggle}>
                            <button className={`${styles.viewBtn} ${styles.viewBtnActive}`}>List View</button>
                            <button className={styles.viewBtn}>Calendar View</button>
                        </div>
                    </div>

                    {/* Filters Section */}
                    <div className={styles.filtersSection}>
                        <div className={styles.tabsContainer}>
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabActive : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                    {activeTab === tab.id && <div className={styles.tabIndicator}></div>}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Appointments Table */}
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr className={styles.tableHeader}>
                                    <th className={styles.tableHeaderCell}>Pet & Owner</th>
                                    <th className={styles.tableHeaderCell}>Schedule</th>
                                    <th className={styles.tableHeaderCell}>Reason</th>
                                    <th className={styles.tableHeaderCell}>Status</th>
                                    <th className={`${styles.tableHeaderCell} ${styles.tableHeaderCellRight}`}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appointment) => (
                                    <tr
                                        key={appointment.id}
                                        className={`${styles.tableRow} ${hoveredRow === appointment.id ? styles.tableRowHover : ''}`}
                                        onMouseEnter={() => setHoveredRow(appointment.id)}
                                        onMouseLeave={() => setHoveredRow(null)}
                                    >
                                        <td className={styles.tableCell}>
                                            <div className={styles.petInfo}>
                                                <img className={styles.petAvatar} alt={appointment.petName} src={appointment.petImage} />
                                                <div>
                                                    <p className={styles.petName}>{appointment.petName}</p>
                                                    <p className={styles.petOwner}>Owner: {appointment.owner}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={styles.tableCell}>
                                            <div className={styles.scheduleInfo}>
                                                <span className={styles.scheduleDate}>{appointment.date}</span>
                                                <span className={styles.scheduleTime}>{appointment.time}</span>
                                            </div>
                                        </td>
                                        <td className={styles.tableCell}>
                                            <div className={styles.reasonContainer}>
                                                <span className={`${styles.reasonDot} ${getReasonColorClass(appointment.reasonColor)}`}></span>
                                                <span className={styles.reasonText}>{appointment.reason}</span>
                                            </div>
                                        </td>
                                        <td className={styles.tableCell}>
                                            <span className={`${styles.statusBadge} ${getStatusClass(appointment.status)}`}>
                                                {appointment.status}
                                            </span>
                                        </td>
                                        <td className={`${styles.tableCell} ${styles.tableCellRight}`}>
                                            <div className={`${styles.actionButtons} ${hoveredRow === appointment.id ? styles.actionButtonsVisible : ''}`}>
                                                <button className={styles.actionBtn} title="View Details">
                                                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>visibility</span>
                                                </button>
                                                <button className={`${styles.actionBtn} ${styles.actionBtnComplete}`} title="Mark Completed">
                                                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check_circle</span>
                                                </button>
                                                <button className={`${styles.actionBtn} ${styles.actionBtnCancel}`} title="Cancel">
                                                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className={styles.pagination}>
                            <p className={styles.paginationText}>
                                Showing <span className={styles.paginationHighlight}>1-4</span> of <span className={styles.paginationHighlight}>24</span> appointments
                            </p>
                            <div className={styles.paginationControls}>
                                <button className={styles.paginationBtn}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>chevron_left</span>
                                </button>
                                <button className={`${styles.paginationBtn} ${styles.paginationBtnActive}`}>1</button>
                                <button className={styles.paginationBtn}>2</button>
                                <button className={styles.paginationBtn}>3</button>
                                <button className={styles.paginationBtn}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AppointmentManagement;