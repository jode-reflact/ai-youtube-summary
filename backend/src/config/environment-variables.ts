export interface EnvironmentVariables {
  // General
  BACKEND_PORT: number;
  FRONTEND_HOST: string;

  // MongoDB
  MONGODB_CONNECTION_STRING: string;

  // Mail
  EMAILS_ENABLED: boolean;
  MAIL_FROM: string;
  MAIL_HOST: string;
  MAIL_PORT: number;
  MAIL_USER: string;
  MAIL_PASSWORD: string;

  // Mail Subjects
  MAIL_SUBJECT_REGISTRATION: string;
  MAIL_SUBJECT_PASSWORD_RESET: string;

  // Auth with JWT
  JWT_SECRET: string;
  ACCESS_TOKEN_EXPIRES_IN: string;
  REFRESH_TOKEN_EXPIRES_IN: string;

  // Users
  TIME_PERIOD_TO_CONFIRM_EMAIL: string;
}
