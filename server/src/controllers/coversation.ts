import { prisma } from "../lib/database/prismaClient";
import { Request, Response } from "express";

export const getConversations = async (req: Request, res: Response) => {
	const conversationWithUsers = await prisma.conversation.findUnique({
		where: { id: conversationId },
		include: {
			participants: {
				include: {
					user: true,
				},
			},
		},
	});

	if (!conversationWithUsers) {
		res.status(404).json({ error: "Conversation not found" });
		return;
	}

	res.status(200).json(conversationWithUsers);
};

export const getAllUserConversations = async (req: Request, res: Response) => {
	const userId = req.user.id;

	const conversations = await prisma.conversation.findMany({
		where: {
			participants: {
				some: {
					userId: userId,
				},
			},
		},
	});

	res.status(200).json(conversations);
};

export const createConversation = async (req: Request, res: Response) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: req.body.userId,
			},
		});
		if (!user) {
			res.status(404).json({ error: "User not found" });
			return;
		}

		// if the user is already in the conversation, return
		const preConversation = await prisma.conversation.findFirst({
			where: {
				participants: {
					some: {
						userId: req.body.userId,
					},
				},
			},
			include: {
				messages: true,
			},
		});

		if (preConversation) {
			res.status(400).json(preConversation);
			return;
		}

		const conversation = await prisma.conversation.create({
			data: {
				participants: {
					create: {
						userId: req.body.userId,
					},
				},
			},
		});
		console.log("Conversation created:", conversation);
		res.status(201).json(conversation);
	} catch (error) {
		console.error("Error creating conversation:", error);
		res.status(500).json({ error: "Failed to create conversation" });
	}
};
