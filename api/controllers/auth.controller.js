import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

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
