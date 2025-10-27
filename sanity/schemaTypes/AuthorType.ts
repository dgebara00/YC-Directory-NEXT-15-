import { defineField, defineType } from "sanity";

export const authorType = defineType({
	name: "author",
	title: "Author",
	type: "document",
	fields: [
		defineField({
			name: "githubId",
			type: "number",
			validation: rule => rule.required(),
		}),
		defineField({
			name: "name",
			type: "string",
			validation: rule => rule.required(),
		}),
		defineField({
			name: "username",
			type: "string",
			validation: rule => rule.required(),
		}),
		defineField({
			name: "email",
			type: "string",
			validation: rule => rule.required(),
		}),
		defineField({
			name: "bio",
			type: "text",
			validation: rule => rule.required(),
		}),
		defineField({
			name: "image",
			type: "url",
			validation: rule => rule.required(),
		}),
	],
	preview: {
		select: {
			title: "name",
		},
	},
});
