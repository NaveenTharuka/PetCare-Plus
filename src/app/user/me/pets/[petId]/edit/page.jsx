// pages/pet-profile-edit.js
"use client"
import { useEffect, useState } from 'react';
import styles from './PetProfileEdit.module.css';
import { useAuth } from '@/auth/AuthProvider';
import { useParams } from 'next/navigation';
import ProtectedRoutes from '@/auth/ProtectedRoutes';
import Loader from '@/components/Loader';
import { addPetPicture, editPet } from '@/apiServices/pet.api';

export default function PetProfileEdit() {
    const { petId } = useParams();
    const { user, loading, refreshUser } = useAuth();

    const [formData, setFormData] = useState({
        petName: '',
        breed: '',
        weight: '',
        species: '',
        colour: '',
        date_of_birth: '',
        is_registered: false
    });

    const [pet, setPet] = useState(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoadingPet, setIsLoadingPet] = useState(true);
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (user && petId) {
            const foundPet = user.pets?.find((pet) => pet.id === petId);
            if (foundPet) {
                setPet(foundPet);
                setFormData({
                    petName: foundPet.name || '',
                    breed: foundPet.breed || '',
                    weight: foundPet.weight || '',
                    species: foundPet.species || '',
                    colour: foundPet.colour || '',
                    date_of_birth: foundPet.date_of_birth || '',
                    is_registered: foundPet.is_registered || false
                });
                setIsLoadingPet(false);
            }
        }
    }, [user, petId]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await editPet(formData, petId);
            if (res) {
                if (image) {
                    setIsUploading(true);
                    const result = await addPetPicture(petId, image);
                    if (result) {
                        console.log("Image uploaded successfully");
                    }
                    setIsUploading(false);
                }
                // Refresh user data so all pages get the updated pet info
                await refreshUser();
                alert('Profile updated successfully!');
            } else {
                throw new Error('Failed to update profile');
            }

        } catch (error) {
            alert(error.message || 'Failed to update profile');
        }
        setIsSubmitting(false);
    };

    const handleCancel = () => {
        if (confirm('Are you sure you want to cancel? Changes will be lost.')) {
            console.log('Cancel clicked');
            // Add navigation logic here
            push()
        }
    };


    return (
        <ProtectedRoutes>
            {loading && !pet ? (
                <Loader />
            ) : (
                <div className={styles.container}>
                    <main className={styles.main}>
                        <div className={styles.wrapper}>
                            {/* Header Section */}
                            <header className={styles.header}>
                                <h1 className={styles.title}>
                                    Edit Companion Profile
                                </h1>
                                <p className={styles.subtitle}>
                                    Keep your pet's information up to date for the best care recommendations.
                                </p>
                            </header>

                            <div className={styles.grid}>
                                {/* Left Column: Image Preview */}
                                <aside className={styles.imageSection}>
                                    <div
                                        className={styles.imageWrapper}
                                        onMouseEnter={() => setIsHovering(true)}
                                        onMouseLeave={() => setIsHovering(false)}
                                    >
                                        <div className={styles.imageContainer}>
                                            {pet?.image_url ? (
                                                <img
                                                    alt={formData.petName || "Pet Profile"}
                                                    className={styles.profileImage}
                                                    src={pet.image_url}
                                                    loading='eager'
                                                />
                                            ) : (
                                                <div className={styles.placeholderImage}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: '#b1b2b0' }}>
                                                        pets
                                                    </span>
                                                    <p style={{ color: '#b1b2b0', marginTop: '0.5rem' }}>No image available</p>
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            className={styles.photoButton}
                                            onClick={() => document.getElementById('photoInput')?.click()}
                                        >
                                            <span className="material-symbols-outlined">photo_camera</span>
                                        </button>
                                        <input
                                            type="file"
                                            id="photoInput"
                                            accept="image/*"
                                            className={styles.hiddenInput}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    console.log('Photo selected:', file.name);
                                                    setImage(file)
                                                    // Add your image upload logic here
                                                }
                                            }}
                                        />
                                    </div>
                                    <p className={styles.changePhotoText}>
                                        Change Photo
                                    </p>
                                </aside>

                                {/* Right Column: Form Fields */}
                                <form className={styles.formSection} onSubmit={handleSubmit}>
                                    <div className={styles.formCard}>
                                        <div className={styles.formGrid}>
                                            {/* Pet Name */}
                                            <div className={styles.fullWidth}>
                                                <label
                                                    className={styles.label}
                                                    htmlFor="petName"
                                                >
                                                    Pet Name
                                                </label>
                                                <input
                                                    className={styles.input}
                                                    id="petName"
                                                    name="petName"
                                                    type="text"
                                                    value={formData.petName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            {/* Breed */}
                                            <div className={styles.fullWidth}>
                                                <label
                                                    className={styles.label}
                                                    htmlFor="breed"
                                                >
                                                    Breed
                                                </label>
                                                <input
                                                    className={styles.input}
                                                    id="breed"
                                                    name="breed"
                                                    type="text"
                                                    value={formData.breed}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            {/* Species */}
                                            <div className={styles.halfWidth}>
                                                <label
                                                    className={styles.label}
                                                    htmlFor="species"
                                                >
                                                    Species
                                                </label>
                                                <select
                                                    className={styles.input}
                                                    id="species"
                                                    name="species"
                                                    value={formData.species}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="">Select species</option>
                                                    <option value="Dog">Dog</option>
                                                    <option value="Cat">Cat</option>
                                                    <option value="Rabbit">Rabbit</option>
                                                    <option value="Bird">Bird</option>
                                                    <option value="Fish">Fish</option>
                                                    <option value="Reptile">Reptile</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>

                                            {/* Weight */}
                                            <div className={styles.halfWidth}>
                                                <label
                                                    className={styles.label}
                                                    htmlFor="weight"
                                                >
                                                    Weight (kg)
                                                </label>
                                                <input
                                                    className={styles.input}
                                                    id="weight"
                                                    name="weight"
                                                    type="number"
                                                    min="0"
                                                    step="0.1"
                                                    value={formData.weight}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            {/* Colour */}
                                            <div className={styles.halfWidth}>
                                                <label
                                                    className={styles.label}
                                                    htmlFor="colour"
                                                >
                                                    Colour
                                                </label>
                                                <input
                                                    className={styles.input}
                                                    id="colour"
                                                    name="colour"
                                                    type="text"
                                                    value={formData.colour}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            {/* Date of Birth */}
                                            <div className={styles.halfWidth}>
                                                <label
                                                    className={styles.label}
                                                    htmlFor="date_of_birth"
                                                >
                                                    Date of Birth
                                                </label>
                                                <input
                                                    className={styles.input}
                                                    id="date_of_birth"
                                                    name="date_of_birth"
                                                    type="date"
                                                    value={formData.date_of_birth}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            {/* Registration Toggle */}
                                            <div className={styles.toggleSection}>
                                                <div className={styles.toggleText}>
                                                    <span className={styles.toggleTitle}>Registered Companion</span>
                                                    <span className={styles.toggleSubtitle}>
                                                        Is this pet officially registered with KASL, CKC or Any organization?
                                                    </span>
                                                </div>
                                                <label className={styles.toggleSwitch}>
                                                    <input
                                                        className={styles.toggleInput}
                                                        name="is_registered"
                                                        type="checkbox"
                                                        checked={formData.is_registered}
                                                        onChange={handleInputChange}
                                                    />
                                                    <div className={styles.toggleSlider}></div>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className={styles.actions}>
                                            <button
                                                className={`${styles.saveButton} ${isSubmitting ? styles.loading : ''}`}
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (isUploading ? 'Uploading Image...' : 'Saving...') : 'Save Changes'}
                                            </button>
                                            <button
                                                className={styles.cancelButton}
                                                type="button"
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            )}
        </ProtectedRoutes>
    );
}