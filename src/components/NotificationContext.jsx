"use client";

import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [open, setOpen] = useState(false);

    return (
        <NotificationContext.Provider
            value={{
                open,
                openSidebar: () => setOpen(true),
                closeSidebar: () => setOpen(false),
                toggleSidebar: () => setOpen((prev) => !prev),
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotification = () => useContext(NotificationContext);