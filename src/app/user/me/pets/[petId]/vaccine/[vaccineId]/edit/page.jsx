"use client"
import React, { useState, useEffect } from 'react';
import styles from './EditVaccinePage.module.css';
import { useAuth } from '@/auth/AuthProvider';
import { useParams, useRouter } from 'next/navigation';
import { editVaccine } from '@/apiServices/vaccine.api';

const EditVaccinePage = () => {

    const router = useRouter()

    const [formData, setFormData] = useState({
        vaccineName: '',
        vaccineDate: '',
        dueDate: '',
        vetName: '',
        notes: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { petId, vaccineId } = useParams();
    const { user } = useAuth();

    useEffect(() => {
        // Only run if user is loaded and has pets
        if (!user || !user.pets) {
            return;
        }

        try {
            const pet = user.pets.find(pet => pet.id == petId);
            if (pet) {
                const vax = pet.vaccinations.find(vax => vax.id == vaccineId);
                if (vax) {
                    setFormData({
                        vaccineName: vax.vaccineName || '',
                        vaccineDate: vax.vaccineDate || '',
                        dueDate: vax.dueDate || '',
                        vetName: vax.vetName || '',
                        notes: vax.notes || ''
                    });
                } else {
                    setError('Vaccination record not found');
                }
            } else {
                setError('Pet not found');
            }
        } catch (err) {
            setError('Error loading vaccination data');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    }, [user, petId, vaccineId]); // Added all dependencies

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setIsSaved(false);

        try {
            const res = await editVaccine(vaccineId, formData);

            setIsSaved(true);
            setTimeout(() => {
                setIsSaved(false);
            }, 2000);
            router.push(`/user/me/pets/${petId}`);
            alert("Vaccine Updated Successfully!");
        } catch (error) {
            console.error('Error saving vaccine:', error);
            setError('Failed to save vaccination record');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        // Navigate back or reset form
        console.log('Cancel clicked');
        window.history.back();
    };

    const handleBack = () => {
        // Navigate back
        console.log('Back clicked');
        window.history.back();
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className={styles.container}>
                <main className={styles.main}>
                    <div className={styles.loadingContainer}>
                        <span className="material-symbols-outlined animate-spin">sync</span>
                        <p>Loading vaccination record...</p>
                    </div>
                </main>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className={styles.container}>
                <main className={styles.main}>
                    <div className={styles.errorContainer}>
                        <span className="material-symbols-outlined">error</span>
                        <p>{error}</p>
                        <button
                            className={styles.errorButton}
                            onClick={handleBack}
                        >
                            Go Back
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Top Navigation */}
            <nav className={styles.nav}>
                {/* Navigation content */}
            </nav>

            <main className={styles.main}>
                {/* Header Section */}
                <header className={styles.header}>
                    <div className={styles.headerTop}>
                        <button
                            aria-label="Go back"
                            className={styles.backButton}
                            onClick={handleBack}
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <span className={styles.headerBadge}>Medical History</span>
                    </div>
                    <h1 className={styles.title}>
                        Edit Vaccination Record
                    </h1>
                    <p className={styles.subtitle}>
                        Updating your pet's vaccine records helps maintain their long-term health sanctuary.
                    </p>
                </header>

                {/* Form Card */}
                <div className={styles.formCard}>
                    <div className={styles.decorativeGradient}></div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        {/* Vaccine Name */}
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="vaccineName">
                                Vaccine Name
                            </label>
                            <div className={styles.inputWrapper}>
                                <input
                                    className={styles.input}
                                    id="vaccineName"
                                    type="text"
                                    placeholder="e.g. DHPP"
                                    value={formData.vaccineName}
                                    onChange={handleInputChange}
                                    required
                                />
                                <span className={`material-symbols-outlined ${styles.inputIcon}`}>
                                    vaccines
                                </span>
                            </div>
                        </div>

                        {/* Dual Column Layout for Dates */}
                        <div className={styles.dateGrid}>
                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor="vaccineDate">
                                    Date Administered
                                </label>
                                <div className={styles.inputWrapper}>
                                    <input
                                        className={styles.input}
                                        id="vaccineDate"
                                        type="date"
                                        value={formData.vaccineDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor="dueDate">
                                    Next Due Date
                                </label>
                                <div className={styles.inputWrapper}>
                                    <input
                                        className={styles.input}
                                        id="dueDate"
                                        type="date"
                                        value={formData.dueDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Vet Name / Clinic */}
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="vetName">
                                Vet Name / Clinic
                            </label>
                            <div className={styles.inputWrapper}>
                                <input
                                    className={styles.input}
                                    id="vetName"
                                    type="text"
                                    placeholder="Central Veterinary Hospital"
                                    value={formData.vetName}
                                    onChange={handleInputChange}
                                />
                                <span className={`material-symbols-outlined ${styles.inputIcon}`}>
                                    medical_services
                                </span>
                            </div>
                        </div>

                        {/* Remarks */}
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="notes">
                                Remarks
                            </label>
                            <div className={styles.inputWrapper}>
                                <textarea
                                    className={styles.textarea}
                                    id="notes"
                                    placeholder="Add any side effects or notes here..."
                                    rows="4"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className={styles.actions}>
                            <button
                                className={styles.cancelButton}
                                type="button"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className={`${styles.submitButton} ${isSaved ? styles.saved : ''}`}
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin">sync</span>
                                        <span>Saving...</span>
                                    </>
                                ) : isSaved ? (
                                    <>
                                        <span className="material-symbols-outlined">verified</span>
                                        <span>Saved Successfully</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Save Record</span>
                                        <span className="material-symbols-outlined">check_circle</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Supportive Info Cards */}
                <div className={styles.infoGrid}>
                    <div className={`${styles.infoCard} ${styles.tipCard}`}>
                        <span className="material-symbols-outlined">lightbulb</span>
                        <div>
                            <h4 className={styles.infoTitle}>Pro Tip</h4>
                            <p className={styles.infoText}>
                                Most clinics provide a digital certificate. Attach a photo in the 'Remarks' for faster travel clearance.
                            </p>
                        </div>
                    </div>
                    <div className={`${styles.infoCard} ${styles.reminderCard}`}>
                        <span className="material-symbols-outlined">notifications_active</span>
                        <div>
                            <h4 className={styles.infoTitle}>Smart Reminders</h4>
                            <p className={styles.infoText}>
                                PetCare+ will automatically notify you 30 days before the Next Due Date.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className={styles.footer}>
                {/* Footer content */}
            </footer>
        </div>
    );
};

export default EditVaccinePage;