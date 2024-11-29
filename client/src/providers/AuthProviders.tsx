import { Navigate } from "react-router";

import { Outlet } from "react-router";

const AuthProviders = () => {
	const isAuth = true;
	if (!isAuth) {
		return <Navigate to="/login" replace={true} />;
	}
	return <Outlet />;
};

export default AuthProviders;
