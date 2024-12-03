// use Es6 module imports

import express from "express";

import { getAllUserConversations, getConversations } from "../controllers/coversation";
import { userMiddleware } from "../middleware/user";

const conversationRouter = express.Router();

conversationRouter.use(userMiddleware);

conversationRouter.get("/getconversations", getConversations);
conversationRouter.get("/getAllUserConversations", getAllUserConversations);

export default conversationRouter;
