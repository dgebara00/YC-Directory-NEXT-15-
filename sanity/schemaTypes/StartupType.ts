import { defineField, defineType } from "sanity";

export const startupType = defineType({
	name: "startup",
	title: "Startup",
	type: "document",
	fields: [
		defineField({
			name: "title",
			type: "string",
			validation: rule => rule.required(),
		}),
		defineField({
			name: "author",
			type: "reference",
			to: [{ type: "author" }],
			validation: rule => rule.required(),
		}),
		defineField({
			name: "views",
			type: "number",
			validation: rule => rule.required().min(0),
		}),
		defineField({
			name: "description",
			type: "text",
			validation: rule => rule.required(),
		}),
		defineField({
			name: "category",
			type: "string",
			validation: rule => rule.required(),
		}),
		defineField({
			name: "image",
			type: "url",
			validation: rule => rule.required(),
		}),
		defineField({
			name: "pitch",
			type: "markdown",
			validation: rule => rule.required(),
		}),
	],
});
