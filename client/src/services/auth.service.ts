import axiosInstance from "./axios.service";
import UserSessionService, { IUserSession } from "./user-session.service";
import { AxiosResponse } from "axios";

class AuthService {
  async signIn(email: string, password: string) : Promise<IUserSession> {
    return axiosInstance
      .post("/auth/signin", {
        email,
        password
      })
      .then(async (response: AxiosResponse<IUserSession>) => {
        await UserSessionService.setSessionData(response.data);
        return response.data;
      });
  }

  async signOut(): Promise<void> {
    return axiosInstance
      .post("/auth/signout", {
        refresh_token: await UserSessionService.getLocalRefreshToken()
      })
      .then(async () => {
        await UserSessionService.deleteUserSession();
      });
  }

  async signUp(username: string, email: string, password: string, age: number, gender: string) : Promise<IUserSession> {
    return axiosInstance.post("/auth/signup", {
      username,
      email,
      password,
      age,
      gender
    }).then(async () => {
      return await this.signIn(email, password);
    });
  }

  async getCurrentUser() : Promise<IUserSession | null> {
    return await UserSessionService.getSessionData();
  };

  async setCurrentUser(user: IUserSession): Promise<void> {
    await UserSessionService.setSessionData(user);
  };

}

export default new AuthService();