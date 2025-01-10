import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    nodeEnv: process.env.NODE_ENV,
    sendGridApiKey: process.env.SENDRID_API_KEY,
    mailTrap: {
      host: process.env.MAILTRAP_HOST,
      username: process.env.MAILTRAP_USERNAME,
      password: process.env.MAILTRAP_PASSWORD,
    },
  };
});
