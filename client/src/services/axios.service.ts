import axios, { AxiosInstance, AxiosResponse, HttpStatusCode } from "axios";
import TokenService from "./user-session.service";
import { config } from "../config/config";

type RefreshResponse = {
  access_token: string,
  refresh_token: string
};

const instance: AxiosInstance = axios.create({
  baseURL: config.serverUrl,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  }
});

instance.interceptors.request.use(
  async (config) => {
    const token: string = await TokenService.getLocalAccessToken();
    if (token) {
      config.headers.authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/auth/signin") {
      // Access Token was expired
      if (err.response.status === HttpStatusCode.Unauthorized && !originalConfig._retry) {
        originalConfig._retry = true;

        console.log('Access token expired');
        try {
          const refreshResponse: AxiosResponse<RefreshResponse> = await instance.post("/auth/refreshtoken", {
            refresh_token: await TokenService.getLocalRefreshToken(),
          });

          if (!!refreshResponse) {
            console.log('Received new access token');
            const { access_token, refresh_token } = refreshResponse.data;
            await TokenService.setLocalAccessToken(access_token);
            await TokenService.setLocalRefreshToken(refresh_token);

            return instance(originalConfig);
          }
        } catch (error) {
          return Promise.reject(error);
        }
      } else if (err.response.status === HttpStatusCode.Forbidden) {
        console.log('Refresh token expired')
        await TokenService.deleteUserSession();
        return Promise.reject('Refresh token expired');
      }
    }
    return Promise.reject(err);
  }
);

export default instance;