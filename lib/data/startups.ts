"use server";

import { redirect } from "next/navigation";
import turndown from "turndown";
import { z } from "zod";

import { requireUser } from "./user";
import { writeClient } from "@/sanity/lib/write-client";
import { startupSchema } from "../schemas";
import { StartupActionState } from "../types";

export const createStartup = async (
	formData: FormData,
	{ additionalField: { pitch } }: { additionalField: { pitch: string } }
): Promise<StartupActionState | void> => {
	let docId: string | null = null;

	try {
		const user = await requireUser();
		const td = new turndown();

		const rawData = {
			title: formData.get("title"),
			description: formData.get("description"),
			category: formData.get("category"),
			image: formData.get("image"),
			pitch: td.turndown(pitch),
		};

		const parsedData = startupSchema.parse(rawData);

		const createdDoc = await writeClient.create({
			_type: "startup",
			...parsedData,
			views: 0,
			author: {
				_type: "reference",
				_ref: user.id,
			},
		});

		docId = createdDoc._id;
	} catch (error) {
		if (error instanceof z.ZodError) {
			const formattedErrors = error.flatten().fieldErrors;

			return {
				errors: formattedErrors,
			};
		}

		return {
			errors: { root: (error as Error).message },
		};
	}

	if (docId) {
		redirect(`/startup/${docId}`);
	}
};
