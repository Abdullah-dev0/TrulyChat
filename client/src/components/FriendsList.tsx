import { getConversations } from "@/lib/apis";
import { useConversation } from "@/store/useConversation";
import { useSuspenseQuery } from "@tanstack/react-query";

export const FriendsList = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const { data: friends } = useSuspenseQuery({
		queryKey: ["getFriends"],
		queryFn: getConversations,
		staleTime: Infinity,
	});

	return (
		<>
			<div className="flex items-center justify-between px-3 py-2">
				<h2 className="font-medium">CHAT MESSAGES</h2>
				<span className="text-sm">{friends.length}</span>
			</div>
			<div className="space-y-1">
				{friends.length === 0 ? (
					<div className="p-3 text-red-500">No friends found</div>
				) : (
					friends.map((user) => (
						<div
							key={user.id}
							onClick={() => setSelectedConversation(user)}
							className={`flex items-center hover:bg-gray-200 gap-3 p-3 cursor-pointer rounded-lg mx-1
        ${selectedConversation?.id === user.id ? "bg-gray-200" : ""}`}>
							<div className="relative">
								<img src={user.image || "/default-avatar.png"} alt={user.name} className="w-10 h-10 rounded-full" />
							</div>
							<div className="flex-1 min-w-0">
								<h3 className="font-medium truncate">{user.name}</h3>
								<p className="text-sm text-gray-500 truncate">{user.email}</p>
							</div>
						</div>
					))
				)}
			</div>
		</>
	);
};
