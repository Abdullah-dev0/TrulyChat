import { Message } from "@/context/chatContext";
import ChatBox from "./ChatBox";
import ChatInput from "./chatInput";

const ChatContainer = ({ messages }: { messages: Message[] }) => {
	return (
		<div className="flex flex-col h-full gap-2 p-3">
			<ChatBox messages={messages} />
			<ChatInput />
		</div>
	);
};

export default ChatContainer;
