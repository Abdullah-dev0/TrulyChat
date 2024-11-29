import React from "react";
import { LogOutIcon, User } from "lucide-react";

interface UserProfileProps {
	username?: string;
	status?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ username = "Guest User", status = "Online" }) => {
	return (
		<div className="flex justify-between mt-auto items-center gap-3 rounded-lg">
			<div className=" gap-4 rounded-full flex items-center justify-center">
				<User className="w-6 h-6 " />
				<div>
					<h3 className=" font-medium">{username}</h3>
					<p className=" text-sm">{status}</p>
				</div>
			</div>
			<LogOutIcon className="cursor-pointer" />
		</div>
	);
};
