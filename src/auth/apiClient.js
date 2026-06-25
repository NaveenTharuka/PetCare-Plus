import { supabase } from "@/apiServices/supabase";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// api.interceptors.request.use(async (config) => {

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
// });

export default api;