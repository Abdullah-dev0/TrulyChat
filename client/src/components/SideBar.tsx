import { MessageSquarePlus } from "lucide-react";
import { FriendsList } from "./FriendsList";
import { UserProfile } from "./UserProfile";

interface SideBarProps {
	friends: any;
}

const SideBar = ({ friends }: SideBarProps) => {
	return (
		<div className=" hidden md:flex flex-col h-full text-gray-800 p-7 gap-5 overflow-y-auto overflow-hidden scrollbar-hide scroll-smooth ">
			<div className="flex items-center justify-between p-3 border-b border-purple-700">
				<h1 className="text-xl font-bold">TrulyChat</h1>
				<div className="flex items-center gap-2">
					<MessageSquarePlus className="w-6 h-6" />
				</div>
			</div>
			<FriendsList friends={friends} />
			<UserProfile username="John Doe" status="Online" />
		</div>
	);
};

export default SideBar;
