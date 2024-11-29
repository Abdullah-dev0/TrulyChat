import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<div className="p-3">
			<h1>Home Page</h1>
			<Link to="/chat">
				<Button variant="destructive">Go to chat</Button>
			</Link>
		</div>
	);
};

export default HomePage;
