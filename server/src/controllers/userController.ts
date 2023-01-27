import { RequestHandler } from "express-serve-static-core";
import UserModel from "../models/user";
import { Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SignInUser, User } from "../global/types";

const TEMP_SECRET_KEY = "abc";

export const signup: RequestHandler = async (
    req: Request<{}, {}, User>,
    res
) => {
    const { username, email, password } = req.body;

    try {
        // Existing User Check
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exist" });
        }

        // Hashed Password
        const hashedPassword = await bcrypt.hash(password, 10);

        //User Creation
        const result = await UserModel.create({
            email,
            password: hashedPassword,
            username,
        });

        // Token Generate
        const token = jwt.sign(
            {
                email: result.email,
                id: result._id,
            },
            TEMP_SECRET_KEY
        );

        res.status(201).json({ user: result, token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const signin: RequestHandler = async (
    req: Request<{}, {}, SignInUser>,
    res
) => {
    // Check if user exists
    const { email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Match credentiols
        const matchPassword = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            {
                email: existingUser.email,
                id: existingUser._id,
            },
            TEMP_SECRET_KEY
        );
        res.status(201).json({ user: existingUser, token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
};
