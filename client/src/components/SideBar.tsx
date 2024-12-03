import { getConversations } from "@/lib/apis";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { FriendsList } from "./FriendsList";
import { SidebarHeader } from "./SidebarHeader";
import { UserProfile } from "./UserProfile";

export const SideBar = () => {
	return (
		<div className=" hidden md:flex flex-col h-full text-gray-800 shadow-xl p-5 gap-5 overflow-y-auto overflow-hidden scrollbar-hide scroll-smooth ">
			<div className="flex items-center justify-between p-3 border-b border-purple-700">
				<h1 className="text-xl font-bold">TrulyChat</h1>
				<SidebarHeader />
			</div>
			<Suspense fallback={<div>The Data Is been Fetched</div>}>
				<FriendsList />
			</Suspense>
			<UserProfile username="John Doe" status="Online" />
		</div>
	);
};
