import bcrypt from "bcrypt";
import { validationResult } from "express-validator/check";
import { StatusCodes } from "http-status-codes";
import { User, UserModel } from "../db/schemas/user.schema";

export const register = async (req: any, res: any) => {
    console.log('Post request - Register');
    const { email, password } = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }

    try {
      const userExists = await UserModel.findOne({email});
      if (userExists) {
        return res.status(StatusCodes.CONFLICT).send("User Already Exist. Please Login");
      }
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      const user = new UserModel({ email, password: encryptedPassword });
  
      await user.save();
      res.status(StatusCodes.OK).send(user);
    } catch (err) {
        console.log(`An error occurred during registration: ${err}`);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

export const login = async (req: any, res: any) => {
    console.log('Post request - Login');
    const { email, password } = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }

    try {
      const user : any = await UserModel.findOne({email});
      if (user && (await bcrypt.compare(password, user.password))) {
          //create token
          res.status(StatusCodes.OK).send(user);
      }
  
      res.status(StatusCodes.BAD_REQUEST).send("Invalid Credentials");

    } catch (err) {
        console.log(`An error occurred during login: ${err}`);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};
