import SearchInput from "../components/SearchInput";
import StartupCard from "../components/StartupCard";
import { STARTUPS_QUERY } from "../sanity/lib/queries";
import { type StartupCardWithAuthorType } from "../components/StartupCard";
import { sanityFetch, SanityLive } from "../sanity/lib/live";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
	const { query } = await searchParams;
	const { data: startups } = await sanityFetch({
		query: STARTUPS_QUERY,
		params: {
			search: query ?? null,
		},
	});

	return (
		<>
			<section className="pink_container">
				<h1 className="heading">
					Pitch Your Startup, <br /> Connect With Entrepreneurs
				</h1>
				<p className="sub-heading">Submit ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.</p>
				<SearchInput query={query} />
			</section>
			<section className="section_container">
				<h2 className="text-30-semibold mb-7">{query ? `Search Results for "${query}"` : "Trending Startups"}</h2>
				<ul className="card_grid">
					{(startups as Omit<StartupCardWithAuthorType, "isAuthorVisible">[]).map(startup => (
						<StartupCard isAuthorVisible key={startup._id} {...startup} />
					))}
				</ul>
			</section>
			<SanityLive />
		</>
	);
}
