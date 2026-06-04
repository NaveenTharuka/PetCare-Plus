"use client"

import { FcGoogle } from "react-icons/fc";
import styles from "@/app/signup/signup.module.css";
import { supabase } from "@/apiServices/supabase";

export default function LoginWithGoogleButton() {
    const GoogleIcon = <FcGoogle size={24} />

    const LoginWithGoogle = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: 'http://localhost:3000',
                    queryParams: {
                        prompt: 'select_account'
                    }
                }
            })

        } catch (error) {
            console.error('Error logging in:', error)
        }
    }
    return (
        <button
            type="button"
            className={styles.googleSignIn}
            onClick={LoginWithGoogle}
        >
            {GoogleIcon} Login With Google
        </button>
    )
}