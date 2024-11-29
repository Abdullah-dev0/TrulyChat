import { Message, useChatContext } from "@/context/chatContext";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

const ChatInput = () => {
	const { setMessages, sendMessage } = useChatContext();
	const [inputValue, setInputValue] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!inputValue.trim()) return;

		const newMessage: Message = {
			id: uuidv4(),
			content: inputValue.trim(),
			sender: "user",
			timestamp: format(new Date(), "yyyy-MM-dd HH:mm"),
		};

		// Properly append new message to existing messages
		setMessages((prevMessages) => {
			if (!prevMessages) return [newMessage];
			return [...prevMessages, newMessage];
		});

		sendMessage(newMessage);
		setInputValue("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="w-full flex py-2 gap-2 items-center max-w-screen-lg justify-between">
				<Input
					className="py-4"
					type="text"
					value={inputValue}
					placeholder="Type your message here"
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<Button type="submit">Send Message</Button>
			</div>
		</form>
	);
};

export default ChatInput;
