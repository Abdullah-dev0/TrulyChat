import { useUserSession } from "@/hooks/useUserSession";
import { getSocket } from "@/lib/socketClient";
import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";

export interface Message {
	id: string;
	content: string;
	name: string;
	group_id: string | number;
	timestamp: string;
}

interface ChatContextType {
	sendMessage: (message: Message) => void;
}

const SocketContext = createContext<ChatContextType | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const query = useQueryClient();

	const user = query.getQueryData(["session"]) as any;

	let socket = useMemo(() => {
		const socket = getSocket();

		socket.auth = {
			room: user?.id,
		};

		return socket.connect();
	}, [user]);

	useEffect(() => {
		socket.on("connect", () => {
			console.log("Socket connected");
		});

		socket.on("disconnect", (reason) => {
			console.log("Socket disconnected:", reason);
		});

		socket.on("message", (message: Message) => {
			console.log("Received message:", message);
		});

		// Cleanup on unmount
		return () => {
			socket.close();
		};
	}, []);

	// Additional methods for socket manipulation
	const sendMessage = (message: Message) => {
		if (socket && socket.connected) {
			socket.emit("message", message);
		}
	};
	return <SocketContext.Provider value={{ sendMessage }}>{children}</SocketContext.Provider>;
};

export const useSocketContext = () => {
	const context = useContext(SocketContext);
	if (!context) {
		throw new Error("useSocketContext must be used within SocketProvider");
	}
	return context;
};
