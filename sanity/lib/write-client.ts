"server-only";

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, writeToken } from "../env";

export const writeClient = createClient({
	projectId,
	dataset,
	apiVersion,
	token: writeToken,
	useCdn: true,
});
