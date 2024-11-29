import { MessageSquare } from "lucide-react";

export function WelcomeScreen() {
	return (
		<div className="flex h-full flex-col items-center justify-center space-y-4 p-8">
			<MessageSquare className="h-24 w-24" />
			<h1 className="text-4xl font-bold tracking-tight">Welcome to TrulyChat!</h1>
			<p className="text-lg text-muted-foreground">Share you smile with this world find friends & enjoy!</p>
		</div>
	);
}
