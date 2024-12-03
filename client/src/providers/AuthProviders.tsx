import { useUserSession } from "@/hooks/useUserSession";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router";
import { toast } from "sonner";

const AuthProviders = () => {
	const { data, error, isLoading, isFetching } = useUserSession();

	if (isLoading || isFetching) {
		return (
			<div className="h-screen w-screen flex items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin" />
			</div>
		);
	}

	if (error) {
		console.log("error", error);
		toast.error("Please login", {
			duration: 5000,
		});
		return <Navigate to="/Authpage" replace />;
	}

	if (!data) {
		return <Navigate to="/Authpage" replace />;
	}

	// User is authenticated
	return <Outlet />;
};

export default AuthProviders;
