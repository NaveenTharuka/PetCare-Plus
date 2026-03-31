"use client"
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <>
      <footer className="bg-[#f5f3f1] w-full">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 w-full max-w-screen-2xl mx-auto">
          <div className="mb-8 md:mb-0">
            <div className="font-headline font-bold text-[#313331] text-2xl mb-2">PetCare+</div>
            <p className="text-sm font-body text-[#5e5f5d]">© 2024 PetCare+ Sanctuary. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            <a className="text-sm font-body text-[#5e5f5d] hover:text-[#313331] transition-colors" href="#">Privacy Policy</a>
            <a className="text-sm font-body text-[#5e5f5d] hover:text-[#313331] transition-colors" href="#">Terms of Service</a>
            <a className="text-sm font-body text-[#5e5f5d] hover:text-[#313331] transition-colors" href="#">Support</a>
            <a className="text-sm font-body text-[#5e5f5d] hover:text-[#313331] transition-colors" href="contact">Contact Us</a>
          </div>
        </div>
      </footer>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-6 pb-6 pt-3 md:hidden bg-[#fbf9f7]/90 backdrop-blur-xl z-50 rounded-t-[3rem] shadow-[0px_-10px_40px_rgba(49,51,49,0.04)]">
        <a className="flex flex-col items-center justify-center bg-[#7b5749] text-white rounded-full w-12 h-12 mb-1 transition-all active:scale-90 duration-200" href="#">
          <span className="material-symbols-outlined" data-icon="home">home</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#5e5f5d] dark:text-stone-400 hover:bg-[#efeeeb] dark:hover:bg-stone-800 rounded-full transition-all" href="#">
          <span className="material-symbols-outlined" data-icon="pets">pets</span>
          <span className="text-[11px] font-medium font-body">Pets</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#5e5f5d] dark:text-stone-400 hover:bg-[#efeeeb] dark:hover:bg-stone-800 rounded-full transition-all" href="#">
          <span className="material-symbols-outlined" data-icon="medical_services">medical_services</span>
          <span className="text-[11px] font-medium font-body">Care</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#5e5f5d] dark:text-stone-400 hover:bg-[#efeeeb] dark:hover:bg-stone-800 rounded-full transition-all" href="#">
          <span className="material-symbols-outlined" data-icon="person">person</span>
          <span className="text-[11px] font-medium font-body">Profile</span>
        </a>
      </nav>
    </>
  );
}