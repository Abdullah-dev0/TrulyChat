import React from "react";
import { User, Volume2, VolumeX } from "lucide-react";
import { useChatContext } from "@/context/chatContext";

interface Friend {
	id: string;
	username: string;
	status: "online" | "offline";
	isMuted?: boolean;
}

interface FriendsListProps {
	friends: Friend[];
}

export const FriendsList: React.FC<FriendsListProps> = ({ friends }) => {
	const { setSelectedFriendId, selectedFriendId } = useChatContext();
	return (
		<div className="flex-1">
			<div className="flex items-center justify-between px-3 py-2">
				<h2 className=" font-medium">CHAT MESSAGES</h2>
				<span className=" text-sm">{friends.length}</span>
			</div>
			<div className="space-y-1 ">
				{friends.map((friend) => (
					<div
						key={friend.id}
						className={`flex items-center hover:bg-gray-200 gap-3 p-3 cursor-pointer rounded-lg mx-1 ${
							selectedFriendId === friend.id ? "bg-gray-200" : ""
						}`}
						onClick={() => setSelectedFriendId(friend.id)}>
						<div className="relative">
							<div className="w-10 h-10  rounded-full flex items-center justify-center">
								<User className="w-5 h-5 " />
							</div>
							<div
								className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${
									friend.status === "online" ? "bg-green-500" : "bg-gray-400"
								}`}
							/>
						</div>
						<div className="flex-1 min-w-0">
							<h3 className=" font-medium truncate">{friend.username}</h3>
							<p className=" text-sm capitalize">{friend.status}</p>
						</div>
						{friend.isMuted ? <VolumeX className="w-5 h-5 " /> : <Volume2 className="w-5 h-5 " />}
					</div>
				))}
			</div>
		</div>
	);
};
