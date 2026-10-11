import jwt from "jsonwebtoken";
import userModel from "../../../models/userModel.js";

export async function authUser(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Not authenticated, please login.",
                user: null
            });
        }

        const { email } = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "User not found",
                user: null
            });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
            user: null
        });
    }
}