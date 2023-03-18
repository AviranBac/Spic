import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`Authentication middleware`);
  const accessToken = req.headers.authorization as string;

  if (!accessToken) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .send({ response: "A token is required for authentication" });
  }

  const decoded = verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET as string);
  if (!decoded) return res.status(StatusCodes.UNAUTHORIZED).send({ response: "Invalid Token" });
  return next();
};
