// VaccineFormPage.jsx
"use client"
import React, { useState } from 'react';
import styles from './VaccineFormPage.module.css';
import { useParams } from 'next/navigation';
import { addVaccine } from '@/apiServices/vaccine.api';

const VaccineFormPage = () => {
    const params = useParams();
    const { petId } = params;

    const [formData, setFormData] = useState({
        pet_id: petId,
        vaccineName: '',
        vaccineDate: '',
        dueDate: '',
        vetName: '',
        notes: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const res = await addVaccine(formData);

        setIsSubmitting(false);
        setSubmitSuccess(true);


        if (!res.status == 200) {
            window.alert("Error adding vaccine : ", res.message)
        } else {
            window.alert("Vaccine added successfully")

            setFormData({
                pet_id: petId,
                vaccineName: '',
                vaccineDate: '',
                dueDate: '',
                vetName: '',
                notes: ''
            });
        }

        setTimeout(() => {
            setSubmitSuccess(false);
        }, 2000);

    };

    const handleCancel = () => {
        // Handle cancel action (e.g., navigate back or reset form)
        setFormData({
            pet_id: petId,
            vaccineName: '',
            vaccineDate: '',
            dueDate: '',
            vetName: '',
            notes: ''
        });
    };

    return (
        <div className={styles.container}>
            {/* Main Content Canvas */}
            <main className={styles.main}>
                {/* Header Section */}
                <div className={styles.header}>
                    <h1 className={styles.title}>New Health Record</h1>
                    <p className={styles.subtitle}>
                        Add a vaccine to your pet's digital health sanctuary. Keeping records organized ensures a long, happy life together.
                    </p>
                </div>

                {/* Form Card */}
                <div className={styles.formCard}>
                    <div className={styles.formCardInner}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            {/* Vaccine Name */}
                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor="vaccine_name">
                                    Vaccine Name
                                </label>
                                <input
                                    className={styles.input}
                                    id="vaccineName"
                                    name="vaccineName"
                                    type="text"
                                    placeholder="e.g. DHPP (Distemper, Parvo)"
                                    value={formData.vaccineName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Dates Grid */}
                            <div className={styles.datesGrid}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label} htmlFor="date_administered">
                                        Date Administered
                                    </label>
                                    <input
                                        className={styles.input}
                                        id="vaccineDate"
                                        name="vaccineDate"
                                        type="date"
                                        value={formData.vaccineDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label} htmlFor="due_date">
                                        Next Due Date
                                    </label>
                                    <input
                                        className={styles.input}
                                        id="dueDate"
                                        name="dueDate"
                                        type="date"
                                        value={formData.dueDate}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Vet Name */}
                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor="vetName">
                                    Vet Name / Clinic
                                </label>
                                <div className={styles.inputWithIcon}>
                                    <span className={styles.inputIcon}>🏥</span>
                                    <input
                                        className={styles.inputIconField}
                                        id="vetName"
                                        name="vetName"
                                        type="text"
                                        placeholder="Dr. Sarah Mitchell or Pawprint Clinic"
                                        value={formData.vetName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Remarks */}
                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor="notes">
                                    Remarks
                                </label>
                                <textarea
                                    className={styles.textarea}
                                    id="notes"
                                    name="notes"
                                    placeholder="Any side effects or specific instructions for the next visit..."
                                    rows="4"
                                    value={formData.notes}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className={styles.buttonGroup}>
                                <button
                                    className={`${styles.submitButton} ${submitSuccess ? styles.submitButtonSuccess : ''} ${isSubmitting ? styles.submitButtonLoading : ''}`}
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className={styles.spinner}></span>
                                            Saving...
                                        </>
                                    ) : submitSuccess ? (
                                        <>
                                            <span>✓</span>
                                            Success!
                                        </>
                                    ) : (
                                        <>
                                            Save Record
                                        </>
                                    )}
                                </button>
                                <button
                                    className={styles.cancelButton}
                                    type="button"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Contextual Tip */}
                    <div className={styles.tip}>
                        <span className={styles.tipIcon}>💡</span>
                        <p className={styles.tipText}>
                            <strong>Tactile Tip:</strong> Uploading a photo of the physical vaccine certificate helps verify the record and provides a backup in case the physical copy is lost.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VaccineFormPage;