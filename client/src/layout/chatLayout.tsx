import { ChatProvider } from "@/context/chatContext";
import { Outlet } from "react-router-dom";

const chatLayout = () => {
	return (
		<ChatProvider>
			<Outlet />
		</ChatProvider>
	);
};

export default chatLayout;
