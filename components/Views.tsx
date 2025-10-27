import React from "react";
import { after } from "next/server";

import { writeClient } from "../sanity/lib/write-client";
import { client } from "../sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "../sanity/lib/queries";
import Ping from "./Ping";

type Props = {
	startupId: string;
};

const Views = async ({ startupId }: Props) => {
	const startup = await client.fetch(
		STARTUP_BY_ID_QUERY,
		{ id: startupId },
		{
			useCdn: false,
		}
	);

	if (!startup) {
		return null;
	}

	const totalViews = startup.views ?? 0;

	after(async () => {
		await writeClient.patch(startupId).inc({ views: 1 }).commit();
	});

	return (
		<div className="view-container">
			<Ping />
			<p className="view-text">Views: {totalViews}</p>
		</div>
	);
};

export default Views;
