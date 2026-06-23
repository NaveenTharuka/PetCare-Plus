"use client"
import Image from 'next/image';
import styles from './page.module.css';

import ReportCard from '@/components/ReportCard';
import VaccineCard from '@/components/VaccineCard';
import VetVisitCard from '@/components/VetVisitCard';
import ActionButton from '@/components/ActionButton';
import ErrorMsg from '@/components/ErrorMsg';
import Loader from '@/components/Loader';
import ProtectedRoutes from '@/auth/ProtectedRoutes';

import React, { useEffect, useState } from 'react';
import { getPetById } from '@/apiServices/pet.api';
import { useRouter } from 'next/navigation';
import { deleteVisit } from '@/apiServices/visits.api';

export default function PetProfilePage({ params }) {
    const { petId } = React.use(params);
    const [loading, setLoading] = useState(true);
    const [pet, setPet] = useState(null);


    const router = useRouter();

    useEffect(() => {
        fetchPetData();
    }, [petId]);

    const fetchPetData = async () => {
        try {
            const pet = await getPetById(petId);
            setPet(pet);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await deleteVisit(id)
            if (res) {
                await fetchPetData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const reports = pet?.reports;
    const vaccines = pet?.vaccinations;
    const visits = pet?.vet_visits;

    const age = pet?.date_of_birth
        ? new Date().getFullYear() - new Date(pet.date_of_birth).getFullYear()
        : 0;

    return (
        <ProtectedRoutes>
            {loading ? <Loader /> : pet ? (<div className={styles.pageContainer}>
                <div className={styles.contentWrapper}>
                    {/* Top Section */}
                    <div className={styles.topSection}>
                        <div className={styles.profileInfo}>
                            <p className={styles.profileLabel}>
                                Companion Profile
                            </p>
                            <h1 className={styles.profileName}>
                                {pet.name}
                            </h1>

                            <div className={styles.statsContainer}>
                                <div>
                                    <p className={styles.statLabel}>Breed</p>
                                    <p className={styles.statValue}>{pet.breed}</p>
                                </div>
                                <div>
                                    <p className={styles.statLabel}>Age</p>
                                    <p className={styles.statValue}>{age} Years</p>
                                </div>
                                <div>
                                    <p className={styles.statLabel}>Weight</p>
                                    <p className={styles.statValue}>{pet.weight}Kg</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.imageContainer}>
                            <div className={styles.imageWrapper}>
                                {pet?.image_url ? (
                                    <Image
                                        src={`${pet.image_url}?t=${Date.now()}`}
                                        alt={pet.name}
                                        width={600}
                                        height={450}
                                        className={styles.image}
                                    />
                                ) : (
                                    <div className={styles.image} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '100px', color: '#666' }}>
                                            pets
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className={styles.statusBadge}>
                                <span className={`material-symbols-outlined ${styles.statusIcon}`}>favorite</span>
                                <span className={styles.statusText}>Status: Healthy</span>
                            </div>
                        </div>
                    </div>

                    {/* Middle Section - Cards */}
                    <div className={styles.cardsGrid}>
                        {/* Health Reports */}
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardTitleGroup}>
                                    <h2 className={styles.cardTitle}>Health Reports</h2>
                                    <div className={styles.cardDash}></div>
                                </div>
                                <span className={`material-symbols-outlined ${styles.cardIcon}`}>snippet_folder</span>
                            </div>

                            <div className={styles.reportsList}>
                                {reports?.length > 0 ? (reports.map((report) => (
                                    <ReportCard report={report} key={report.id} />
                                ))) : <div className={styles.noReports}>No reports found</div>}
                            </div>
                        </div>

                        {/* Vaccination History */}
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardTitleGroup}>
                                    <h2 className={styles.cardTitle}>Vaccination History</h2>
                                    <div className={styles.cardDash}></div>
                                </div>
                                <span className={`material-symbols-outlined ${styles.cardIcon}`}>vaccines</span>
                            </div>

                            <div className={styles.vaxList}>
                                {vaccines?.length > 0 ? (vaccines.map((vax, idx) => (
                                    <VaccineCard vax={vax} key={idx} />
                                ))) : <div className={styles.noReports}>No vaccines found</div>}
                            </div>
                        </div>

                        {/* Vet Visit History */}
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardTitleGroup}>
                                    <h2 className={styles.cardTitle}>Vet Visit History</h2>
                                    <div className={styles.cardDash}></div>
                                </div>
                                <span className={`material-symbols-outlined ${styles.cardIcon}`}>medical_services</span>
                            </div>

                            <div className={styles.vetVisitsList}>
                                {visits?.length > 0 ? (visits.map((visit, index) => (
                                    <VetVisitCard
                                        visit={visit}
                                        key={visit.id}
                                        index={index}
                                        onEdit={() => router.push(`/user/me/pets/${pet.id}/visits/${visit.id}/edit`)}
                                        onDelete={() => handleDelete(visit.id)} />
                                ))) : <div className={styles.noReports}>No visits found</div>}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section - Weight History */}
                    <div className={styles.weightSection}>
                        <div className={styles.weightHeader}>
                            <div>
                                <h2 className={styles.weightTitle}>Weight History</h2>
                                <p className={styles.weightSubtitle}>Monitoring consistent health stability over time.</p>
                            </div>
                            <div className={styles.weightToggles}>
                                <button className={styles.weightToggleBtn}>6M</button>
                                <button className={styles.weightToggleBtnActive}>1Y</button>
                            </div>
                        </div>

                        <div className={styles.chartArea}>
                            {/* JAN */}
                            <div className={styles.chartColumn}>
                                <div className={styles.barGray28}></div>
                            </div>
                            {/* MAR */}
                            <div className={styles.chartColumn}>
                                <div className={styles.barGray28}></div>
                            </div>
                            {/* MAY */}
                            <div className={styles.chartColumn}>
                                <div className={styles.barGray28}></div>
                            </div>
                            {/* JUL */}
                            <div className={styles.chartColumn}>
                                <div className={styles.barGray28}></div>
                            </div>
                            {/* SEP */}
                            <div className={styles.chartColumn}>
                                <div className={styles.barGray32}></div>
                            </div>
                            {/* NOV */}
                            <div className={styles.chartColumn}>
                                <div className={styles.barTooltip}>
                                    32.5kg
                                </div>
                                <div className={styles.barBrown}></div>
                            </div>
                        </div>

                        {/* X-Axis Labels */}
                        <div className={styles.xAxis}>
                            {['JAN', 'MAR', 'MAY', 'JUL', 'SEP', 'NOV'].map((month, idx) => (
                                <div key={idx} className={styles.xAxisLabel}>
                                    {month}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Floating Action Button */}
                <ActionButton
                    onAddReport={() => router.push(`/user/me/pets/${pet.id}/report/add`)}
                    onAddVaccine={() => router.push(`/user/me/pets/${pet.id}/vaccine/add`)}
                    onAddVetVisit={() => router.push(`/user/me/pets/${pet.id}/visits`)}
                />
            </div>) : (<ErrorMsg message="Pet not found"></ErrorMsg>)}
        </ProtectedRoutes>
    );
}