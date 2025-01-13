import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    nodeEnv: process.env.NODE_ENV,
    cookieName: process.env.COOKIE_NAME,
    jwt: {
      accessSecret: process.env.JWT_ACCESS_SECRET,
      accessExpiration: process.env.JWT_ACCESS_EXPIRATION,
      refreshSecret: process.env.JWT_REFRESH_SECRET,
      refreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
    },
  };
});
