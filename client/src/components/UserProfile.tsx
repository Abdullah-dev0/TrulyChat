import React from "react";
import { LogOutIcon, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface UserProfileProps {
	username?: string;
	status?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ username = "Guest User", status = "Online" }) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const navigate = useNavigate();
	const query = useQueryClient();

	const handleSubmit = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					setIsLoading(false);
					query.clear();
					navigate("/");
				},
				onRequest: () => {
					setIsLoading(true);
				},
				onError: (error) => {
					setIsLoading(false);
					toast.error("Something went wrong!", {
						duration: 5000,
						description: error.error.message,
					});
				},
			},
		});
	};

	return (
		<div className="flex justify-between mt-auto items-center rounded-lg p-3">
			<div className=" gap-4 rounded-full flex items-center justify-center">
				<User className="w-6 h-6 " />
				<div>
					<h3 className=" font-medium">{username}</h3>
					<p className=" text-sm">{status}</p>
				</div>
			</div>
			<LogOutIcon
				className={`${isLoading ? "cursor-not-allowed" : ""} w-6 h-6 cursor-pointer`}
				onClick={handleSubmit}
			/>
		</div>
	);
};
