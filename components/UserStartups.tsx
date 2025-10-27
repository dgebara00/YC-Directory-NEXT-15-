import React from "react";

import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

import StartupCard, { type StartupCardWithoutAuthorType } from "@/components/StartupCard";

type Props = {
	id: number;
};

const UserStartups = async ({ id }: Props) => {
	const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

	return (
		<>
			{startups.length > 0 ? (
				<ul className="card_grid-sm">
					{(startups as Omit<StartupCardWithoutAuthorType, "isAuthorVisible">[]).map(startup => (
						<StartupCard key={startup._id} isAuthorVisible={false} {...startup} />
					))}
				</ul>
			) : (
				<p className="no-result">No posts yet</p>
			)}
		</>
	);
};

export default UserStartups;
