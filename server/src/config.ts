import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    nodeEnv: process.env.NODE_ENV,
    cookieName: process.env.COOKIE_NAME,
    frontendUrl: process.env.FRONTEND_URL,
    backendUrl: process.env.BACKEND_URL,
    dataModelUrl: process.env.DATA_MODEL_URL,
    jwt: {
      accessSecret: process.env.JWT_ACCESS_SECRET,
      accessExpiration: process.env.JWT_ACCESS_EXPIRATION,
      refreshSecret: process.env.JWT_REFRESH_SECRET,
      refreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
    },
    sendGrid: {
      apiKey: process.env.SENDRID_API_KEY,
      sender: process.env.SENDRID_SENDER,
    },
    mailTrap: {
      host: process.env.MAILTRAP_HOST,
      username: process.env.MAILTRAP_USERNAME,
      password: process.env.MAILTRAP_PASSWORD,
    },
  };
});
