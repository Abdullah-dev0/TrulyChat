import { prisma } from "./database/prismaClient";

export interface Message {
	id: string;
	content: string;
	sender: "user" | "receiver";
	timestamp: string;
}

export const saveMessage = async (message: Message) => {
	const db = await prisma.message.create({
		data: {
			id: message.id,
			content: message.content,
			sender: message.sender,
			timestamp: message.timestamp,
		},
	});
};
