'use client';

import { useState } from 'react';
import styles from './ActionButton.module.css';

export default function ActionButton({ onAddReport, onAddVaccine }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.fabContainer}>
            {isOpen && (
                <>
                    <button
                        className={`${styles.fabOption} ${styles.fabReport}`}
                        onClick={() => {
                            setIsOpen(false);
                            onAddReport?.();
                        }}
                    >
                        <span className={`material-symbols-outlined ${styles.fabOptionIcon}`}>snippet_folder</span>
                        <span className={styles.fabOptionLabel}>Add Report</span>
                    </button>

                    <button
                        className={`${styles.fabOption} ${styles.fabVaccine}`}
                        onClick={() => {
                            setIsOpen(false);
                            onAddVaccine?.();
                        }}
                    >
                        <span className={`material-symbols-outlined ${styles.fabOptionIcon}`}>vaccines</span>
                        <span className={styles.fabOptionLabel}>Add Vaccine</span>
                    </button>
                </>
            )}

            <button
                className={`${styles.fabMain} ${isOpen ? styles.fabMainOpen : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`material-symbols-outlined ${styles.fabMainIcon}`}>
                    {isOpen ? 'close' : 'add'}
                </span>
            </button>
        </div>
    );
}