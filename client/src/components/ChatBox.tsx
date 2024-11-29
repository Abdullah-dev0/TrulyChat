import { Message } from "@/context/chatContext";

export default function ChatBox({ messages }: { messages: Message[] }) {
	return (
		<div className="flex flex-col mt-auto gap-4 p-4 overflow-y-auto scrollbar-hide scroll-smooth">
			{messages.map((message) => (
				<div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
					<div
						className={`
              max-w-[70%] 
              rounded-lg 
              p-3 
           
              ${
								message.sender === "user"
									? "bg-purple-600 text-white rounded-br-none"
									: "bg-gray-200 text-gray-800 rounded-bl-none"
							}
              transition-all 
              duration-200 
              hover:shadow-lg
            `}>
						<p className="text-md break-words">{message.content}</p>
						<div
							className={`
                text-xs mt-1
                ${message.sender === "user" ? "text-purple-200" : "text-gray-500"}
              `}>
							{message.timestamp}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
