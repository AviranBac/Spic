export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        ACCESS_TOKEN_SECRET: string;
        REFRESH_TOKEN_SECRET: string;
        ACCESS_TOKEN_EXPIRATION_IN_HOURS: string;
        REFRESH_TOKEN_EXPIRATION_IN_HOURS: string;
    }
  }
}