import { authClient } from "@/lib/auth-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router";
import { toast } from "sonner";

const AuthProviders = () => {
	const { data, error, isLoading, isFetching } = useQuery({
		queryKey: ["session"],
		queryFn: () => authClient.getSession(),
		staleTime: (query) => {
			if (query.state.data?.data?.user) {
				return Infinity; // Return stale time if data exists
			}
			return 0; // Return 0 if data is not available
		},
	});

	if (isLoading || isFetching) {
		return (
			<div className="h-screen w-screen flex items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin" />
			</div>
		);
	}

	if (error) {
		toast.error("Authentication failed");
		return;
	}

	if (!data?.data) {
		return <Navigate to="/Authpage" replace />;
	}

	// User is authenticated
	return <Outlet />;
};

export default AuthProviders;
