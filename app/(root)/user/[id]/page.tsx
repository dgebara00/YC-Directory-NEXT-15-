import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";

import { auth } from "@/lib/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { StartupCardsSkeleton } from "@/components/StartupCard";
import UserStartups from "@/components/UserStartups";

type Props = {
	params: Promise<{ id: string }>;
};

const UserPage = async ({ params }: Props) => {
	const session = await auth();
	const { id } = await params;
	const parsedId = Number(id);
	const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: parsedId });

	if (!user) {
		return notFound();
	}

	return (
		<>
			<section className="profile_container">
				<div className="profile_card">
					<div className="profile_title">
						<h3 className="text-24-black uppercase text-center line-clamp-1">{user.name}</h3>
					</div>

					<Image
						src={user.image as string}
						alt={user.name as string}
						width={220}
						height={220}
						className="profile_image"
					/>

					<p className="text-30-extrabold mt-7 text-center">@{user?.username}</p>
					<p className="mt-1 text-center text-14-normal">{user?.bio}</p>
				</div>

				<div className="flex-1 flex flex-col gap-5 lg:-mt-5">
					<p className="text-30-bold">{session?.user.githubId === parsedId ? "Your" : "All"} Startups</p>
					<Suspense fallback={<StartupCardsSkeleton />}>
						<UserStartups id={parsedId} />
					</Suspense>
				</div>
			</section>
		</>
	);
};

export default UserPage;
