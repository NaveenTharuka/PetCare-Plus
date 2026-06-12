'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function VetVisitPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        vet_name: '',
        visit_date: '',
        reason: '',
        notes: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // TODO: Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Form submitted:', formData);
        alert('Vet record for Oliver has been saved to the Health Vault.');

        setIsSubmitting(false);
        router.push('/health-vault');
    };

    return (
        <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Context & Guidance Column */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Pet Context Card */}
                    <div className="bg-surface-container-low rounded-lg p-8 relative overflow-hidden">
                        <div className="absolute -right-4 -bottom-4 opacity-10">
                            <span className="material-symbols-outlined text-8xl">pets</span>
                        </div>
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm relative bg-surface-container-high">
                                <Image
                                    alt="Oliver the dog"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9qsxGymNS8Zk2qeujY8i5NslJ1K1zYy5gNVsndYG8GW2ggJM_z9cyEiJQdK2mHBMlOApSBEtlkbLvPTiv3_pZ3ZxVYXHo2THo23ery-h4EOji26lAloSwhoW7CpIPltjn1afUGdR3k_Qmnvr9Nky8q1sGU_iuhGjfvVw_egs5Ux_Ibc1qzoCixw_DVcymupmU1OjGavTixyeiL3R61i_dmOrGFtxWthOZg-Cn4jXZhnzL-bGF54rxdXgshK89VmBENbjT7dcYLdg"
                                    width={80}
                                    height={80}
                                    className="object-cover"
                                    sizes="80px"
                                />
                            </div>
                            <div>
                                <h3 className="font-headline text-2xl font-bold text-on-surface">Oliver</h3>
                            </div>
                        </div>
                        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
                            Recording for
                        </p>
                        <p className="text-on-surface-variant text-sm leading-relaxed">
                            Recording a visit for Oliver's health vault. Keeping records updated ensures a lifetime of wellness and accurate medical history.
                        </p>
                    </div>

                    {/* Tactile Tip block */}
                    <div className="bg-primary-container/30 rounded-lg p-8 border border-primary-container/50">
                        <div className="flex items-center space-x-3 mb-4 text-on-primary-container">
                            <span className="material-symbols-outlined">lightbulb</span>
                            <h4 className="font-headline font-bold">Tactile Tip</h4>
                        </div>
                        <p className="text-on-primary-container text-sm leading-relaxed mb-4">
                            Always ask your vet for a digital copy of laboratory results. You can upload them as attachments in the Clinical Notes section for future reference.
                        </p>
                        <div className="flex items-center text-xs text-primary font-semibold uppercase tracking-widest cursor-pointer hover:underline">
                            Learn more about records{' '}
                            <span className="material-symbols-outlined text-sm ml-1">chevron_right</span>
                        </div>
                    </div>
                </div>

                {/* Form Column */}
                <div className="lg:col-span-8">
                    <div className="bg-surface-container-lowest rounded-xl p-10 md:p-12 shadow-[0px_20px_40px_rgba(49,51,49,0.04)]">
                        <div className="mb-10">
                            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-2">
                                Record Vet Visit
                            </h1>
                            <p className="text-on-surface-variant">
                                Keep a detailed history of your pet's medical consultations to track treatments and health patterns over time.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Vet Name */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="vet_name"
                                        className="block text-sm font-semibold text-on-surface-variant ml-1"
                                    >
                                        Vet Name
                                    </label>
                                    <input
                                        id="vet_name"
                                        type="text"
                                        value={formData.vet_name}
                                        onChange={handleInputChange}
                                        placeholder="Dr. Sarah Mitchell"
                                        required
                                        className="w-full bg-surface-container-highest border-none rounded-lg px-5 py-4 text-on-surface placeholder:text-on-surface-variant/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                {/* Visit Date */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="visit_date"
                                        className="block text-sm font-semibold text-on-surface-variant ml-1"
                                    >
                                        Visit Date
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="visit_date"
                                            type="date"
                                            value={formData.visit_date}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-surface-container-highest border-none rounded-lg px-5 py-4 text-on-surface transition-all appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        />
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                                            calendar_today
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Reason for Visit */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="reason"
                                    className="block text-sm font-semibold text-on-surface-variant ml-1"
                                >
                                    Reason for Visit
                                </label>
                                <select
                                    id="reason"
                                    value={formData.reason}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-surface-container-highest border-none rounded-lg px-5 py-4 text-on-surface transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
                                >
                                    <option disabled value="">
                                        Select a reason...
                                    </option>
                                    <option value="routine">Routine Wellness Check</option>
                                    <option value="vaccination">Vaccination</option>
                                    <option value="illness">Sudden Illness</option>
                                    <option value="injury">Injury / Trauma</option>
                                    <option value="followup">Follow-up Visit</option>
                                    <option value="dental">Dental Cleaning</option>
                                </select>
                            </div>

                            {/* Clinical Notes */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label
                                        htmlFor="notes"
                                        className="block text-sm font-semibold text-on-surface-variant"
                                    >
                                        Clinical Notes
                                    </label>
                                    <span className="text-xs text-on-surface-variant/60 font-medium italic">
                                        Optional
                                    </span>
                                </div>
                                <textarea
                                    id="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    placeholder="Describe symptoms, diagnoses, or prescriptions given..."
                                    rows={6}
                                    className="w-full bg-surface-container-highest border-none rounded-lg px-5 py-4 text-on-surface placeholder:text-on-surface-variant/50 transition-all resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            {/* Form Actions */}
                            <div className="flex flex-col md:flex-row items-center justify-end space-y-4 md:space-y-0 md:space-x-6 pt-6">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="w-full md:w-auto px-8 py-4 rounded-full text-on-secondary-container font-semibold hover:bg-secondary-container/50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full md:w-auto px-10 py-4 rounded-full primary-satin-gradient text-on-primary font-bold shadow-lg hover:shadow-xl transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Saving...' : 'Save Record'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}