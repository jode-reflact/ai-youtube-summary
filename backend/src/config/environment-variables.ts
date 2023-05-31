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
  MAIL_REGISTRATION_SUBJECT: string;
}
