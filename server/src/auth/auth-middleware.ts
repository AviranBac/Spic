import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`Started authentication middleware`);
  const accessToken = req.headers.authorization as string;

  if (!accessToken) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .send({ response: "A token is required for authentication" });
  }

  const decoded = verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
  if (!decoded) return res?.status(StatusCodes.UNAUTHORIZED).send({ response: "Invalid Token" });
  return next();
};
