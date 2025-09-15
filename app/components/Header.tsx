import Image from "next/image";
import Link from "next/link";

import { signIn } from "@/app/auth";

const Header = () => {
	return (
		<header className="px-5 py-3 border-b flex align-center shadow-sm bg-red-700 font-work-sans">
			<nav className="flex justify-between">
				<Link href="/">
					<Image src="/logo.png" alt="Logo" width={144} height={30} />
				</Link>
				<form
					action={async () => {
						"use server";
						await signIn("github");
					}}
				>
					<button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
						Sign in with GitHub
					</button>
				</form>
			</nav>
		</header>
	);
};

export default Header;
