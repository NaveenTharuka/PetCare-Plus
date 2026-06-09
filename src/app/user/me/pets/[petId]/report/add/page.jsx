// app/vaccines/page.jsx
'use client';

import React, { useState, useCallback, useRef } from 'react';
import styles from './vaccines.module.css';
import { uploadReport } from '@/apiServices/reports.api';
import { useParams } from 'next/navigation';
import ProtectedRoutes from '@/auth/ProtectedRoutes';

export default function VaccinesPage() {

    const params = useParams();
    const { petId } = params;

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Blood Work');
    const [reportDate, setReportDate] = useState('2025-03-15');
    const [selectedFile, setSelectedFile] = useState(null);
    const [formMessage, setFormMessage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const dropZoneRef = useRef(null);

    const processFile = useCallback((file) => {
        const maxSize = 10 * 1024 * 1024; // 10MB
        const ext = file.name.split('.').pop()?.toLowerCase();

        if (!['pdf', 'jpg', 'jpeg', 'png'].includes(ext || '')) {
            setFormMessage({ text: '❌ Format not supported. Use PDF, JPG, JPEG, or PNG.', type: 'error' });
            setTimeout(() => setFormMessage(null), 2500);
            return false;
        }

        if (file.size > maxSize) {
            setFormMessage({ text: `❌ ${file.name} exceeds 10MB limit`, type: 'error' });
            setTimeout(() => setFormMessage(null), 2500);
            return false;
        }

        return true;
    }, []);

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (processFile(file)) {
                setSelectedFile(file);
            }
        }
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZoneRef.current?.classList.remove(styles.dragOver);

        const file = e.dataTransfer.files[0];
        if (file && processFile(file)) {
            setSelectedFile(file);
        }
    }, [processFile]);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZoneRef.current?.classList.add(styles.dragOver);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZoneRef.current?.classList.remove(styles.dragOver);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setFormMessage({ text: '❌ Please enter a report title.', type: 'error' });
            setTimeout(() => setFormMessage(null), 2800);
            return;
        }

        if (!reportDate) {
            setFormMessage({ text: '❌ Please select a valid report date.', type: 'error' });
            setTimeout(() => setFormMessage(null), 2500);
            return;
        }

        if (!selectedFile) {
            setFormMessage({ text: '❌ Please select a file to upload.', type: 'error' });
            setTimeout(() => setFormMessage(null), 2500);
            return;
        }

        setIsUploading(true);

        try {
            const res = await uploadReport(petId, title, selectedFile);

            if (res.status === 200 || res.status === 201) {
                const successMsg = `✓ "${title}" saved (${category}) · ${selectedFile.name}. Records added to sanctuary.`;
                setFormMessage({ text: successMsg, type: 'success' });

                // Reset form
                setTitle('');
                setSelectedFile(null);
                // Keep reportDate and category as is
            }
        } catch (error) {
            setFormMessage({ text: '❌ Error uploading report. Please try again.', type: 'error' });
        } finally {
            setIsUploading(false);
            setTimeout(() => setFormMessage(null), 4500);
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
        setFormMessage({ text: 'File cleared.', type: 'success' });
        setTimeout(() => setFormMessage(null), 1800);
    };

    return (
        <ProtectedRoutes>
            <div className={styles.container}>
                <main className={styles.main}>
                    <div className={styles.hero}>
                        <h1 className={styles.title}>
                            Preserve their <span className={styles.titleAccent}>wellness journey.</span>
                        </h1>
                        <p className={styles.subtitle}>
                            Add clinical reports, vaccination records, or lab results to your pet's digital sanctuary.
                            We organize everything with care.
                        </p>
                    </div>

                    <div className={styles.grid}>
                        {/* Left Column */}
                        <div className={styles.leftColumn}>
                            <div
                                ref={dropZoneRef}
                                className={styles.dropZone}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className={styles.dropZoneIcon}>
                                    <span className="material-symbols-outlined">cloud_upload</span>
                                </div>
                                <h3 className={styles.dropZoneTitle}>Drag medical file here</h3>
                                <p className={styles.dropZoneSubtitle}>PDF, JPEG, or PNG — max 10MB</p>
                                <label className={styles.browseButton}>
                                    Browse Files
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={handleFileSelect}
                                        className={styles.hiddenInput}
                                    />
                                </label>
                                {selectedFile && (
                                    <div className={styles.filesBadge}>
                                        <span className="material-symbols-outlined">check_circle</span>
                                        <span>{selectedFile.name}</span>
                                        <button onClick={(e) => { e.stopPropagation(); clearFile(); }} className={styles.clearButton}>
                                            Clear
                                        </button>
                                    </div>
                                )}
                                <div className={styles.patternOverlay} />
                            </div>

                            <div className={styles.guidelinesCard}>
                                <div className={styles.guidelinesHeader}>
                                    <div>
                                        <h4 className={styles.guidelinesTitle}>Upload Guidelines</h4>
                                        <p className={styles.guidelinesSubtitle}>Follow these tips for smooth processing.</p>
                                    </div>
                                    <span className="material-symbols-outlined">info</span>
                                </div>
                                <div className={styles.guidelinesGrid}>
                                    <div className={styles.guidelineItem}>
                                        <div className={styles.guidelineIcon}>
                                            <span className="material-symbols-outlined">visibility</span>
                                        </div>
                                        <p className={styles.guidelineText}>Clear, legible scans or photos</p>
                                    </div>
                                    <div className={styles.guidelineItem}>
                                        <div className={styles.guidelineIcon}>
                                            <span className="material-symbols-outlined">description</span>
                                        </div>
                                        <p className={styles.guidelineText}>PDF, JPG, PNG formats</p>
                                    </div>
                                    <div className={styles.guidelineItem}>
                                        <div className={styles.guidelineIcon}>
                                            <span className="material-symbols-outlined">hard_drive</span>
                                        </div>
                                        <p className={styles.guidelineText}>Max file size: 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <aside className={styles.rightColumn}>
                            <div className={styles.formCard}>
                                <h2 className={styles.formTitle}>
                                    <span className="material-symbols-outlined">clinical_notes</span>
                                    Report Details
                                </h2>
                                <form onSubmit={handleSubmit} className={styles.form}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>
                                            Report Title <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            placeholder="e.g., Annual Check-up, Blood Panel"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            disabled={isUploading}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Category</label>
                                        <select className={styles.select} value={category} onChange={(e) => setCategory(e.target.value)} disabled={isUploading}>
                                            <option>Blood Work</option>
                                            <option>X-Ray / Imaging</option>
                                            <option>Lab Results</option>
                                            <option>Vaccination Record</option>
                                            <option>Prescription</option>
                                            <option>Clinical Notes</option>
                                        </select>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Report Date</label>
                                        <input
                                            type="date"
                                            className={styles.input}
                                            value={reportDate}
                                            onChange={(e) => setReportDate(e.target.value)}
                                            disabled={isUploading}
                                        />
                                    </div>
                                    <button type="submit" className={styles.submitButton} disabled={isUploading}>
                                        <span className="material-symbols-outlined">
                                            {isUploading ? 'hourglass_empty' : 'save'}
                                        </span>
                                        {isUploading ? 'Uploading...' : 'Save to Health Records'}
                                    </button>

                                    {formMessage && (
                                        <div className={`${styles.formMessage} ${formMessage.type === 'success' ? styles.successMessage : styles.errorMessage}`}>
                                            {formMessage.text}
                                        </div>
                                    )}
                                    <div className={styles.securityNote}>
                                        <span className="material-symbols-outlined">verified_user</span>
                                        <p className={styles.securityText}>
                                            Your files are encrypted and accessible only by you and verified veterinarians you choose to share with.
                                        </p>
                                    </div>
                                </form>
                            </div>

                            <div className={styles.imageCard}>
                                <img
                                    className={styles.serenImage}
                                    alt="Golden retriever resting in warm sunlight"
                                    src="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                    onError={(e) => {
                                        e.target.src = 'https://images.pexels.com/photos/4588050/close-up-of-golden-retriever-dog-lying-on-grass-4588050.jpg?auto=compress&cs=tinysrgb&w=600';
                                    }}
                                />
                                <div className={styles.imageOverlay}>
                                    <p className={styles.imageCaption}>keeping memories healthy</p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </main>
            </div>
        </ProtectedRoutes>
    );
}