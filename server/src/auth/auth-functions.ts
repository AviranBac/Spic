import bcrypt from "bcrypt";
import { Request, Response, CookieOptions } from "express";

import { StatusCodes } from "http-status-codes";

import * as jwt from "../utils/jwt";
import { validationResult } from "express-validator/check";
import { IUser, IToken, UserModel } from "../db/schemas/user.schema";

export const signUp = async (req: Request, res: Response) => {
  const { email, password, username, gender, age } = req.body;

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
      username,
      gender,
      age,
      tokens: []
    });

    await userModel.save();
    res.status(StatusCodes.OK).send(userModel);
  } catch (err) {
    console.log(`An error occurred during registration: ${err}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};

export const signIn = async (req: Request, res: Response) => {
  console.log('### sign in ###')
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
      
      user.tokens = jwt.updateRefreshTokensList(user.tokens, refresh_token);
      user.tokens = jwt.clearExpiryedTokens(user.tokens);
      const { email, username, gender } = user;
      await user.save();

      return res.status(StatusCodes.OK).send({ email, username, gender, access_token, refresh_token });
    }
    res.status(StatusCodes.BAD_REQUEST).send("Invalid Credentials");
  } catch (err) {
    console.log(`An error occurred during login: ${err}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};

export const signOut = async (req: Request, res: Response) => {
  console.log('### sign out ###')
  const reqRefreshToken = req.body.refresh_token;

  const decoded = jwt.verifyToken(reqRefreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (decoded) {
    const { userId } = decoded;
    try {
      const user = await UserModel.findOne({ _id: userId });
      if (user) {
        user.tokens = jwt.clearExpiryedTokens(user.tokens, reqRefreshToken);
        await user.save();
      }
    } catch (err) {
      console.log(`An error occurred during log out: ${err}`);
    }
  }
  res.status(StatusCodes.OK).send();
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response
) => {
  console.log('### refresh token ###')
  const reqRefreshToken = req.body.refresh_token;

  const decoded = jwt.verifyToken(reqRefreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (!decoded) {
    return res.status(StatusCodes.FORBIDDEN).send({ response: "Could not refresh access token" });
  }

  const { userId } = decoded;

  try {
    const user: any = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(StatusCodes.FORBIDDEN).send();
    }
    const { access_token, refresh_token } = jwt.signToken(user._id);
    user.tokens = jwt.updateRefreshTokensList(user.tokens, refresh_token);
    user.tokens = jwt.clearExpiryedTokens(user.tokens, reqRefreshToken);

    await user.save();

    res.status(StatusCodes.OK).send({ access_token, refresh_token });
  } catch (err) {
    console.log(`An error occurred during refresh token: ${err}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};
