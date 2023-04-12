import bcrypt from "bcrypt";
import { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

import * as jwtUtils from "../utils/jwt";
import { validationResult } from "express-validator/check";
import { IUser, UserModel } from "../db/schemas/user.schema";

export const register = async (req: Request, res: Response) => {
  const { email, password, username, gender, age } = req.body;
  console.log(`A register request has been received for ${email}`);

  let status, response;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    status = StatusCodes.BAD_REQUEST;
    response = { errors: errors.array() };
  } else {
    try {
      const userExists : IUser | null = await UserModel.findOne({ email });
      if (userExists) {
        status = StatusCodes.CONFLICT;
        response = "User Already Exist. Please Login";
      } else {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const userModel: IUser = new UserModel({
          email,
          password: encryptedPassword,
          username,
          gender,
          age,
          refreshTokens: []
        });

        await userModel.save();
        status = StatusCodes.OK;
        response = userModel;
      }
    } catch (err) {
      console.error(`An error occurred during registration: ${err}`);
      status = StatusCodes.INTERNAL_SERVER_ERROR;
      response = `${err}`;
    }
  }
  res.status(status).send(response);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(`A login request has been received for ${email}`);

  let status, response;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    status = StatusCodes.BAD_REQUEST;
    response = { errors: errors.array() };
  } else {
    try {
      const user : IUser | null = await UserModel.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const { access_token, refresh_token } = jwtUtils.signToken(user._id);

        user.refreshTokens = jwtUtils.updateRefreshTokensList(user.refreshTokens, refresh_token);
        user.refreshTokens = jwtUtils.clearExpiredTokens(user.refreshTokens);
        const { email, username, gender, age } = user;
        await user.save();

        status = StatusCodes.OK;
        response = { email, username, age, gender, access_token, refresh_token };
      } else {
        status = StatusCodes.BAD_REQUEST;
        response = "Invalid Credentials";
      }
    } catch (err) {
      console.error(`An error occurred during login: ${err}`);
      status = StatusCodes.INTERNAL_SERVER_ERROR;
      response = `${err}`;
    }
  }
  res.status(status).send(response);
};

export const logout = async (req: Request, res: Response) => {
  const reqRefreshToken = req.body.refresh_token;

  const decoded = jwtUtils.verifyToken(reqRefreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (decoded) {
    const { userId } = decoded;
    try {
      const user : IUser | null = await UserModel.findOne({ _id: userId });
      if (user) {
        console.log(`A logout request has been received from ${user.email}`);
        user.refreshTokens = jwtUtils.clearExpiredTokens(user.refreshTokens, reqRefreshToken);
        await user.save();
      }
    } catch (err) {
      console.error(`An error occurred during logout: ${err}`);
    }
  }
  res.status(StatusCodes.OK).send();
};

export const refreshTokenHandler = async (
  req: Request,
  res: Response
) => {
  const reqRefreshToken = req.body.refresh_token;

  let status, response;
  const decoded = jwtUtils.verifyToken(reqRefreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (!decoded) {
    status = StatusCodes.FORBIDDEN;
    response = "Could not refresh access token";
  } else {
    const { userId } = decoded;

    try {
      const user : IUser | null = await UserModel.findOne({ _id: userId });
      if (!user) {
        status = StatusCodes.FORBIDDEN;
        response = "User not found";
      } else {
        console.log(`A Refresh Token request has been received for ${user.email}`);
        const { access_token, refresh_token } = jwtUtils.signToken(user._id);
        user.refreshTokens = jwtUtils.updateRefreshTokensList(user.refreshTokens, refresh_token);
        user.refreshTokens = jwtUtils.clearExpiredTokens(user.refreshTokens, reqRefreshToken);

        await user.save();
        status = StatusCodes.OK;
        response = { access_token, refresh_token };
      }
    } catch (err) {
      console.error(`An error occurred during refresh token: ${err}`);
      status = StatusCodes.INTERNAL_SERVER_ERROR;
      response = `${err}`;
    }
  }
  res.status(status).send(response);
};
