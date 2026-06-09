"use client"

import { supabase } from "@/apiServices/supabase";
import { useEffect, useState, createContext, useContext } from "react";
import { getUserBySupabaseToken } from "@/apiServices/user.api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const initAuth = async () => {
        setLoading(true);

        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session) {
            setUser(null);
            setLoading(false);
            return;
        }

        const token = data.session.access_token;

        try {
            const res = await getUserBySupabaseToken(token);
            setUser(res);
        } catch (err) {
            console.log("Error fetching user:", err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        initAuth();

        const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setLoading(true);

            if (!session) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const res = await getUserBySupabaseToken(
                    session.access_token
                );
                setUser(res);
            } catch (err) {
                console.log(err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);
    const logOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            logOut,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);