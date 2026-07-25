"use client";

import { useNotification } from "@/components/NotificationContext";
import Notification from "./Notification";
import { useEffect, useState } from "react";
import { useAuth } from "@/auth/AuthProvider";
import { getNotificationsByUserId, markAsReadById } from "@/apiServices/notifications.api";

export default function NotificationSideBar() {
    const { open, closeSidebar } = useNotification();
    const { user } = useAuth()
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        if (!user?.id) return;

        let cancelled = false;

        async function loadNotifications() {
            try {
                const res = await getNotificationsByUserId(user.id);
                if (!cancelled) setNotifications(res);
            } catch (err) {
                console.error("Failed to load notifications", err);
                setNotifications([])
            }
        }

        loadNotifications();

        return () => {
            cancelled = true;
        };
    }, [user?.id]);

    const handleMarkAsRead = async (notificationId) => {
        try {
            const res = await markAsReadById(notificationId);
            if (res) {
                setNotifications((prevNotifications) =>
                    prevNotifications.map((notification) =>
                        notification.id === notificationId
                            ? { ...notification, read: true }
                            : notification
                    )
                );
            }
        } catch (error) {
            console.error("Failed to mark notification as read", error);
        }
    };

    const markAsReadAll = async (user_id) => {
        try {
            const res = await markAsReadAll(user_id)
            if (res) {
                setNotifications(res)
            }
        } catch (error) {
            console.error("Failed to mark all notifications as read", error);
        }
    }

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

                    <button className="text-sm font-semibold text-primary hover:opacity-80 transition-opacity" onClick={() => markAsReadAll(user.id)}>
                        Mark all as read
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {!notifications ? (
                        <p className="text-center text-on-surface-variant mt-8">
                            No notifications yet
                        </p>
                    ) : (
                        notifications.map((notification) => (
                            <Notification
                                key={notification.id}
                                notification={notification}
                                onMarkRead={handleMarkAsRead}
                            />
                        ))
                    )}
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