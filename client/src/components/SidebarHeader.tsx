import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useCustomQuery from "@/hooks/useCustomQuery";
import { getAllUsers } from "@/lib/apis";
import { useConversation } from "@/store/useConversation";
import { useQueryClient } from "@tanstack/react-query";
import { MessageSquarePlus, Search } from "lucide-react";
import React from "react";

// Mock data
interface User {
	id: string;
	name: string;
	email: string;
	image: string | null;
	createdAt: string;
}

type GetAllUsersResponse = {
	count: number;
	success: boolean;
	users: User[];
};

export const SidebarHeader = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [searchTerm, setSearchTerm] = React.useState("");
	const setSelectedConversation = useConversation((state) => state.setSelectedConversation);
	const queryClient = useQueryClient();

	const { data, isLoading } = useCustomQuery<GetAllUsersResponse>(
		["getAllUsers", searchTerm],
		() => getAllUsers(searchTerm),
		{
			enabled: isOpen,
			staleTime: Infinity,
		},
	);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<MessageSquarePlus className="w-6 h-6 cursor-pointer" />
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle></DialogTitle>
				</DialogHeader>
				<div className="mb-4">
					<div className="relative">
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search users..."
							className="pl-8"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
				</div>
				<div className="h-[60vh] overflow-y-auto pr-4 scrollbar-hide">
					{isLoading ? (
						<div className="space-y-4">
							{[...Array(5)].map((_, index) => (
								<div key={index} className="flex items-center gap-4 p-4">
									<Skeleton className="h-10 w-10 rounded-full" />
									<div className="flex flex-col gap-2">
										<Skeleton className="h-4 w-[100px]" />
										<Skeleton className="h-3 w-[150px]" />
									</div>
								</div>
							))}
						</div>
					) : !data?.users?.length ? (
						<p className="text-center text-muted-foreground">No users found</p>
					) : (
						<>
							{data.users.map((user) => (
								<div
									onClick={() => {
										queryClient.setQueryData(["getFriends"], (old: any[]) => {
											if (old.some((u) => u.id === user.id)) {
												return old;
											}
											return [...old, user];
										});
										setSelectedConversation(user);
										setIsOpen(false);
									}}
									key={user.id}
									className="flex items-center gap-4 p-4 cursor-pointer ">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
										{user.image ? (
											<img src={user.image} alt={user.name} className="h-10 w-10 rounded-full" />
										) : (
											<span className="text-sm font-medium">{user.name.slice(0, 2).toUpperCase()}</span>
										)}
									</div>
									<div className="flex flex-col">
										<h3 className="font-semibold">{user.name}</h3>
										<p className="text-sm text-muted-foreground">{user.email}</p>
									</div>
								</div>
							))}
						</>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default SidebarHeader;
