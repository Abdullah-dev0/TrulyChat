import { create } from "zustand";

interface Message {
	id: string;
	content: string;
	senderId: string;
	receiverId: string;
}

interface ConversationState {
	selectedConversation: any | null;
	messages: Message[];
	setSelectedConversation: (user: any | null) => void;
	setMessages: (message: any) => void; // Changed to single message
}

export const useConversation = create<ConversationState>((set) => ({
	selectedConversation: null,
	messages: [],
	setSelectedConversation: (user) => set({ selectedConversation: user }),
	setMessages: (message) =>
		set((state) => ({
			messages: [...state.messages, message],
		})),
}));
