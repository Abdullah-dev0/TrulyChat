import { create } from "zustand";

interface ConversationState {
	selectedConversation: null;
	messages: any[];
	setSelectedConversation: (user: any | null) => void;
	setMessages: (messages: any[]) => void;
}

export const useConversation = create<ConversationState>((set, get) => ({
	selectedConversation: null,
	messages: [],
	setSelectedConversation: (user) => set({ selectedConversation: user }),
	setMessages: (messages) => set({ messages }),
}));
