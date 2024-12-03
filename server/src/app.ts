import cors from "cors";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import "dotenv/config";
import authRoute from "./routes/auth.route";
import { setupSocket } from "./socket";
import morgan from "morgan";
import userRoute from "./routes/user.route";
import conversationRouter from "./routes/conversation.route";

const app = express();
app.use(morgan("dev"));

const server = createServer(app);

const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5173"],
		methods: ["GET", "POST"],
	},
});

// instrument(io, {
// 	auth: false,
// 	mode: "development",
// });

setupSocket(io);

app.use(
	cors({
		origin: "http://localhost:5173", // Replace with your frontend's URL
		methods: ["GET", "POST"],
		credentials: true, // Allow cookies or authentication headers
	}),
);

// Simple Express route
app.get("/", (req, res) => {
	res.send("Hello World");
});

app.use(authRoute);
app.use("/api", userRoute);
app.use("/api", conversationRouter);

server.listen(3000, () => {
	console.log("Server is running on port 3000");
});
