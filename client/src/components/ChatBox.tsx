import { Message } from "@/context/socketcontext";
import { useConversation } from "@/store/useConversation";
import { useEffect, useRef } from "react";

export default function ChatBox() {
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const messages = useConversation((state) => state.messages);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div className="flex flex-col flex-1 p-3 rounded-sm bg-slate-500  overflow-y-auto scrollbar-hide">
			<div className="mt-auto flex flex-col gap-3">
				{messages.map((message) => (
					<div key={message.id} className={`flex ${message.name ? "justify-end" : "justify-start"}`}>
						<div
							className={`
              max-w-[70%] 
              rounded-lg 
              p-3 
              ${message.name ? "bg-purple-600 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"}
              transition-all 
              duration-300 
              hover:shadow-lg
            `}>
							<p className="text-md break-words">{message.content}</p>
						</div>
					</div>
				))}
			</div>
			<div ref={messagesEndRef} /> {/* Scroll anchor */}
		</div>
	);
}
