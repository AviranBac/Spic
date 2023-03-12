import jwt from "jsonwebtoken";
import { CookieOptions } from "express";
import { IToken } from "../db/schemas/user.schema";

interface UserIDJwtPayload extends jwt.JwtPayload {
  userId: string;
}

export const accessTokenCookieOptions = (): CookieOptions => ({
  expires: new Date(Date.now() + parseInt(process.env.ACCESS_TOKEN_EXPIRATION_IN_MINUTES) * 60 * 1000),
  httpOnly: true,
  sameSite: "lax",
});

export const refreshTokenCookieOptions = (): CookieOptions => ({
  expires: new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_EXPIRATION_IN_MINUTES) * 60 * 1000),
  httpOnly: true,
  sameSite: "lax",
});


export const signToken = (userId: string) => {
  const access_token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRATION_IN_MINUTES}m` });
  const refresh_token = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: `${process.env.REFRESH_TOKEN_EXPIRATION_IN_MINUTES}m` });

  return { access_token, refresh_token };
};

export const verifyToken = (token: string, tokenSceret: string): UserIDJwtPayload | undefined => {
  try {
    return jwt.verify(token, tokenSceret) as UserIDJwtPayload;
  } catch (err) {
    console.log('Error occored, token is expired');
  }
}

export const clearExpiryedTokens = (tokens: IToken[]): IToken[] => {
  return tokens.filter(token => token.expiryDate.getTime() > new Date().getTime());
}
