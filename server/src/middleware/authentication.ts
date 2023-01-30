import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { IAuthToken, TEMP_SECRET_KEY } from "../global/types";

// interface AuthRequest extends Request {
//     user:
// }

export const authenticateToken: RequestHandler = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token === null || token === "") {
        return res.status(401).json({ message: "Access token not found" });
    }

    jwt.verify(token!, TEMP_SECRET_KEY, (err, user) => {
        if (err || !user) {
            res.status(403).json({ message: "Invalid access token" });
        }

        req.body.username = (user as IAuthToken).username;
        req.body.email = (user as IAuthToken).email;
        req.body.id = (user as IAuthToken).id;

        next();
    });
};
