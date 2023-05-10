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
        GOOGLE_APPLICATION_CREDENTIALS: string;
        UNSPLASH_API_KEYS: string;
        S3_BUCKET_NAME: string;
        S3_ACCESS_KEY_ID: string;
        S3_SECRET_ACCESS_KEY: string;
    }
  }
}