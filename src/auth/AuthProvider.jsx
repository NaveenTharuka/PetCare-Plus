"use client"

import { supabase } from "@/apiServices/supabase";
import { useEffect, useState, createContext, useContext, useMemo, useCallback } from "react";
import { getUserBySupabaseToken } from "@/apiServices/user.api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = useCallback(async (token) => {
        try {
            const res = await getUserBySupabaseToken(token);
            setUser(res);
            return res;
        } catch (err) {
            console.log("Error fetching user:", err);
            setUser(null);
            throw err;
        }
    }, []);

    const initAuth = useCallback(async () => {
        setLoading(true);

        const { data, error } = await supabase.auth.getSession();

        if (error || !data?.session) {
            setUser(null);
            setLoading(false);
            return;
        }

        await fetchUser(data.session.access_token);
        setLoading(false);
    }, [fetchUser]);

    const logOut = useCallback(async () => {
        await supabase.auth.signOut();
        setUser(null);
    }, []);

    useEffect(() => {
        initAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (!session) {
                    setUser(null);
                    setLoading(false);
                    return;
                }

                try {
                    await fetchUser(session.access_token);
                } finally {
                    setLoading(false);
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [initAuth, fetchUser]);

    const value = useMemo(() => ({
        user,
        logOut,
        loading,
        isAuthenticated: !!user
    }), [user, logOut, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};