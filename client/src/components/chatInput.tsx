import { Input } from "@/components/ui/input";
import { useSocketContext } from "@/context/socketcontext";
import { useUserSession } from "@/hooks/useUserSession";
import { useConversation } from "@/store/useConversation";
import { format } from "date-fns";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ChatInput = () => {
	const [inputValue, setInputValue] = useState("");
	const { sendMessage } = useSocketContext();
	const { data: user } = useUserSession();
	const messages = useConversation((state) => state.messages);
	const setMessages = useConversation((state) => state.setMessages);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const newMessage = {
			id: uuidv4(),
			content: inputValue.trim(),
			name: user?.name ?? "Unknown",
			group_id: "1",
			timestamp: format(new Date(), "yyyy-MM-dd HH:mm"),
		};

		// Update messages in store
		setMessages([...messages, newMessage]);

		sendMessage(newMessage);

		// Clear input
		setInputValue("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="w-full flex py-2 gap-2 mb-2 items-center max-w-screen-lg justify-between">
				<Input
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Type a message..."
					className="flex-1"
				/>
			</div>
		</form>
	);
};

export default ChatInput;
