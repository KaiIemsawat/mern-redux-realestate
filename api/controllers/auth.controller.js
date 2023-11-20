import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    // Get user from requestBody
    const { username, email, password } = req.body;

    // Hashing password
    // no await needed since using .hashSync
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json("User successfully created");
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // find the user by email
        const validateUser = await User.findOne({ email });
        if (!validateUser) {
            return next(errorHandler(404, "INVALID CREDENTIALS USER")); // need to correct later
        }

        // if user exists, compare password
        const validatePasswod = bcryptjs.compareSync(
            password,
            validateUser.password
        );
        if (!validatePasswod) {
            return next(errorHandler(401, "INVALID CREDENTIALS PASS")); // need to correct later
        }

        // once confirm that email and password are valid, create token
        const token = jwt.sign(
            { id: validateUser._id },
            process.env.JWT_SECRET
        );
        // To not include password in user object
        const { password: pWord, ...rest } = validateUser._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
        })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res.cookie("access_token", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
            })
                .status(200)
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            // Math.random().toString(36).slice(-8); <-- create random from 0-9 and a-z then get last 8 digits
            // 2 times makes 16 digits
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = new User({
                username:
                    req.body.name.replace(" ", "").toLowerCase() +
                    Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });

            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;

            res.cookie("access_token", token, { httpOnly: true })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};
