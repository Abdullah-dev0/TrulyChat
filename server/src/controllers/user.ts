import { auth } from "../lib/auth";
import { prisma } from "../lib/database/prismaClient";
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		// Destructure query parameters
		const { search } = req.query;

		// Fetch users from Prisma
		const users = await prisma.user.findMany({
			orderBy: {
				createdAt: "desc", // Order by creation date
			},

			where: search
				? {
						OR: [
							{
								name: {
									contains: String(search),
									mode: "insensitive", // Case-insensitive search
								},
							},
						],
				  }
				: undefined,
			select: {
				id: true,
				name: true,
				email: true,
				image: true,
				createdAt: true,
			},
		});

		// Return successful response
		return res.status(200).json({
			success: true,
			count: users.length,
			users,
		});
	} catch (error) {
		console.error("Error fetching users:", error);

		// Return detailed error response
		return res.status(500).json({
			success: false,
			message: "Failed to retrieve users",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
