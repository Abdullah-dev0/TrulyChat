import { io, Socket } from "socket.io-client";

let socket: Socket;
export const getSocket = () => {
	if (!socket) {
		socket = io("http://localhost:3000", {
			autoConnect: false,
			reconnection: true,
		});
	}
	return socket;
};
