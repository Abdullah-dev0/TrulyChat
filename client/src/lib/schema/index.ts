import z from "zod";

export const signupFormSchema = z
	.object({
		username: z.string().min(3, { message: "Username must be at least 3 characters" }),
		email: z.string().email({ message: "Invalid email address" }),
		password: z.string().min(8, { message: "Password must be at least 8 characters" }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export const loginFormSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});
