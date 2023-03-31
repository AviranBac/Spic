import jwt from "jsonwebtoken";
import { IToken } from "../db/schemas/user.schema";

interface UserIDJwtPayload extends jwt.JwtPayload {
  userId: string;
}

export const signToken = (userId: string) => {
  const access_token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRATION_IN_HOURS}h` });
  const refresh_token = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: `${process.env.REFRESH_TOKEN_EXPIRATION_IN_HOURS}h` });

  return { access_token, refresh_token };
};

export const verifyToken = (token: string, tokenSecret: string): UserIDJwtPayload | undefined => {
  try {
    return jwt.verify(token, tokenSecret) as UserIDJwtPayload;
  } catch (err) {
    console.error("Error occurred while verifying a user's token, it might have been expired");
  }
}

export const updateRefreshTokensList = (currentTokens: IToken[], newRefreshToken: string): IToken[] => {
  const refreshToken : IToken = { token: newRefreshToken, expiryDate: new Date(Date.now() + parseFloat(process.env.REFRESH_TOKEN_EXPIRATION_IN_HOURS) * 60 * 60 * 1000) };
  return [...currentTokens, refreshToken];
}

export const clearExpiredTokens = (tokens: IToken[], usedToken?: string): IToken[] => {
  const currTime = new Date().getTime();
  return tokens.filter(currTokenObj => currTokenObj.expiryDate.getTime() > currTime && (usedToken ? currTokenObj.token !== usedToken : true));
}
