import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader } from "@/components/ui/card";
import { SignInForm } from "../components/SignIn";
import { SignUpForm } from "../components/Signup";

//change the name of the Application



export default function AuthPage() {
	const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<Card className="w-full max-w-4xl grid md:grid-cols-2 gap-6 p-6 shadow-lg">
				<div className="space-y-6">
					<CardHeader className="space-y-1 p-0">
						<h1 className="text-2xl font-bold text-center">Welcome User!</h1>
						<p className="text-sm text-center text-muted-foreground">Enter the details to get started!</p>
					</CardHeader>
					<div className="space-y-6">
						<div className="relative">
							<div className="flex">
								<button
									className={`flex-1 text-center py-2 ${
										activeTab === "signin" ? "text-primary" : "text-muted-foreground"
									}`}
									onClick={() => setActiveTab("signin")}>
									Sign In
								</button>
								<button
									className={`flex-1 text-center py-2 ${
										activeTab === "signup" ? "text-primary" : "text-muted-foreground"
									}`}
									onClick={() => setActiveTab("signup")}>
									Sign Up
								</button>
							</div>
							<motion.div
								className="absolute bottom-0 left-0 h-0.5 bg-primary"
								initial={false}
								animate={{
									width: "50%",
									x: activeTab === "signin" ? "0%" : "100%",
								}}
								transition={{ type: "spring", stiffness: 300, damping: 30 }}
							/>
						</div>
						{activeTab === "signin" ? <SignInForm /> : <SignUpForm />}
					</div>
				</div>
				<div className="hidden md:flex flex-col items-center justify-center space-y-4">
					<div className="rounded-full bg-background p-4 shadow-lg">
						<MessageSquare className="w-12 h-12" />
					</div>
					<h2 className="text-2xl font-bold text-center">Synchronous Chat!</h2>
					<p className="text-center text-muted-foreground">A realtime fast and secure with best user experience!</p>
					<p className="text-center text-muted-foreground">Share you smile with this world find friends & enjoy!</p>
				</div>
			</Card>
		</div>
	);
}
