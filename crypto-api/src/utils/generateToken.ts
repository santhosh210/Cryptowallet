import jwt from 'jsonwebtoken';

const accessTokenSecret = 'your_access_token_secret';
const refreshTokenSecret = 'your_refresh_token_secret';

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, accessTokenSecret, { expiresIn: '15m' });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, refreshTokenSecret, { expiresIn: '7d' });
};

export const verifyToken = (token: string, secret: string): string | object => {
  return jwt.verify(token, secret);
};
