import UserSessionService from "../services/user-session.service";
import { logoutThunk } from "../store/auth/auth.slice";
import axiosInstance from "../services/axios.service";
import { AxiosResponse, HttpStatusCode } from "axios";
import { useAppDispatch } from "../store/hooks";

type RefreshResponse = {
    access_token: string,
    refresh_token: string
};

const useAxiosInterceptor = () => {
    const dispatch = useAppDispatch();

    axiosInstance.interceptors.request.use(
        async (config) => {
            const token: string = await UserSessionService.getLocalAccessToken();
            if (token) {
                config.headers.authorization = token;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (res: AxiosResponse) => res,
        async (err) => {
            try {
                const originalConfig = err.config;

                if (originalConfig.url !== "/auth/login") {
                    if (err.response.status === HttpStatusCode.Unauthorized && !originalConfig._retry) {
                        originalConfig._retry = true;

                        const refreshResponse: AxiosResponse<RefreshResponse> = await axiosInstance.post("/auth/refresh", {
                            refresh_token: await UserSessionService.getLocalRefreshToken(),
                        });

                        if (!!refreshResponse) {
                            const {access_token, refresh_token} = refreshResponse.data;
                            await UserSessionService.setLocalAccessToken(access_token);
                            await UserSessionService.setLocalRefreshToken(refresh_token);
                            return axiosInstance(originalConfig);
                        }
                    } else if (err.response.status === HttpStatusCode.Forbidden) {
                        await dispatch(logoutThunk());
                        return Promise.reject('Refresh token expired');
                    }
                }

                return Promise.reject(err);
            } catch (error: any) {
                return Promise.reject(error);
            }
        }
    );
};

export default useAxiosInterceptor;