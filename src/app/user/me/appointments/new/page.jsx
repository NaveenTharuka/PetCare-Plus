"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoutes from "@/auth/ProtectedRoutes";
import { useAuth } from "@/auth/AuthProvider";
import Loader from "@/components/Loader";
import { createAppointment } from "@/apiServices/appointment.api";
import { getAllUsers } from "@/apiServices/user.api";
import styles from "./AppointmentBooking.module.css";

const today = new Date().toISOString().split("T")[0];

export default function AppointmentBookingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [vets, setVets] = useState([]);
  const [isLoadingVets, setIsLoadingVets] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    pet_id: "",
    vet_id: "",
    appointment_date: "",
    appointment_time: "",
    reason: "",
  });

  const pets = useMemo(() => user?.pets ?? [], [user?.pets]);
  const selectedPet = useMemo(
    () => pets.find((pet) => pet.id === form.pet_id),
    [pets, form.pet_id]
  );
  const selectedVet = useMemo(
    () => vets.find((vet) => vet.id === form.vet_id),
    [vets, form.vet_id]
  );

  useEffect(() => {
    if (pets.length && !form.pet_id) {
      setForm((current) => ({ ...current, pet_id: pets[0].id }));
    }
  }, [pets, form.pet_id]);

  useEffect(() => {
    let isMounted = true;

    async function loadVets() {
      try {
        const users = await getAllUsers();
        const vetUsers = Array.isArray(users)
          ? users.filter((person) => person.role?.toUpperCase() === "VET")
          : [];
        if (isMounted) setVets(vetUsers);
      } catch {
        if (isMounted) setLoadError("We couldn't load the available veterinarians. Please try again.");
      } finally {
        if (isMounted) setIsLoadingVets(false);
      }
    }

    loadVets();
    return () => { isMounted = false; };
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setSubmitError("");
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      await createAppointment(form);
      router.push("/user/me");
    } catch (error) {
      setSubmitError(error.message || "Unable to book the appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoutes>
      {loading ? <Loader /> : (
        <main className={styles.page}>
          <div className={styles.layout}>
            <aside className={styles.sidebar}>
              <Link href="/user/me" className={styles.backLink}>
                <span className="material-symbols-outlined">arrow_back</span>
                Back to dashboard
              </Link>

              <section className={styles.petCard}>
                <p className={styles.eyebrow}>Booking for</p>
                <div className={styles.petIdentity}>
                  {selectedPet?.image_url ? (
                    <img src={selectedPet.image_url} alt="" className={styles.petImage} />
                  ) : (
                    <span className={`material-symbols-outlined ${styles.petPlaceholder}`}>pets</span>
                  )}
                  <div>
                    <h2>{selectedPet?.name || "Your companion"}</h2>
                    <p>{selectedPet ? [selectedPet.breed, selectedPet.species].filter(Boolean).join(" • ") : "Select a pet to continue"}</p>
                  </div>
                </div>
                <p className={styles.petDescription}>Schedule a clinic visit and keep your pet&apos;s health records up to date.</p>
              </section>

              <section className={styles.summaryCard}>
                <p className={styles.eyebrow}>Appointment summary</p>
                <dl>
                  <div><dt>Patient</dt><dd>{selectedPet?.name || "Not selected"}</dd></div>
                  <div><dt>Veterinarian</dt><dd>{selectedVet?.name || "Not selected"}</dd></div>
                  <div><dt>When</dt><dd>{form.appointment_date && form.appointment_time ? `${form.appointment_date} at ${form.appointment_time}` : "Not selected"}</dd></div>
                </dl>
              </section>

              <section className={styles.tipCard}>
                <span className="material-symbols-outlined">lightbulb</span>
                <div><h3>Appointment tip</h3><p>Please arrive 10 minutes early. For emergencies, contact your local emergency veterinary service directly.</p></div>
              </section>
            </aside>

            <section className={styles.formCard}>
              <header><p className={styles.eyebrow}>PetCare+</p><h1>Book an appointment</h1><p>Schedule a consultation, vaccination, or routine wellness exam with a veterinarian.</p></header>

              {pets.length === 0 ? (
                <div className={styles.notice}><p>Add a pet before booking an appointment.</p><Link href="/user/me/pets/new">Add a pet</Link></div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.twoColumns}>
                    <label>Selected patient<select name="pet_id" value={form.pet_id} onChange={updateField} required>{pets.map((pet) => <option value={pet.id} key={pet.id}>{pet.name}{pet.breed ? ` (${pet.breed})` : ""}</option>)}</select></label>
                    <label>Veterinarian<select name="vet_id" value={form.vet_id} onChange={updateField} required disabled={isLoadingVets || vets.length === 0}><option value="">{isLoadingVets ? "Loading veterinarians…" : "Select a veterinarian"}</option>{vets.map((vet) => <option value={vet.id} key={vet.id}>{vet.name}</option>)}</select></label>
                  </div>
                  {loadError && <p className={styles.error} role="alert">{loadError}</p>}
                  {!isLoadingVets && !loadError && vets.length === 0 && <p className={styles.error} role="alert">No veterinarians are available to book right now.</p>}
                  <div className={styles.twoColumns}>
                    <label>Appointment date<input name="appointment_date" type="date" min={today} value={form.appointment_date} onChange={updateField} required /></label>
                    <label>Preferred time<input name="appointment_time" type="time" value={form.appointment_time} onChange={updateField} required /></label>
                  </div>
                  <label>Reason for visit<textarea name="reason" value={form.reason} onChange={updateField} rows="5" maxLength="500" placeholder="Briefly tell the veterinarian what you need help with." required /></label>
                  {submitError && <p className={styles.error} role="alert">{submitError}</p>}
                  <div className={styles.actions}><Link href="/user/me">Cancel</Link><button type="submit" disabled={isSubmitting || isLoadingVets || vets.length === 0}>{isSubmitting ? "Booking…" : "Confirm appointment"}</button></div>
                </form>
              )}
            </section>
          </div>
        </main>
      )}
    </ProtectedRoutes>
  );
}
