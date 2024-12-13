import { io, Socket } from "socket.io-client";

let socket: Socket;
export const getSocket = (roomId: string) => {
	if (!socket) {
		socket = io("http://localhost:3000", {
			autoConnect: false,
			reconnection: true,
			query: {
				room: roomId,
			},
		});
	}
	return socket;
};
