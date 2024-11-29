
import { Message } from "@/context/chatContext";
import ChatBox from "./ChatBox";
import ChatInput from "./chatInput";

const ChatContainer = ({ messages }: { messages: Message[] }) => {
	return (
		<div className="flex flex-col mt-auto gap-4 min-h-screen p-2 ">
			<ChatBox messages={messages} />
			<ChatInput />
		</div>
	);
};

export default ChatContainer;
