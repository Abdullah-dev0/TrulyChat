import { Server, Socket } from "socket.io";

interface CustomSocket extends Socket {
	room?: string;
}
export function setupSocket(io: Server) {
	io.use((socket: CustomSocket, next) => {
		const room = socket.handshake.auth.room || socket.handshake.headers.room;
		console.log("Room:", room);
		if (!room) {
			return next(new Error("Invalid room"));
		}
		socket.room = room;
		next();
	});

	io.on("connection", (socket: CustomSocket) => {
		console.log("A user connected:", socket.id);

		// * Join the room
		socket.join(socket.room!);

		console.log("Room:", socket.room);

		socket.on("message", async (data) => {
			console.log("Received message:", data);

			socket.to(socket.room!).emit("message", data);
		});

		socket.on("disconnect", () => {
			console.log("A user disconnected:", socket.id);
		});
	});
}
