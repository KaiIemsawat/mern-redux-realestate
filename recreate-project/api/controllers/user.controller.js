import bcryptjs from "bcryptjs";

import { errorHandle } from "../middleware/errorHandle.js";
import User from "../models/user.model.js";

export const test = (req, res) => {
    res.json({
        message: "Hello world",
    });
};

export const updateUser = async (req, res, next) => {
    if (req.user.userId !== req.params.id) {
        return next(
            errorHandle(
                401,
                "Unauthorized, You may only update your own account."
            )
        );
    }
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updated_User = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },
            { new: true }
        );

        const { password, ...rest } = updated_User._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
