import { supabase } from "@/apiServices/supabase";
import axios from "axios";

const api = axios.create({
    baseURL: "/api",
});

// api.interceptors.request.use(async (config) => {

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
// });

export default api;