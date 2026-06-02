"use client"
import { deletePet } from "@/apiServices/pet.api";
import { useRouter } from "next/navigation";


export default function Petcard(pet) {
    const router = useRouter();
    async function handleDeletePet(pet) {
        await deletePet(pet);
        router.refresh();
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
                <img alt={pet.name} className="w-full h-full object-cover" src={pet.image_url} />
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
                    <button className="bg-secondary-container text-on-secondary-container px-6 py-2 rounded-full text-sm font-bold hover:opacity-80 transition-all">Health Log</button>
                    <button className="bg-surface-container-high text-on-surface-variant px-6 py-2 rounded-full text-sm font-bold hover:bg-surface-container-highest transition-all">Edit Profile</button>
                </div>
            </div>
        </div>
    )
}