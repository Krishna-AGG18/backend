import axios from 'axios';

export const apiClient = axios.create({
    baseURL : import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
    withCredentials : true,
    headers : {
        'Content-Type': 'application/json',
    },
})

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

apiClient.interceptors.response.use(
    (response) => response,
    async (error) =>{
        return Promise.reject(error)
    }
)