import axios from "axios";
import { logout } from "./logout";

const api = axios.create({
    baseURL: process.env.API_URL || "http://localhost:4000"
})

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            logout()
        }
        throw error
    }
)

export default api