import jwt from "jsonwebtoken";
import { CookieOptions } from "express";

interface UserIDJwtPayload extends jwt.JwtPayload {
    userId: string;
}

const tokenCookieOptions = (expiryInMinutes: number): CookieOptions => ({
  expires: new Date(Date.now() + expiryInMinutes * 60 * 1000),
  httpOnly: true,
  sameSite: "lax",
});

export const generateToken = (
  userId: string,
  tokenType: "accessToken" | "refreshToken"
) => {
  let tokenSceret, tokenExpiry;
  if (tokenType === "accessToken") {
    tokenSceret = process.env.ACCESS_TOKEN_SECRET as string;
    tokenExpiry = process.env.ACCESS_TOKEN_EXPIRATION_IN_MINUTES as string;
  } else {
    tokenSceret = process.env.REFRESH_TOKEN_SECRET as string;
    tokenExpiry = process.env.REFRESH_TOKEN_EXPIRATION_IN_MINUTES as string;
  }

  const token = jwt.sign({ userId }, tokenSceret, { expiresIn: `${tokenExpiry}m` });

  const cookieTokenOptions = tokenCookieOptions(parseInt(tokenExpiry));

  return { token, cookieTokenOptions };
};

export const verifyToken = (token : string, tokenSceret: string) : UserIDJwtPayload | undefined => {
    try {
        return jwt.verify(token, tokenSceret) as UserIDJwtPayload;
    } catch (err) {
        console.log('Error occored, token is expired');
    }
}
