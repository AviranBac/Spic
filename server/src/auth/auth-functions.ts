import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { validationResult } from "express-validator/check";
import { User, UserModel } from "../db/schemas/user.schema";
import { generateToken, verifyToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    return;
  }

  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res
        .status(StatusCodes.CONFLICT)
        .send("User Already Exist. Please Login");
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const userModel: User = new UserModel({
      email,
      password: encryptedPassword,
    });

    await userModel.save();
    res.status(StatusCodes.OK).send(userModel);
  } catch (err) {
    console.log(`An error occurred during registration: ${err}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    return;
  }

  try {
    const user: any = await UserModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = generateToken(user._id, "accessToken");
      const refreshToken = generateToken(user._id, "refreshToken");

      res.cookie("access_token", accessToken.token, accessToken.cookieTokenOptions);
      res.cookie("refresh_token", refreshToken.token, refreshToken.cookieTokenOptions);
      return res.status(StatusCodes.OK).send({ user, access_token: accessToken.token });
    }

    res.status(StatusCodes.BAD_REQUEST).send("Invalid Credentials");
  } catch (err) {
    console.log(`An error occurred during login: ${err}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie("access_token", "", { maxAge: 1 });
  res.cookie("refresh_token", "", { maxAge: 1 });
  res.status(StatusCodes.OK).send();
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response
) => {
  const refresh_token = req.cookies.refresh_token as string;

  const decoded = verifyToken(refresh_token, process.env.REFRESH_TOKEN_SECRET as string);
  if (!decoded) {
    return res.status(StatusCodes.FORBIDDEN).send("Could not refresh access token");
  }

  const { userId } = decoded;

  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(StatusCodes.FORBIDDEN).send();
    }

    const accessToken = generateToken(user._id, "accessToken");
    res.cookie(
      "access_token",
      accessToken.token,
      accessToken.cookieTokenOptions
    );
    res.status(StatusCodes.OK).send();
  } catch (err) {
    console.log(`An error occurred during refresh token: ${err}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};
