import bcrypt from "bcryptjs";

import Account from "../models/account.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/appError.util.js";

const signup = async (req, res, next) => {
    try {
        const { email, password, name, phone, address } = req.body;
        const user = await User.create({ name, phone, address, email });

        //decode password
        const _password = await bcrypt.hash(password, 12);

        const account = await Account.create({
            username: user.email,
            password: _password,
            rule: true,
            user_id: user._id,
        });

        res.status(201).json({
            status: "success",
            data: {
                user,
                account,
            },
        });
    } catch (error) {
        next(error);
    }
};

const comparePassword = async (password, account) => {
    const originPass = account.password;
    return await bcrypt.compare(password, originPass);
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        //check user send username & password
        if (!username || !password) {
            return next(
                new AppError(
                    401,
                    "fail",
                    "Please provide username or password"
                ),
                req,
                res,
                next
            );
        }

        const account = await Account.findOne({ username })
            .select("+password")

        if (!account || !(await comparePassword(password, account))) {
            return (
                next(
                    new AppError(401, "fail", "Username or Passoword is wrong")
                ),
                req,
                res,
                next
            );
        }

        res.status(200).json({
            status: "success",
            user_id: account.user_id,
        });
    } catch (error) {
        next(error);
    }
};

export default {
    signup,
    login,
};
