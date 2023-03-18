import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IUserSession {
  access_token: String,
  refresh_token: String,
  email: String,
  username: String
  gender: String
}

class UserSessionService {
  async getSessionData(): Promise<IUserSession | null> {
    let userSession = null;
    try {
      const sessionData = await AsyncStorage.getItem("userSession");
      if (sessionData !== null) {
        userSession = JSON.parse(sessionData);
      }
    } catch (err) {
      console.log(`Error occured while getting user session data from storage: ${err}`);
    }
    return userSession;
  }

  async setSessionData(userSession: IUserSession) {
    try {
      await AsyncStorage.setItem(
        'userSession',
        JSON.stringify(userSession)
      );
      console.log(`setting session date in storage: ${userSession}`)
    } catch (err) {
      console.log(`Error occored whie updating user session in storage: ${err}`)
    }
  }

  async getLocalRefreshToken(): Promise<String> {
    const userSession = await this.getSessionData();
    return userSession == null ? '' : userSession.refresh_token;
  }
  async getLocalAccessToken(): Promise<String> {
    const userSession = await this.getSessionData();
    return userSession == null ? '' : userSession.access_token;
  }

  async setLocalRefreshToken(token: string) {
    const userSession = await this.getSessionData();
    if (userSession === null) {
      console.log("Can't find user session in local storage");
      return;
    }
    userSession.refresh_token = token;
    try {
      await AsyncStorage.setItem(
        'userSession',
        JSON.stringify(userSession)
      );
    } catch (err) {
      console.log(`Error occored whie updating user's refresh token in storage: ${err}`)
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
      await AsyncStorage.setItem(
        'userSession',
        JSON.stringify(userSession)
      );
    } catch (err) {
      console.log(`Error occored whie updating user's access token in storage: ${err}`)
    }
  }

  async deleteUserSession() {
    try {
      await AsyncStorage.removeItem('userSession');
    } catch (err) {
      console.log(`Error occored whie deleting user's session in storage: ${err}`)
    }
  }
}

export default new UserSessionService();