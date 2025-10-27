"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, SessionProvider, signIn } from "next-auth/react";

import Authenticated from "./Authenticated";
import NotAuthenticated from "./NotAuthenticated";

const WithSession = () => {
	return (
		<SessionProvider>
			<Header />
		</SessionProvider>
	);
};

const Header = () => {
	const { data: session } = useSession();
	const [isAuthLoaderVisible, setIsAuthLoaderVisible] = React.useState(false);

	const handleSignIn = async () => {
		try {
			setIsAuthLoaderVisible(true);
			await signIn("github");
		} catch {
			setIsAuthLoaderVisible(false);
		}
	};

	return (
		<header className="px-5 py-3 border-b flex align-center shadow-sm bg-white font-work-sans">
			<nav className="flex items-center justify-between w-full">
				<Link href="/">
					<Image src="/logo.png" alt="Logo" width={144} height={30} />
				</Link>
				{session ? (
					<Authenticated userId={session.user.githubId} avatarUrl={session.user.image} />
				) : (
					<NotAuthenticated isAuthLoaderVisible={isAuthLoaderVisible} handleSignIn={handleSignIn} />
				)}
			</nav>
		</header>
	);
};

export default WithSession;
