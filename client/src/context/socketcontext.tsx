import { getSocket } from "@/lib/socketClient";
import { useConversation } from "@/store/useConversation";
import { useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useMemo } from "react";

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
	const setMessage = useConversation((state) => state.setMessages);
	const query = useQueryClient();
	const messages = useConversation((state) => state.messages);

	const user = query.getQueryData(["session"]) as any;

	let socket = useMemo(() => {
		const socket = getSocket(user.id);

		return socket.connect();
	}, [user]);

	useEffect(() => {
		socket.on("connect", () => {
			console.log("Socket connected");
		});

		socket.on("disconnect", (reason) => {
			console.log("Socket disconnected:", reason);
		});

		socket.on("message", (message: any) => {
			console.log("Received message:", message);
			setMessage(message);
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
