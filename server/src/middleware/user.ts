import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";
import { Request, Response } from "express";

declare module "express-serve-static-core" {
	interface Request {
		user?: any;
	}
}

export const userMiddleware = async (req: Request, res: Response, next: Function) => {
	const session = await auth.api.getSession({
		headers: fromNodeHeaders(req.headers),
	});

	if (!session) {
		return res.status(401).json({ message: "User is not authenticated" });
	}

	req.user = session.user;
	next();
};
