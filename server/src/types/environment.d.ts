export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        DB_USERNAME: string;
        DB_PASSWORD: string;
        DB_SCHEMA_NAME: string;
        ACCESS_TOKEN_SECRET: string;
        REFRESH_TOKEN_SECRET: string;
        ACCESS_TOKEN_EXPIRATION_IN_HOURS: string;
        REFRESH_TOKEN_EXPIRATION_IN_HOURS: string;
    }
  }
}