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
    redis: {
      url: process.env.REDIS_URL,
      ttl: +process.env.REDIS_TTL || 5,
    },
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
      mainFolder: process.env.CLOUDINARY_MAIN_FOLDER,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackUri: process.env.GOOGLE_CALLBACK_URI,
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID,
      callbackUri: process.env.APPLE_CALLBACK_URI,
    },
  };
});
