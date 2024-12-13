import { Server, Socket } from "socket.io";

const userSocketMap: { [key: string]: string } = {};
export function setupSocket(io: Server) {
	io.on("connection", (socket: Socket) => {
		console.log("A user connected:", socket.id);

		const userId = socket.handshake.query.room as string;

		console.log("socketId:", userId);

		socket.on("message", async (data: any) => {
			console.log("Received message:", data);
			if (userId !== "undefined") userSocketMap[userId] = socket.id;

			console.log(userSocketMap);

			const receverId = userSocketMap[data.recerverId];

			console.log(receverId);

			const sendMessage = {
				...data,
				name: "",
			};

			socket.to(receverId).emit("message", sendMessage);
		});

		socket.on("disconnect", () => {
			console.log("A user disconnected:", socket.id);
		});
	});
}
