import axios, {AxiosInstance, InternalAxiosRequestConfig} from "axios"

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
}); 

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig)=>{
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config
})  

export default axiosInstance