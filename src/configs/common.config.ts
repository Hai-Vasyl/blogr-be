import { registerAs } from '@nestjs/config';

export const commonConfig = registerAs('common', () => {
  const { PORT, NODE_ENV, JWT_SECRET } = process.env;

  return { port: PORT, environment: NODE_ENV, jwtSecret: JWT_SECRET };
});
