'use client'
import styles from './pet.module.css'
import { addPet, addPetPicture } from '@/apiServices/pet.api';
import { useState, use } from 'react';

export default function AddPet({ params }) {
    const { id } = use(params);
    const [gender, setGender] = useState('male');
    const [isMicrochipped, setIsMicrochipped] = useState(false);
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const response = await addPet(data, id);

        await addPetPicture(response.id, image);
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h1 className={styles.headerTitle}>Welcome a New Friend</h1>
                <p className={styles.headerSub}>Let&apos;s create a profile for your companion to ensure they get the best personalized care possible.</p>
            </div>

            <div className={styles.formCard}>
                <div className={styles.decorativeCorner}></div>
                <form onSubmit={handleSubmit} className={styles.formElement}>

                    <div className={styles.photoSection}>
                        <div className={styles.photoUploadContainer}>
                            <div className={styles.photoBox} >
                                {image && <img src={URL.createObjectURL(image)} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'fill', borderRadius: '25%' }} />}
                                {!image && <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#7a7b79' }}>add_a_photo</span>}
                                <div className={styles.editIcon}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'white' }}>
                                        edit
                                    </span>
                                </div>
                            </div>
                            <input type="file" id="photo" className={styles.uploadInput} accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

                        </div>
                        <div className={styles.photoInfo}>
                            <h3 className={styles.photoTitle}>Pet Photo</h3>
                            <p className={styles.photoDesc}>Add a clear photo of your pet&apos;s face.<br />JPG or PNG, max 5MB.</p>
                            <button type="button" className={styles.galleryButton}>Choose from gallery</button>
                        </div>
                    </div>

                    <div className={styles.formBasicFields}>
                        <div className={styles.formRow}>
                            <label className={styles.label} htmlFor="name">Pet Name</label>
                            <input className={styles.input} type="text" name="name" id="name" placeholder="e.g. Luna" />
                        </div>

                        <div className={styles.formRow}>
                            <label className={styles.label} htmlFor="species">Species</label>
                            <select className={styles.input} name="species" id="species">
                                <option value="">Select Species</option>
                                <option value="dog">Dog</option>
                                <option value="cat">Cat</option>
                                <option value="bird">Bird</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className={styles.formRow}>
                            <label className={styles.label} htmlFor="breed">Breed</label>
                            <input className={styles.input} type="text" name="breed" id="breed" placeholder="e.g. Golden Retriever" />
                        </div>

                        <div className={styles.formRow}>
                            <label className={styles.label} htmlFor="colour">Color</label>
                            <input className={styles.input} type="text" name="colour" id="colour" placeholder="e.g. Golden, Black & White" />
                        </div>

                        <div className={styles.formRow}>
                            <label className={styles.label} htmlFor="date_of_birth">Date of Birth</label>
                            <input className={styles.input} type="date" name="date_of_birth" id="date_of_birth" placeholder="mm/dd/yyyy" />
                        </div>

                        <div className={styles.formRow}>
                            <label className={styles.label} htmlFor="weight">Weight (kg)</label>
                            <div className={styles.inputWithSuffix}>
                                <input className={styles.input} type="number" name="weight" id="weight" placeholder="0.0" step="0.1" min="0" />
                                <span className={styles.suffix}>kg</span>
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <label className={styles.label}>Gender</label>
                            <div className={styles.genderToggle}>
                                <button
                                    type="button"
                                    className={`${styles.genderButton} ${gender === 'male' ? styles.genderActive : ''}`}
                                    onClick={() => setGender('male')}
                                    value={'male'}
                                >
                                    Male
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.genderButton} ${gender === 'female' ? styles.genderActive : ''}`}
                                    onClick={() => setGender('female')}
                                    value={'female'}
                                >
                                    Female
                                </button>
                            </div>
                            <input type="hidden" name="gender" value={gender} />
                        </div>


                    </div>

                    <div className={styles.toggleRow}>
                        <label className={styles.switch}>
                            <input
                                name='is_registered'
                                type="checkbox"
                                checked={isMicrochipped}
                                onChange={(e) => setIsMicrochipped(e.target.checked)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                        <span className={styles.toggleLabel}>Is your pet microchipped or registered?</span>
                    </div>

                    <div className={styles.buttonRow}>
                        <button type="submit" className={styles.submitButton}>
                            Create Pet Profile
                        </button>
                        <button type="button" className={styles.cancelButton}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            <div className={styles.infoCardsContainer}>
                <div className={styles.infoCardPink}>
                    <div className={styles.infoIconContainerPink}>
                        <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '32px' }}>
                            pets
                        </span>
                    </div>
                    <div>
                        <h4 className={styles.infoCardTitle}>Why detailed info matters?</h4>
                        <p className={styles.infoCardDesc}>Accurate species and breed data help us tailor medical reminders, dietary suggestions, and activity levels specific to your pet&apos;s biological needs.</p>
                    </div>
                </div>

                <div className={styles.infoCardGray}>
                    <div className={styles.infoIconContainerGray}>
                        <span className="material-symbols-outlined" style={{ color: '#7b5749', fontSize: '32px' }}>
                            shield
                        </span>
                    </div>
                    <div>
                        <h4 className={styles.infoCardTitle}>Privacy First</h4>
                        <p className={styles.infoCardDesc}>Your pet&apos;s data is encrypted and shared only with verified vets you approve.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}