// use Es6 module imports

import express from "express";

import { getAllUsers } from "../controllers/user";
import { userMiddleware } from "../middleware/user";

const userRouter = express.Router();

userRouter.use(userMiddleware);

userRouter.get("/getallusers", getAllUsers);

export default userRouter;
