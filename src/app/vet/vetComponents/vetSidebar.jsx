import styles from '../dashboard/VetDashboard.module.css';

export default function VetSideBar({ navItems }) {
    return (
        <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 flex-col p-4 z-50 bg-surface-container-low dark:bg-surface-container-highest text-label-large">
            {/* Header Brand */}
            <div className="flex items-center gap-3 px-3 py-6 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">
                    <span className={`${styles.iconFilled} material-symbols-outlined`}>pets</span>
                </div>
                <div>
                    <h1 className="font-headline font-black text-primary leading-tight">PetCare Plus</h1>
                    <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">Veterinary Clinic</p>
                </div>
            </div>

            {/* Primary Navigation */}
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <a
                        key={item.label}
                        href="#"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold scale-98 active:scale-95 transition-all duration-200 ${item.active
                            ? 'bg-primary-container text-on-primary-container'
                            : 'text-on-surface-variant hover:bg-surface-container-high'
                            }`}
                    >
                        <span className="material-symbols-outlined">{item.icon}</span>
                        <span>{item.label}</span>
                    </a>
                ))}
            </nav>

            {/* CTA */}
            <button className="mt-6 w-full py-3 px-4 bg-gradient-to-br from-primary to-primary-dim text-white rounded-full font-semibold shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity active:scale-95 transform">
                New Appointment
            </button>

            {/* Footer Navigation */}
            <div className="mt-auto space-y-2 pt-4 border-t border-outline-variant/10">
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg scale-98 active:scale-95 transition-transform">
                    <span className="material-symbols-outlined">help</span>
                    <span>Help Center</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg scale-98 active:scale-95 transition-transform">
                    <span className="material-symbols-outlined">logout</span>
                    <span>Logout</span>
                </a>
            </div>
        </aside>
    )
}