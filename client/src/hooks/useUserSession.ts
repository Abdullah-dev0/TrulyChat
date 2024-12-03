import { authClient } from "@/lib/auth-client";
import useCustomQuery from "./useCustomQuery";

export const useUserSession = () => {
	const { data, error, isLoading, isFetching } = useCustomQuery(
		["session"],
		async () => {
			const user = await authClient.getSession();

			console.log("user", user);

			if (!user.data?.user) {
				throw new Error("There was an error fetching the user");
			}

			return user.data?.user;
		},
		{
			staleTime: (query) => {
				if (query) {
					return Infinity;
				}
				return 0;
			},
			retry: 1,
		},
	);

	return { data, error, isLoading, isFetching };
};
