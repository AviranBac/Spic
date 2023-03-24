import axiosInstance from "./axios.service";
import UserSessionService from "./user-session.service";
import { AxiosResponse } from "axios";
import { IUserSession } from "../store/auth/auth.model";

class AuthService {
  async login(email: string, password: string) : Promise<IUserSession> {
    return axiosInstance
      .post("/auth/login", {
        email,
        password
      })
      .then(async (response: AxiosResponse<IUserSession>) => {
        await UserSessionService.setSessionData(response.data);
        return response.data;
      });
  }

  async logout(): Promise<AxiosResponse<void>> {
    return axiosInstance
      .post("/auth/logout", {
        refresh_token: await UserSessionService.getLocalRefreshToken()
      })
      .finally(async () => {
        await UserSessionService.deleteUserSession();
      });
  }

  async register(username: string, email: string, password: string, age: number, gender: string) : Promise<IUserSession> {
    return axiosInstance.post("/auth/register", {
      username,
      email,
      password,
      age,
      gender
    }).then(async () => {
      return await this.login(email, password);
    });
  }

  async getCurrentUser() : Promise<IUserSession | null> {
    return await UserSessionService.getSessionData();
  };

}

export default new AuthService();