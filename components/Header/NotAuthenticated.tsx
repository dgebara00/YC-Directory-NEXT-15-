import React from "react";
import Image from "next/image";

import { Skeleton } from "../ui/Skeleton";

const NotAuthenticated = ({
	isAuthLoaderVisible,
	handleSignIn,
}: {
	isAuthLoaderVisible: boolean;
	handleSignIn: () => Promise<void>;
}) => {
	return isAuthLoaderVisible ? (
		<Skeleton className="bg-zinc-400 min-w-[226px] min-h-12" />
	) : (
		<button
			onClick={handleSignIn}
			type="button"
			className="px-4 py-2 text-black rounded items-center transition text-xs border-4 border-r-6 border-b-6 border-black rounded-r-md rounded-bl-md cursor-pointer font-bold"
		>
			<Image src="/github-mark.svg" alt="GitHub Logo" width={20} height={20} className="inline mr-2" />
			Login
		</button>
	);
};

export default NotAuthenticated;
