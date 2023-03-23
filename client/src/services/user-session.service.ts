import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IUserSession {
  access_token: string,
  refresh_token: string,
  email: string,
  username: string,
  gender: 'MALE' | 'FEMALE'
}

const userSessionKey = 'userSession';

class UserSessionService {
  async getSessionData(): Promise<IUserSession | null> {
    let userSession = null;
    try {
      const sessionData = await AsyncStorage.getItem(userSessionKey);
      if (sessionData !== null) {
        userSession = JSON.parse(sessionData);
      }
    } catch (err) {
      console.error(`Error occurred while getting user session data from storage: ${err}`);
    }
    return userSession;
  }

  async setSessionData(userSession: IUserSession) {
    try {
      await AsyncStorage.setItem(userSessionKey, JSON.stringify(userSession));
    } catch (err) {
      console.error(`Error occurred while updating user session in storage: ${err}`)
    }
  }

  async getLocalRefreshToken(): Promise<string> {
    const userSession = await this.getSessionData();
    return userSession?.refresh_token || '';
  }
  async getLocalAccessToken(): Promise<string> {
    const userSession = await this.getSessionData();
    return userSession?.access_token || '';
  }

  async setLocalRefreshToken(token: string) {
    const userSession = await this.getSessionData();
    if (userSession === null) {
      console.log("Can't find user session in local storage");
      return;
    }
    userSession.refresh_token = token;
    try {
      await AsyncStorage.setItem(userSessionKey, JSON.stringify(userSession));
    } catch (err) {
      console.error(`Error occurred while updating user's refresh token in storage: ${err}`)
    }
  }

  async setLocalAccessToken(token: string) {
    const userSession = await this.getSessionData();
    if (userSession === null) {
      console.log("Can't find user session in local storage");
      return;
    }
    userSession.access_token = token;
    try {
      await AsyncStorage.setItem(userSessionKey, JSON.stringify(userSession));
    } catch (err) {
      console.error(`Error occurred while updating user's access token in storage: ${err}`)
    }
  }

  async deleteUserSession() {
    try {
      await AsyncStorage.removeItem(userSessionKey);
    } catch (err) {
      console.error(`Error occurred while deleting user's session in storage: ${err}`)
    }
  }
}

export default new UserSessionService();