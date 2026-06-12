"use client"
import { deletePet } from "@/apiServices/pet.api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../app/user/me/pets/[petId]/page.module.css";


export default function Petcard({ userId, ...pet }) {
    const router = useRouter();
    async function handleDeletePet(pet) {
        await deletePet(pet);
        router.refresh();
    }

    const handleHealth = () => {
        router.push(`/user/me/pets/${pet.id}`)
    }

    const birthDate = pet.date_of_birth ? new Date(pet.date_of_birth) : null;
    const age = birthDate && !isNaN(birthDate.getTime())
        ? new Date().getFullYear() - birthDate.getFullYear()
        : "N/A";

    const lastVisitDate = pet.last_vet_visit ? new Date(pet.last_vet_visit) : null;
    const formattedLastVisit = lastVisitDate && !isNaN(lastVisitDate.getTime())
        ? lastVisitDate.toLocaleDateString()
        : "N/A";

    return (
        <div className="bg-surface-container-lowest p-6 rounded-lg shadow-sm flex flex-col sm:flex-row gap-8 items-center border border-outline-variant/10 hover:shadow-md transition-shadow">
            <div className="w-48 h-48 rounded-xl overflow-hidden shrink-0 border-4 border-surface-container">
                {pet?.image_url ? (
                    <Image
                        src={pet.image_url}
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
            <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-2xl font-headline font-bold text-on-surface">{pet.name}</h3>
                        <p className="text-on-surface-variant">{pet.breed} • {age} {typeof age === 'number' ? 'years old' : ''}</p>
                    </div>
                    <div className="flex">
                        <button onClick={() => handleDeletePet(pet)} className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-full text-sm font-bold hover:bg-surface-container-highest transition-all">
                            <span className="material-symbols-outlined">
                                delete
                            </span>
                        </button>
                    </div>

                </div>
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-outline-variant/10">
                    <div>
                        <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Last Visit</p>
                        <p className="font-medium text-on-surface">{formattedLastVisit}</p>
                    </div>
                    <div>
                        <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Weight</p>
                        <p className="font-medium text-on-surface">{pet.weight}kg</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="bg-secondary-container text-on-secondary-container px-6 py-2 rounded-full text-sm font-bold hover:opacity-80 transition-all" onClick={handleHealth}>Health Log</button>
                    <button className="bg-surface-container-high text-on-surface-variant px-6 py-2 rounded-full text-sm font-bold hover:bg-surface-container-highest transition-all">Edit Profile</button>
                </div>
            </div>
        </div>
    )
}