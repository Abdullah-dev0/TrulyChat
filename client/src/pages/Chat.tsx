import ChatContainer from "@/components/ChatContainer";
import SideBar from "@/components/SideBar";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { friends } from "@/constant";
import { Message, useChatContext } from "@/context/chatContext";
import { useEffect } from "react";
const Chat = () => {
	const { selectedFriendId, messages, setMessages } = useChatContext();

	useEffect(() => {
		const messagesToDisplay = friends.find((friend) => friend.id === selectedFriendId)?.messages;

		setMessages(messagesToDisplay!);
	}, [selectedFriendId]);

	console.log("messages", messages);

	return (
		<div className="grid md:grid-cols-[350px_1fr] h-screen">
			<SideBar friends={friends} />
			<main className=" flex flex-col h-screen">
				{!selectedFriendId && <WelcomeScreen />}
				{selectedFriendId && <ChatContainer messages={messages} />}
			</main>
		</div>
	);
};

export default Chat;

//create a chatBox component
