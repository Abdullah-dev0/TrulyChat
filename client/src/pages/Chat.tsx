import ChatBox from "@/components/ChatBox";
import ChatInput from "@/components/chatInput";
import { SideBar } from "@/components/SideBar";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { useConversation } from "@/store/useConversation";
import { useEffect } from "react";

const Chat = () => {
	const messages = useConversation((state) => state.messages);
	const selectedConversation = useConversation((state) => state.selectedConversation);
	const setSelectedConversation = useConversation((state) => state.setSelectedConversation);
	useEffect(() => {
		return () => {
			setSelectedConversation(null);
		};
	}, [setSelectedConversation]);

	return (
		<div className="grid md:grid-cols-[350px_1fr] h-screen">
			<SideBar />
			<main className="flex flex-col h-screen">
				{selectedConversation ? (
					<section className="flex flex-col h-full gap-2 p-3">
						<ChatBox messages={messages} />
						<ChatInput />
					</section>
				) : (
					<WelcomeScreen />
				)}
			</main>
		</div>
	);
};

export default Chat;
