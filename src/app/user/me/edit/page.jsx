// app/edit-profile/page.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './edit.module.css';
import { useAuth } from '@/auth/AuthProvider';
import Loader from '@/components/Loader';
import { updateUser, uploadProfilePicture } from '@/apiServices/user.api';
import { useRouter } from 'next/navigation';
import ProtectedRoutes from '@/auth/ProtectedRoutes';

export default function EditProfilePage() {
    const { user, loading, refreshUser } = useAuth() // Add refreshUser if available

    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const [photoPreview, setPhotoPreview] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
    const [imageFile, setImageFile] = useState(null); // Store actual file, not base64
    const [saveSuccess, setSaveSuccess] = useState(false);
    const fileInputRef = useRef(null);

    // Update form data when user loads
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || ''
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif')) {
            if (file.size <= 5 * 1024 * 1024) {
                // Store the actual file for upload
                setImageFile(file);

                // Create preview
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPhotoPreview(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                alert('File size exceeds 5MB limit');
            }
        } else {
            alert('Please select a valid JPG, GIF, or PNG file');
        }
    };

    const uploadPhoto = async (userId, imageFile) => {
        if (!imageFile) return null;

        setIsUploadingPhoto(true);
        try {
            // Pass the raw File — uploadProfilePicture builds the FormData internally
            const res = await uploadProfilePicture(userId, imageFile);
            if (res) {
                console.log("Photo uploaded successfully");
                return res;
            } else {
                throw new Error("Upload failed");
            }
        } catch (error) {
            console.error("Error uploading photo:", error);
            alert("Failed to upload profile picture. Please try again.");
            return null;
        } finally {
            setIsUploadingPhoto(false);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            // Exclude email — it's managed by Supabase auth and rejected by the backend
            const { email: _email, ...updatePayload } = formData;
            // First update user details
            const updateResponse = await updateUser(user.id, updatePayload);

            if (updateResponse) {
                console.log("User details updated successfully");

                // Then upload photo if a new one was selected
                if (imageFile) {
                    const photoUploadResponse = await uploadPhoto(user.id, imageFile);
                    if (photoUploadResponse) {
                        console.log("Profile photo uploaded successfully");
                    }
                }

                setSaveSuccess(true);

                // Refresh user data in context if available
                if (refreshUser) {
                    await refreshUser();
                }

                setTimeout(() => {
                    setSaveSuccess(false);
                }, 2000);
                router.push(`/user/me`)
            } else {
                throw new Error("Failed to update user details");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            alert(error.message || "Failed to update profile. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || ''
            });
        }
        setPhotoPreview(null);
        setImageFile(null);
        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Show loader while checking authentication
    if (loading) {
        return <Loader />;
    }

    // Handle case where user is not authenticated
    if (!user) {
        return <div>Please log in to edit your profile</div>;
    }

    return (
        <ProtectedRoutes>
            <main className={styles.main}>
                {/* Header Section */}
                <header className={styles.header}>
                    <h1 className={styles.title}>Update Your Profile</h1>
                    <p className={styles.subtitle}>
                        Ensure your contact information is correct for notifications and health reports.
                    </p>
                </header>

                {/* Profile Edit Form */}
                <div className={styles.formGrid}>
                    {/* Left: Photo Upload (Bento Style Card) */}
                    <div className={styles.photoSection}>
                        <div className={styles.photoCard}>
                            <div className={styles.photoContainer}>
                                <img
                                    alt="Current Profile Photo"
                                    className={styles.profileImage}
                                    src={photoPreview || user?.image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuCDscPts8jRsi7fCff4abtbjM6oogGpgGy3qJZOU7itHrdjujYji_tLkdUNQxFrkZnPrnVaV1MclQKRiCwrN0Qclo3_bpvhzYZ6SmUwXdzQtUdJ8bKr-nZaOlym5jfBXXN6FZhOEBBXXnj0izits2yxZ4CUMkdxTtziooXvLcPa66Fk8lAstGtyIo0pojCPn_NEJonrMY6R3h22DajWwAF5Ry4UShGJfuShP1hrbQslu4egx0nKKQvR6zXokw3tQHIxNpyl_nyT-Jg"}
                                />
                                <button
                                    type="button"
                                    className={styles.photoOverlay}
                                    onClick={triggerFileInput}
                                    disabled={isUploadingPhoto}
                                >
                                    <span className="material-symbols-outlined">
                                        {isUploadingPhoto ? 'hourglass_empty' : 'photo_camera'}
                                    </span>
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/gif"
                                    onChange={handlePhotoUpload}
                                    style={{ display: 'none' }}
                                />
                            </div>
                            <h3 className={styles.photoTitle}>Profile Photo</h3>
                            <p className={styles.photoHint}>JPG, GIF or PNG. Max size 5MB</p>
                            <button
                                type="button"
                                className={styles.uploadButton}
                                onClick={triggerFileInput}
                                disabled={isUploadingPhoto}
                            >
                                {isUploadingPhoto ? 'Uploading...' : 'Upload New Photo'}
                            </button>
                        </div>
                    </div>

                    {/* Right: Account Details Form */}
                    <div className={styles.formSection}>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            {/* Full Name */}
                            <div className={styles.inputGroup}>
                                <label htmlFor="name" className={styles.label}>
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className={styles.input}
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Email Address */}
                            <div className={styles.inputGroup}>
                                <label htmlFor="email" className={styles.label}>
                                    Email Address
                                </label>
                                <input
                                    disabled
                                    id="email"
                                    type="email"
                                    className={styles.input}
                                    style={{
                                        backgroundColor: '#f5f5f5',
                                        color: '#9e9e9e',
                                        cursor: 'not-allowed'
                                    }}
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Phone Number */}
                            <div className={styles.inputGroup}>
                                <label htmlFor="phone" className={styles.label}>
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    className={styles.input}
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Address */}
                            <div className={styles.inputGroup}>
                                <label htmlFor="address" className={styles.label}>
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    rows="3"
                                    className={styles.textarea}
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className={styles.buttonGroup}>
                                <button
                                    type="submit"
                                    className={`${styles.saveButton} ${isSaving ? styles.saving : ''} ${saveSuccess ? styles.success : ''}`}
                                    disabled={isSaving || isUploadingPhoto}
                                >
                                    {isSaving ? (
                                        <span className={styles.buttonContent}>
                                            <svg className={styles.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Saving...
                                        </span>
                                    ) : saveSuccess ? (
                                        <span className={styles.buttonContent}>
                                            <span className="material-symbols-outlined">check_circle</span>
                                            Changes Saved
                                        </span>
                                    ) : (
                                        'Save Profile'
                                    )}
                                </button>
                                <button
                                    type="button"
                                    className={styles.cancelButton}
                                    onClick={handleCancel}
                                    disabled={isSaving || isUploadingPhoto}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Atmospheric Secondary Section */}
                <section className={styles.secondarySection}>
                    <div className={styles.infoCard}>
                        <div className={styles.cardContent}>
                            <span className="material-symbols-outlined">security</span>
                            <h3>Privacy Control</h3>
                            <p>Manage who sees your pet profiles and contact info within the PetCare+ community.</p>
                        </div>
                        <span className={`material-symbols-outlined ${styles.cardIcon}`}>lock</span>
                    </div>
                    <div className={`${styles.infoCard} ${styles.alertCard}`}>
                        <div className={styles.cardContent}>
                            <span className="material-symbols-outlined">notifications_active</span>
                            <h3>Alert Preferences</h3>
                            <p>Choose how you receive urgent medical reports and vaccine reminders.</p>
                        </div>
                        <span className={`material-symbols-outlined ${styles.cardIcon}`}>campaign</span>
                    </div>
                </section>
            </main>
        </ProtectedRoutes>
    );
}