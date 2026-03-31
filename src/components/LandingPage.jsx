"use client";

import { navigate } from "next/dist/client/components/segment-cache/navigation";
import Link from "next/link";
import { useRouter } from 'next/navigation';


export default function LandingPage() {

  const router = useRouter();

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="px-8 py-20 md:py-32 max-w-screen-2xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-10">
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface leading-[1.1]">
              Every pet has a story. We help you <span className="text-primary">care for it.</span>
            </h1>
            <p className="text-xl md:text-2xl text-on-surface-variant max-w-xl leading-relaxed">
              The all-in-one sanctuary for your pet&apos;s medical history, daily routines, and wellness journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="primary-satin-gradient text-on-primary px-10 py-5 rounded-full font-semibold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-[0px_20px_40px_rgba(123,87,73,0.2)]" onClick={() => router.push('/signup')}>
                Create Free Account
              </button>
              <button className="bg-secondary-container text-on-secondary-container px-10 py-5 rounded-full font-semibold text-lg hover:bg-surface-container-high transition-colors">
                Watch Video
              </button>
            </div>
          </div>
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl transform rotate-2">
              <img className="w-full aspect-[4/3] object-cover rounded-xl" alt="happy golden retriever dog smiling warmly with soft afternoon sunlight illuminating its golden fur in a cozy living room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZL37Al2gpUhONVU6VFIWmnnAzhRU98XdGyYyvLeAExKTN0Flsae-YsAF6Qg1UPwqd-38ty3lIApgxN_yEhibsumFGA8fAaPAfqTHMJ8MfMKm5EQ6Ul7r2CwPkDLu57YjS6Vqtpr6ZTm73N08LRLVtpfSR2UgfUxWJDLUNQjnEIRrZrEsk_Y-f9GgAIq-vGZuZGVFxTslaqidl241i7iohJRiKYxW4ncP4BkEH_daNTgZRsx9HfGkuniGWHj9kCn3Qt3j5vG-wMtE" />
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-tertiary-container rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-primary-container rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="px-8 py-24 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-20 space-y-4">
            <h2 className="font-headline text-4xl font-bold">Thoughtfully designed for wellness</h2>
            <p className="text-on-surface-variant text-lg">Beyond a simple tracker—a holistic approach to companion care.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-8 h-auto md:h-[800px]">
            {/* Feature: Medical Records */}
            <div className="md:col-span-2 md:row-span-2 bg-surface-container-lowest p-10 rounded-xl border border-outline-variant/10 flex flex-col justify-between group overflow-hidden relative">
              <div className="relative z-10">
                <span className="material-symbols-outlined text-primary text-5xl mb-6" data-icon="clinical_notes">clinical_notes</span>
                <h3 className="text-3xl font-bold font-headline mb-4">Complete Medical Records</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed max-w-sm">
                  Keep vaccinations, surgical history, and lab results in one encrypted digital vault. Never lose a vet report again.
                </p>
              </div>
              <img className="absolute bottom-0 right-0 w-2/3 h-1/2 object-cover rounded-tl-xl translate-y-4 translate-x-4 grayscale group-hover:grayscale-0 transition-all duration-700" alt="close up of a professional veterinarian holding a digital tablet displaying health charts next to a calm brown dog" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKeixM04FJzzRv1QDwJ8H1nUkfPripmiVzo9Brdp6idXZzMzFkSG3ij7gfvVuYv54ZgciCLlQbcc_63TPpV6rrOGFrzfidxvLGdc4cBUXjJYU1z1blJ-VF0yowuUDzbIiPWvvpV5LDlYUHRxSF8Y2BqEffD_IKMgYmhLaNy9nN8JwTArqj0GuzLzgvFfjN2GvAsjSEpLaZBlvH6ms0C_GU7j1_2xtpO2_HbZOeLHrlA2m9oCEyQn9QkDciqyLhMm2ANRBZHICMmvU" />
            </div>
            {/* Feature: Smart Reminders */}
            <div className="md:col-span-2 bg-tertiary-container p-10 rounded-xl flex flex-col justify-center">
              <div className="flex items-start gap-8">
                <div className="bg-surface-container-lowest p-4 rounded-lg shadow-sm">
                  <span className="material-symbols-outlined text-tertiary text-4xl" data-icon="notifications_active">notifications_active</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-headline mb-2">Smart Reminders</h3>
                  <p className="text-on-tertiary-container text-lg">Automated nudges for medication, heartworm prevention, and grooming appointments.</p>
                </div>
              </div>
            </div>
            {/* Feature: Pet Profiles */}
            <div className="md:col-span-1 bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary text-4xl mb-4" data-icon="pets">pets</span>
              <h3 className="text-xl font-bold font-headline mb-2">Detailed Profiles</h3>
              <p className="text-on-surface-variant">Capture personality traits, allergies, and microchip info for each unique pet.</p>
            </div>
            {/* Feature: Health Tracking */}
            <div className="md:col-span-1 bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary text-4xl mb-4" data-icon="monitoring">monitoring</span>
              <h3 className="text-xl font-bold font-headline mb-2">Health Tracking</h3>
              <p className="text-on-surface-variant">Visualize weight trends, activity levels, and dietary habits over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The "Tactile Sanctuary" Visual Section */}
      <section className="py-32 px-8">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="font-headline text-5xl font-extrabold text-on-surface">The digital home they deserve.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="h-80 rounded-xl overflow-hidden mb-6">
                <img className="w-full h-full object-cover" alt="aesthetic interior of a sunlit modern apartment with minimalist wood furniture and a cat resting on a soft blanket" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8-hxBQXjUz7nymUm0ao0mivd-A7Mxf1kFb2WBnZvDczyIZHj91-lG0edxh5QbzyxeS5oUg6cSokAo6cPSTQ56EAGzNjlyw2QvZG1q0QT5dnoIpAg9JIlA_bbgz1MYvr5BgO2PHwUamFQdFBDDp-YI60lVgI5CNUbkqnp4__N16xOZ6yhnMjY3UWVgJeUzx6u7U4vKGIQWiJEjSZrUuzRqhZjfz9FkkARy02QBoVz1wzyHuK_-XXAC9cEPZshWhmq5MxbxvQMyI0Y" />
              </div>
              <h4 className="font-bold text-xl">Peace of Mind</h4>
              <p className="text-on-surface-variant">Rest easy knowing all your pet&apos;s vital information is accessible 24/7, anywhere in the world.</p>
            </div>
            <div className="space-y-4 pt-12">
              <div className="h-80 rounded-xl overflow-hidden mb-6">
                <img className="w-full h-full object-cover" alt="close up of a small fluffy dog looking up with curious eyes in a bright white studio setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJYHxhNNBRxnqgHG6iVM6870gdgpJch26hNpCm_7dmtehKTy3Mg_l-uyJ2XFrWUwQHvDPWtFzb2FKncQ_7zpCP44gpgBQXlSa7VcKdAigQ1zyKNPfZhXDfjZYLZum5YvTrScHuoqxE33mEXL7yjqA2_o7ERx2FYTVPf9a2D1gQBfbpf11RbJRso0NIK0GT_ZPORVYlqtZl8WbTtb23pUQ5aP3lVG-bLSqX__1NGQD89d5g-p7LCiaTb_20ghZwrujJtccyNxx6Urs" />
              </div>
              <h4 className="font-bold text-xl">Coordinated Care</h4>
              <p className="text-on-surface-variant">Easily share records and schedules with sitters, walkers, or emergency vets with one click.</p>
            </div>
            <div className="space-y-4">
              <div className="h-80 rounded-xl overflow-hidden mb-6">
                <img className="w-full h-full object-cover" alt="two playful dogs running together in a grassy field during a warm orange sunrise" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWna-8mTBDHMHq33_kJqsTOcg89so0YbWuYoBrSBBv6to3r8BYwYRt0955aF5PYxydjdvZJCBEVv7y9SKdRXtPpSsOEqOGoASmYpZX1I3cKb3ryq0q8fbD8B8N9-HNmVgnASye5ud_4tuzg_g6sKemYm1Ei6WEFXctUD3-V5t2qmYgjw8zIlCT1acmN-Kgl5L_z4qez8rcpSBW45Xa1pIE0e9UmoKi9ZMMLx5xRDhXgdPPySXurWP8UoKhHKTCny8hdDpBrv3Wgeo" />
              </div>
              <h4 className="font-bold text-xl">Proactive Health</h4>
              <p className="text-on-surface-variant">Early detection markers help you identify subtle changes in your pet’s behavior and health.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-8 py-24">
        <div className="max-w-screen-xl mx-auto primary-satin-gradient rounded-xl p-12 md:p-24 text-center text-on-primary relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            <h2 className="font-headline text-4xl md:text-6xl font-bold">Ready to start their health journey?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">Join 50,000+ pet parents who prioritize wellness and organized care.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-surface-container-lowest text-primary px-12 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                Join PetCare+ Today
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
        </div>
      </section>
    </main>
  );
}