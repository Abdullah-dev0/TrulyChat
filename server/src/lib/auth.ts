import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../lib/database/prismaClient";

export const auth = betterAuth({
	trustedOrigins: ["http://localhost:5173"],
	database: prismaAdapter(prisma, {
		provider: "mongodb",
	}),
	emailAndPassword: {
		enabled: true,
		maxPasswordLength: 14,
		minPasswordLength: 8,
	},
});
