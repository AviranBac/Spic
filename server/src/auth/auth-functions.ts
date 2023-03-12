import bcrypt from "bcrypt";
import { Request, Response, CookieOptions } from "express";

import { StatusCodes } from "http-status-codes";

import * as jwt from "../utils/jwt";
import { validationResult } from "express-validator/check";
import { IUser, IToken, UserModel } from "../db/schemas/user.schema";

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

    const userModel: IUser = new UserModel({
      email,
      password: encryptedPassword,
      tokens: []
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
    const user = await UserModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { access_token, refresh_token } = jwt.signToken(user._id);

      const refreshTokenCookieOptions: CookieOptions = jwt.refreshTokenCookieOptions();

      const token = { token: refresh_token, expiryDate: refreshTokenCookieOptions.expires! };
      user.tokens.push(token);
      user.tokens = jwt.clearExpiryedTokens(user.tokens);
      await user.save();

      res.cookie("access_token", access_token, jwt.accessTokenCookieOptions());
      res.cookie("refresh_token", refresh_token, refreshTokenCookieOptions);
      return res.status(StatusCodes.OK).send({ user, access_token });
    }

    res.status(StatusCodes.BAD_REQUEST).send("Invalid Credentials");
  } catch (err) {
    console.log(`An error occurred during login: ${err}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};

export const logout = async (req: Request, res: Response) => {
  const reqRefreshToken = req.cookies.refresh_token as string;

  const decoded = jwt.verifyToken(reqRefreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (decoded) {
    const { userId } = decoded;
    try {
      const user: any = await UserModel.findOne({ _id: userId });
      if (user) {
        user.tokens = user.tokens.filter((userToken: IToken) => userToken.token !== reqRefreshToken);
        user.tokens = jwt.clearExpiryedTokens(user.tokens);
        await user.save();
      }
    } catch (err) {
      console.log(`An error occurred during log out: ${err}`);
    }
  }
  res.cookie("access_token", "", { maxAge: 1 });
  res.cookie("refresh_token", "", { maxAge: 1 });
  res.status(StatusCodes.OK).send();
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response
) => {
  const reqRefreshToken = req.cookies.refresh_token as string;

  const decoded = jwt.verifyToken(reqRefreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (!decoded) {
    return res.status(StatusCodes.FORBIDDEN).send("Could not refresh access token");
  }

  const { userId } = decoded;

  try {
    const user: any = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(StatusCodes.FORBIDDEN).send();
    }
    const { access_token, refresh_token } = jwt.signToken(user._id);

    const refreshTokenCookieOptions: CookieOptions = jwt.refreshTokenCookieOptions();
    const token: IToken = { token: refresh_token, expiryDate: refreshTokenCookieOptions.expires! };
    const index = user.tokens.findIndex((userToken: IToken) => userToken.token === reqRefreshToken);
    if (index !== -1) user.tokens[index] = token;
    user.tokens = jwt.clearExpiryedTokens(user.tokens);
    await user.save();

    res.cookie("access_token", access_token, jwt.accessTokenCookieOptions());
    res.cookie("refresh_token", refresh_token, refreshTokenCookieOptions);
    res.status(StatusCodes.OK).send();
  } catch (err) {
    console.log(`An error occurred during refresh token: ${err}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};
