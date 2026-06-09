import { useAuth } from "./AuthProvider"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "@/components/Loader";
import ErrorMsg from "@/components/ErrorMsg";


export default function ProtectedRoutes({ children }) {
    const { user, loading } = useAuth()
    const router = useRouter()
    useEffect(() => {
        if (loading) return;

        if (!user && !loading) {
            router.push('/login')
        }
    }, [user, loading, router])

    if (loading) {
        return <Loader />
    }

    if (!user) {
        return <ErrorMsg message="User not found. Please login" />
    }

    return children;
}