import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { formatDate } from "../lib/utils";
import type { Author, Startup } from "../sanity/lib/types";
import { Button } from "./ui/Button";
import { Skeleton } from "./ui/Skeleton";

type MinimalAuthor = Pick<Author, "name" | "image" | "githubId">;

type AuthorVisible = { isAuthorVisible: true; author: Required<MinimalAuthor> };
type AuthorHidden = { isAuthorVisible: false; author?: MinimalAuthor };

export type StartupCardWithAuthorType = Omit<Startup, "author"> & AuthorVisible;
export type StartupCardWithoutAuthorType = Omit<Startup, "author"> & AuthorHidden;

type Props = StartupCardWithAuthorType | StartupCardWithoutAuthorType;

const StartupCard = ({
	author,
	_createdAt,
	description,
	image,
	title,
	views,
	_id,
	category,
	isAuthorVisible,
}: Props) => {
	return (
		<li className="startup-card group">
			<div className="flex justify-between items-center mb-4">
				<span className="startup-card_date">{formatDate(_createdAt)}</span>
				<div className="flex flex-nowrap items-center">
					<Eye className="mr-1 text-primary" />
					<span>{views}</span>
				</div>
			</div>
			{isAuthorVisible && (
				<div className="flex justify-between">
					<div className="flex flex-col">
						<Link href={`/user/${author.githubId}`} className="text-16-semibold mb-2">
							{author.name}
						</Link>
						<Link href={`/startup/${_id}`}>
							<h3 className="text-26-semibold line-clamp-1">{title}</h3>
						</Link>
					</div>
					<Link href={`/user/${author.githubId}`}>
						<Image
							src={author.image as string}
							alt={`${author.name}'s avatar`}
							width={40}
							height={40}
							className="object-cover rounded-full"
						/>
					</Link>
				</div>
			)}
			<p className="startup-card_desc">{description}</p>
			<Image src={image as string} alt={title as string} width={400} height={200} className="startup-card_img" />
			<div className="flex justify-between items-center mt-5">
				<Link href={`/?query=${category?.toLowerCase()}`} className="text-16-medium">
					{category}
				</Link>
				<Button asChild className="startup-card_btn">
					<Link href={`/startup/${_id}`}>Details</Link>
				</Button>
			</div>
		</li>
	);
};

export const StartupCardsSkeleton = () => {
	const CARDS_COUNT = 4;

	return (
		<div className="card_grid-sm">
			{Array.from({ length: CARDS_COUNT }).map((_, index) => (
				<Skeleton key={index} className="startup-card_skeleton" />
			))}
		</div>
	);
};

export default StartupCard;
