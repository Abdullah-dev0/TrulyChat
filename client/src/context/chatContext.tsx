import { getSocket } from "@/lib/socketClient";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface Message {
	id: string;
	content: string;
	sender: string | "unknown";
	timestamp: string;
}

interface ChatContextType {
	messages: Message[];
	sendMessage: (message: Message) => void;
	selectedFriendId: string | null;
	setSelectedFriendId: (id: string) => void;
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);

	let socket = useMemo(() => {
		const socket = getSocket();

		return socket.connect();
	}, []);

	useEffect(() => {
		socket.on("connect", () => {
			console.log("Socket connected");
		});

		socket.on("disconnect", (reason) => {
			console.log("Socket disconnected:", reason);
		});

		socket.on("message", (message: Message) => {
			console.log("Received message:", message);
			setMessages((prevMessages) => [...prevMessages, message]);
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

	// is online

	return (
		<ChatContext.Provider value={{ messages, sendMessage, setMessages, selectedFriendId, setSelectedFriendId }}>
			{children}
		</ChatContext.Provider>
	);
};

export const useChatContext = () => {
	const context = useContext(ChatContext);
	if (!context) {
		throw new Error("useChatContext must be used within ChatProvider");
	}
	return context;
};
