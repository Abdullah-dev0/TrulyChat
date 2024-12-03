import { Toaster } from "@/components/ui/sonner";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AuthPage from "./pages/AuthPage";
import Chat from "./pages/Chat";
import HomePage from "./pages/HomePage";
import AuthProviders from "./providers/AuthProviders";
import { SocketProvider } from "./context/socketcontext";

const notAuthRoutes = [
	{
		path: "Authpage",
		element: <AuthPage />,
	},
];

const publicRoutes = [
	{
		path: "/",
		element: <HomePage />,
	},

	{
		children: notAuthRoutes,
	},
];

const authRoutes = [
	{
		path: "/chat",
		element: (
			<SocketProvider>
				<Chat />
			</SocketProvider>
		),
	},
];

const routes = [
	{
		path: "/",
		children: [
			{
				children: publicRoutes,
			},
			{
				element: <AuthProviders />,
				children: authRoutes,
			},
		],
	},

	{
		path: "*",
		// element: <NotFound />,
	},
];

const router = createBrowserRouter(routes);

const App = () => {
	return (
		<>
			<Toaster />
			<RouterProvider router={router} />
		</>
	);
};

export default App;
