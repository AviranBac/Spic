import api from "./api";
import UserSessionService, { IUserSession } from "./user-session.service";

class AuthService {
  async signIn(email: string, password: string) : Promise<IUserSession> {
    return api
      .post("/auth/signin", {
        email,
        password
      })
      .then(async (response: any) => {
        console.log(`Response for sign in ${JSON.stringify(response.data.status)}`);
        const { access_token, refresh_token, email, username, gender } = response.data;
        const userSession : IUserSession= { access_token, refresh_token, email, username, gender };
        await UserSessionService.setSessionData(userSession);
        return userSession;
      });
  }

  async signOut() {
    return api
      .post("/auth/signout", {
        refresh_token: await UserSessionService.getLocalRefreshToken()
      })
      .then(async (response: any) => {
        console.log(`Response for sign out ${JSON.stringify(response.data.status)}, about to delete user session from local storage`);
        await UserSessionService.deleteUserSession();
      });
  }

  async signUp(username: string, email: string, password: string, age: number, gender: string) : Promise<IUserSession> {
    return api.post("/auth/signup", {
      username,
      email,
      password,
      age,
      gender
    }).then(async (response: any) => {
      console.log(`Response for sign up ${JSON.stringify(response.data.status)}`);
      const userSession : IUserSession = await this.signIn(email, password);
      return userSession;
    });
  }

  async getCurrentUser() : Promise<IUserSession | null>{
    return await UserSessionService.getSessionData();
  };

  async setCurrentUser(user: IUserSession) {
    await UserSessionService.setSessionData(user);
  };

}

export default new AuthService();