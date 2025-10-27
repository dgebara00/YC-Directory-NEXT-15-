import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import markdownit from "markdown-it";

import { client } from "../../../sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "../../../sanity/lib/queries";
import { formatDate } from "../../../lib/utils";
import { Skeleton } from "../../../components/ui/Skeleton";
import Views from "../../../components/Views";

const md = new markdownit();

export default async function StartupPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const startup = await client.fetch(STARTUP_BY_ID_QUERY, { id });

	const parsedPitchToHtml = startup?.pitch ? md.render(startup.pitch) : null;

	if (!startup) {
		return notFound();
	}

	return (
		<>
			<section className="pink_container !min-h-[230px]">
				<p className="tag">{formatDate(startup._createdAt)}</p>
				<h1 className="heading">{startup.title}</h1>
				<p className="sub-heading">{startup.description}</p>
			</section>
			<section className="section_container">
				<Image
					src={startup.image as string}
					alt={startup.title as string}
					width={800}
					height={400}
					className="w-full h-auto mb-5 rounded-lg"
				/>
				<div className="flex-between items-center mb-5">
					<Link href={`/user/${startup.author?.githubId}`} className="flex gap-2 items-center mb-3">
						<Image
							src={startup.author?.image as string}
							alt={`${startup.author?.name}'s avatar`}
							width={40}
							height={40}
							className="object-cover rounded-full"
						/>
						<div>
							<p className="text-20-medium">{startup.author?.name}</p>
							<p className="text-16-medium !text-black-300">@{startup.author?.username}</p>
						</div>
					</Link>
					<span className="category-tag">{startup.category}</span>
				</div>
				<h3 className="text-30-bold">Pitch Details</h3>
				{parsedPitchToHtml ? (
					<article className="prose max-w-none mt-5" dangerouslySetInnerHTML={{ __html: parsedPitchToHtml }} />
				) : (
					<p className="no-result">No pitch details available.</p>
				)}
				<hr className="divider" />
				<Suspense fallback={<Skeleton className="view_skeleton" />}>
					<Views startupId={id} />
				</Suspense>
			</section>
		</>
	);
}
