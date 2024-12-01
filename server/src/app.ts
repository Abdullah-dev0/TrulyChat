import cors from "cors";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import "dotenv/config";
import authRoute from "./routes/auth.route";
import { setupSocket } from "./socket";

const app = express();

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

server.listen(3000, () => {
	console.log("Server is running on port 3000");
});
