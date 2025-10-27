import z from "zod";

export const startupSchema = z.object({
	title: z.string().min(1, "Startup title is required"),
	description: z.string().min(1, "Description is required").max(500, "Description must be at most 500 characters"),
	category: z.string().min(1, "Category is required"),
	image: z.string().url("Image must be a valid URL"),
	pitch: z.string().min(1, "Pitch details are required"),
});
