"server-only";

import { redirect } from "next/navigation";

import { auth } from "../auth";

export const requireUser = async () => {
	const session = await auth();

	if (!session?.user) {
		redirect("/api/auth/signin");
	}

	return session.user;
};
