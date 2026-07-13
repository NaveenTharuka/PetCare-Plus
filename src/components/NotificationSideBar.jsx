"use client";

import { useNotification } from "@/components/NotificationContext";
import Notification from "./Notification";

export default function NotificationSideBar() {
    const { open, closeSidebar } = useNotification();

    const notifications = [
        {
            type: "vaccination",
            title: "Vaccination Reminder",
            message: "Luna's DHPP booster is due in 5 days.",
            icon: "vaccines",
            read: false,
        },
        {
            type: "report",
            title: "Report Processed",
            message: "The blood test results for Oliver are now available in the Health Vault.",
            icon: "description",
            read: true,
        },
        {
            type: "profile",
            title: "Profile Updated",
            message: "You've successfully updated your contact information.",
            icon: "manage_accounts",
            read: true,
        },
        {
            type: "welcome",
            title: "Welcome to PetCare+",
            message: "Start by adding your first pet to the sanctuary.",
            icon: "celebration",
            read: false,
        },
    ];

    return (
        <div
            className={`fixed inset-0 z-60 flex justify-end transition-all duration-300 ${open ? "pointer-events-auto" : "pointer-events-none"
                }`}
        >
            {/* Backdrop */}
            <div
                onClick={closeSidebar}
                className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"
                    }`}
            />

            {/* Sidebar */}
            <aside
                className={`relative w-full max-w-sm h-full bg-surface-container-lowest shadow-2xl flex flex-col font-['Plus_Jakarta_Sans'] transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-on-surface">
                        Notifications
                    </h2>

                    <button className="text-sm font-semibold text-primary hover:opacity-80 transition-opacity">
                        Mark all as read
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {notifications.map((notification) => (
                        <Notification
                            key={notification.type}
                            notification={notification}
                        />
                    ))}
                </div>

                <div className="p-6 border-t border-outline-variant/10">
                    <button
                        onClick={closeSidebar}
                        className="w-full py-3 rounded-full bg-surface-container-high text-on-surface font-semibold hover:bg-surface-container-highest transition-colors"
                    >
                        Close Notifications
                    </button>
                </div>
            </aside>
        </div>
    );
}