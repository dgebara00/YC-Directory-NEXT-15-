import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";

type Props = { userId: number; avatarUrl?: string };

const Authenticated = ({ userId, avatarUrl }: Props) => (
	<div className="flex items-center gap-5 font-bold">
		<Link href="/startup/create">Create</Link>
		<button onClick={() => signOut()} type="button" className="px-4 py-2 text-destructive">
			Logout
		</button>
		<Link href={`/user/${userId}`}>
			<Image src={avatarUrl || ""} alt="User Avatar" width={48} height={48} className="rounded-full" />
		</Link>
	</div>
);

export default Authenticated;
