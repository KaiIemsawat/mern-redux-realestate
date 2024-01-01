import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { errorHandle } from "../middleware/errorHandle.js";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    const isUsernameUsed = await User.findOne({ username });
    const isEmailExisted = await User.findOne({ email });
    if (isEmailExisted || isUsernameUsed) {
        next(errorHandle(400, "Username or email has been registered"));
    }

    const hashedPass = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPass });

    try {
        await newUser.save();
        res.status(201).json("User created..!");
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandle(404, "Invalid Credentials !"));
        }

        const validPassword = bcryptjs.compareSync(
            password,
            validUser.password
        );
        if (!validPassword) {
            return next(errorHandle(401, "Invlid Credentials !!"));
        }

        if (validUser && validPassword) {
            const { password: pass, ...rest } = validUser._doc;
            generateToken(res, validUser._id);
            res.status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
};
