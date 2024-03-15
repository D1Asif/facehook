import { useEffect } from "react";
import { api } from "../api";
import { useAuth } from "./useAuth";
import axios from "axios";

const useAxios = () => {
    const {auth, setAuth} = useAuth();
    useEffect(() => {
        // Add a request interceptor
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                const authToken = auth?.authToken;
                if (authToken) {
                    config.headers.Authorization = `Bearer ${authToken}`
                }
                return config;
            },
            (error) => Promise.reject(error)
        )

        // Add a response interceptor
        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async(error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    // eslint-disable-next-line no-useless-catch
                    try {
                        const refreshToken = auth?.refreshToken;
                        const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`, {refreshToken});
                        const {token} = response.data;
                        setAuth({...auth, authToken: token});

                        console.log(`New token: ${token}`);

                        originalRequest.headers.Authorization = `Bearer ${token}`

                        return axios(originalRequest);
                    } catch (err) {
                        throw(err);
                    }
                }
            }
        )

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        }

    }, [auth.authToken]);

    return {api};
}

export default useAxios;