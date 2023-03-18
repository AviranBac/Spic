import jwt from "jsonwebtoken";
import { IToken } from "../db/schemas/user.schema";

interface UserIDJwtPayload extends jwt.JwtPayload {
  userId: string;
}

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

export const updateRefreshTokensList = (tokens: IToken[], token: string): IToken[] => {
  const refreshToken = { token, expiryDate: new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_EXPIRATION_IN_MINUTES) * 60 * 1000) };
  tokens.push(refreshToken);
  return tokens;
}

export const clearExpiryedTokens = (tokens: IToken[], expiryToken?: string): IToken[] => {
  return tokens.filter(token => { 
    console.log(`token.expiryDate.getTime() > new Date().getTime(): ${token.expiryDate.getTime() > new Date().getTime()}`)
    console.log(`expiryToken ? token.token !== expiryToken : true: ${expiryToken ? token.token !== expiryToken : true}`)
    return token.expiryDate.getTime() > new Date().getTime() && (expiryToken ? token.token !== expiryToken : true)});
}
