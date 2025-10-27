// src/sanity/lib/live.ts

import { defineLive } from "next-sanity/live";
// import your local configured client
import { client } from "./client";

// export the sanityFetch helper and the SanityLive component
export const { sanityFetch, SanityLive } = defineLive({
	client,
});
