import axios from "axios";
import TokenService from "./user-session.service";

const instance = axios.create({
  baseURL: "http://192.168.0.109:8080",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const token = await TokenService.getLocalAccessToken();
    console.log(`Setting access token for request: ${JSON.stringify(token)}`);

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
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/auth/signin") {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post("/auth/refreshtoken", {
            refresh_token: await TokenService.getLocalRefreshToken(),
          });

          if (!!rs) {
            const { accessToken } = rs.data;
            await TokenService.setLocalAccessToken(accessToken);

            return instance(originalConfig);
          }
        } catch (error) {
          return Promise.reject(error);
        }
      } else if (err.response.status === 403) {
        await TokenService.deleteUserSession();
        return Promise.reject('Refresh token expired');
      }
    }
    return Promise.reject(err);
  }
);

export default instance;