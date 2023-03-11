import { Router } from "express";
import login from "../controllers/authentication/login";
import signup from "../controllers/authentication/signup";

const authenticationRouter = Router()

authenticationRouter.get("/", login)
authenticationRouter.post("/", signup)

export default authenticationRouter