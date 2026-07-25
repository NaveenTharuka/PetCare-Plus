"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    getNotificationsByUserId,
    markAsReadById,
    markAsReadAll
} from "@/apiServices/notifications.api"

import notificationSocket
    from "@/apiServices/websocket"

import { useAuth } from "@/auth/AuthProvider";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {

    const { user } = useAuth();

    // sidebar state
    const [open, setOpen] = useState(false);

    // notification data
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    async function loadNotifications() {
        if (!user?.id) return;
        try {
            setLoading(true);
            const data = await getNotificationsByUserId(user.id);
            setNotifications(data || []);
        } catch (error) {
            console.log(
                "Notification loading error",
                error
            );
        }
        finally {
            setLoading(false);
        }
    }

    function addNotification(notification) {

        setNotifications(prev => {

            const exists = prev.some(
                item => item.id === notification.id
            );

            if (exists) {
                return prev;
            }

            return [
                notification,
                ...prev
            ];

        });
    }

    async function markAsRead(id) {
        try {
            await markAsReadById(id);
            setNotifications(prev =>
                prev.map(item =>
                    item.id === id
                        ? { ...item, read: true, is_read: true }
                        : item
                )
            );
        }
        catch (error) {
            console.log(error);
        }
    }

    async function markAllAsRead() {
        if (!user?.id) return;
        try {
            await markAsReadAll(user.id);
            setNotifications(prev =>
                prev.map(item => ({
                    ...item,
                    read: true,
                    is_read: true
                }))
            );
        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {

        if (!user) return;

        // Load missed notifications
        loadNotifications();

        // realtime connection
        notificationSocket.connect(

            user.id,

            (notification) => {
                addNotification(notification);
            }

        );

        return () => {
            notificationSocket.disconnect();
        };

    }, [user]);

    const unreadCount =
        notifications.filter(
            item => !item.read && !item.is_read
        ).length;

    return (

        <NotificationContext.Provider
            value={{

                // sidebar
                open,
                openSidebar: () => setOpen(true),
                closeSidebar: () => setOpen(false),
                toggleSidebar: () => setOpen(prev => !prev),

                // notifications
                notifications,
                unreadCount,
                loading,
                markAsRead,
                markAllAsRead,
                loadNotifications

            }}

        >

            {children}

        </NotificationContext.Provider>

    );

}

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotifications must be used within a NotificationProvider");
    }
    return context;
};