import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUserSession } from "../store/auth/auth.model";

class UserSessionService {
  storageKey = 'userSession';

  async getSessionData(): Promise<IUserSession | null> {
    let userSession: IUserSession | null = null;
    try {
      const sessionData = await AsyncStorage.getItem(this.storageKey);
      if (sessionData !== null) {
        userSession = JSON.parse(sessionData);
      }
    } catch (err) {
      console.error(`Error occurred while getting user session data from storage: ${err}`);
    }
    return userSession;
  }

  async setSessionData(userSession: IUserSession): Promise<void> {
    try {
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(userSession));
    } catch (err) {
      console.error(`Error occurred while updating user session in storage: ${err}`)
    }
  }

  async getLocalRefreshToken(): Promise<string> {
    const userSession: IUserSession | null = await this.getSessionData();
    return userSession?.refresh_token || '';
  }
  async getLocalAccessToken(): Promise<string> {
    const userSession: IUserSession | null = await this.getSessionData();
    return userSession?.access_token || '';
  }

  async setLocalRefreshToken(token: string): Promise<void> {
    const userSession: IUserSession | null = await this.getSessionData();
    if (userSession === null) {
      console.log("Can't find userSession in local storage");
      return;
    }
    userSession.refresh_token = token;
    try {
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(userSession));
    } catch (err) {
      console.error(`Error occurred while updating user's refresh token in storage: ${err}`)
    }
  }

  async setLocalAccessToken(token: string): Promise<void> {
    const userSession: IUserSession | null = await this.getSessionData();
    if (userSession === null) {
      console.log("Can't find userSession in local storage");
      return;
    }
    userSession.access_token = token;
    try {
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(userSession));
    } catch (err) {
      console.error(`Error occurred while updating user's access token in storage: ${err}`)
    }
  }

  async deleteUserSession(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.storageKey);
    } catch (err) {
      console.error(`Error occurred while deleting user's session in storage: ${err}`)
    }
  }
}

export default new UserSessionService();