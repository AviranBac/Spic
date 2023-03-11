import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const access_token = req.cookies.access_token as string;

  if (!access_token) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .send("A token is required for authentication");
  }

  const decoded = verifyToken(access_token, process.env.ACCESS_TOKEN_SECRET as string);
  if (!decoded) return res.status(StatusCodes.UNAUTHORIZED).send("Invalid Token");
  return next();
};
