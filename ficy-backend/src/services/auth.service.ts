import bcrypt from "bcryptjs";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { GenericResponse } from "../interfaces/genericReponse.interface";
import {
  buildRegExpForExactIgnoreCase,
  buildRegExpForWord,
  capitalizeSmart,
} from "../helpers/helperFunctions";

export const login = async (
  email: string,
  password: string
): Promise<GenericResponse<{ token: string }>> => {
  try {
    const user = await User.findOne({
      email: buildRegExpForExactIgnoreCase(email),
    });
    if (!user) {
      return {
        status: 400,
        message: "Invalid credentials.",
      };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        status: 400,
        message: "Invalid credentials.",
      };
    }
    const token = jwt.sign(
      { userId: user._id, fullName: user.fullName },
      process.env.JWT_SECRET || "your_jwt_secret",
      {
        expiresIn: "1h",
      }
    );

    return {
      status: 200,
      message: "Successfully logged in.",
      data: { token },
    };
  } catch (err: any) {
    return {
      status: 500,
      message: err.message,
    };
  }
};

export const register = async (
  email: string,
  password: string,
  fullName: string
) => {
  try {
    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashed,
      fullName: capitalizeSmart(fullName),
    });
    await newUser.save();
    return {
      status: 201,
      message: "User have been successfully created.",
    };
  } catch (err: any) {
    return {
      status: 400,
      message: err.message,
    };
  }
};
