// pages/edit-vet-visit.js
"use client"
import Head from 'next/head';
import styles from './EditVetVisit.module.css';
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import Loader from '@/components/Loader';
import ProtectedRoutes from '@/auth/ProtectedRoutes';
import { updateVetVisit } from '@/apiServices/visits.api';

export default function EditVetVisit() {
    const formRef = useRef(null);
    const router = useRouter()

    const { petId, visitId } = useParams();
    const { user, refreshUser } = useAuth()

    const [loadingData, setLoadingData] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [pet, setPet] = useState(null)

    const [formData, setFormData] = useState({
        visit_id: visitId,
        vet_name: '',
        visit_date: '',
        reason: '',
        note: ''
    })

    useEffect(() => {
        if (!user) return;
        setLoadingData(true);

        const pet = user.pets.find(pet => pet.id == petId)
        if (pet) {
            setPet(pet)
            const report = pet.vet_visits?.find(visit => visit.id == visitId)
            if (report) {
                setFormData({
                    visit_id: visitId,
                    vet_name: report.vet_name || '',
                    visit_date: report.visit_date || '',
                    reason: report.reason || '',
                    note: report.note || ''
                })
            }
        }
        setLoadingData(false)
    }, [user, visitId]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        setIsSubmitting(true)
        e.preventDefault();

        const res = await updateVetVisit(petId, formData)
        if (res) {
            refreshUser();
            router.push(`/user/me/pets/${petId}`)
        } else {
            alert("Updating failed")
        }
        setIsSubmitting(false)
    };

    if (loadingData) {
        return <Loader />
    }

    return (
        <ProtectedRoutes>
            <>
                (<Head>
                    <title>Edit Vet Visit | PetCare+</title>
                    <meta name="description" content="Refine the details of your pet's medical history" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Be+Vietnam+Pro:ital,wght@0,100..900;1,100..900&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                        rel="stylesheet"
                    />
                </Head>

                <main className={styles.main}>
                    {/* Breadcrumb */}
                    <div className={styles.breadcrumb}>
                        <a className={styles.breadcrumbLink} href="#">Health Records</a>
                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
                            chevron_right
                        </span>
                        <span className={styles.breadcrumbCurrent}>Edit Visit</span>
                    </div>

                    {/* Hero */}
                    <header className={styles.hero}>
                        <h1 className={styles.heroTitle}>Edit Vet Visit</h1>
                        <p className={styles.heroSubtitle}>
                            Refine the details of your pet's medical history to track treatment patterns.
                        </p>
                    </header>

                    {/* Form Layout */}
                    <div className={styles.layout}>
                        <div className={styles.formContainer}>
                            <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
                                {/* Vet Name */}
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel} htmlFor="vet_name">Vet Name</label>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            className={styles.formInput}
                                            id="vet_name"
                                            placeholder="Enter veterinarian name"
                                            type="text"
                                            value={formData.vet_name}
                                            onChange={handleChange}
                                        />
                                        <span className={`material-symbols-outlined ${styles.inputIcon}`}>
                                            medical_services
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.row}>
                                    {/* Visit Date */}
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel} htmlFor="visit_date">Visit Date</label>
                                        <div className={styles.inputWrapper}>
                                            <input
                                                className={styles.formInput}
                                                id="visit_date"
                                                type="date"
                                                value={formData.visit_date}
                                                onChange={handleChange}
                                            />
                                            <span className={`material-symbols-outlined ${styles.inputIcon}`}>
                                                calendar_today
                                            </span>
                                        </div>
                                    </div>

                                    {/* Reason for Visit */}
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel} htmlFor="reason">Reason for Visit</label>
                                        <div className={styles.inputWrapper}>
                                            <select
                                                className={styles.formSelect}
                                                id="reason"
                                                value={formData.reason}
                                                onChange={handleChange}
                                            >
                                                <option value="routine">Routine Wellness Check</option>
                                                <option value="vaccination">Vaccination</option>
                                                <option value="illness">Sudden Illness</option>
                                                <option value="injury">Injury / Trauma</option>
                                                <option value="followup">Follow-up Visit</option>
                                                <option value="dental">Dental Cleaning</option>
                                            </select>
                                            <span className={`material-symbols-outlined ${styles.selectIcon}`}>
                                                expand_more
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Clinical note */}
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel} htmlFor="note">Clinical note</label>
                                    <textarea
                                        className={styles.formTextarea}
                                        id="note"
                                        placeholder="Add detailed clinical observations..."
                                        rows="6"
                                        value={formData.note}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Actions */}
                                <div className={styles.actions}>
                                    <button className={styles.submitBtn} type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                                        {isSubmitting ? "Saving changes..." : "Save Changes"}
                                    </button>
                                    <button className={styles.cancelBtn} type="button" onClick={() => router.back()}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Sidebar */}
                        <aside className={styles.sidebar}>
                            <div className={styles.statusCard}>
                                <div className={styles.statusHeader}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>
                                        info
                                    </span>
                                    <h3 className={styles.statusTitle}>Current Status</h3>
                                </div>
                                <p className={styles.statusText}>
                                    This record is currently linked to <span className={styles.statusHighlight}>{pet.name}'s Core Profile</span>.
                                </p>
                            </div>

                            <div className={styles.petCard}>
                                <img
                                    alt="Pet profile"
                                    className={styles.petImage}
                                    src={pet.image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuBwaYBsuw4aiCxOIRVN4RJrKYQukjglNyFyql29iaUh4nkuVuUn9B8YtTjfG_CUVClEJcD8_xVXt5NQVF8oaMLOBjQ-7YtCP1Pi7cyPcQmzSLRZlOm_kU36f0fpxcds0VWRw13uq9WMOZS-_0Rh3ACD46-RPI-aJK6XRBqe6b2l9yB7AY-tMoXB1DKO85WKAv6YMZ-GNxFM-eOMrMxK5cTmT1iCOIGzUZDMMDn4KRcgs2aiRP0rxeCSbuKFfGlS99_m_U8ntw8B6HE"}
                                />
                                <div className={styles.petOverlay}>
                                    <p className={styles.petLabel}>Patient</p>
                                    <h4 className={styles.petName}>{pet.name}</h4>
                                </div>
                            </div>
                        </aside>
                    </div>
                </main>)
            </>
        </ProtectedRoutes>
    );
}