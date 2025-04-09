import axios from "axios"
import {toast} from "react-toastify"

export const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    headers:{
        "Content-Type":"application/json"
    },
})
axiosInstance.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("token")
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)
axiosInstance.interceptors.response.use(
    (resposne)=>resposne,
    (error)=>{
        if(error?.response&&error?.response?.data&& error?.response?.data?.message){
            toast.error(error.data.message)
        }
        else{
            toast.error("An unexpected error occured")
        }
        return Promise.reject(error)
    }
)