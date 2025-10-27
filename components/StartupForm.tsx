"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import MarkdownInput from "./MarkdownInput";
import { createStartup } from "@/lib/data/startups";
import { startupSchema as schema } from "@/lib/schemas";
import { StartupActionState } from "@/lib/types";

type Schema = z.infer<typeof schema>;

const initialState: StartupActionState = {
	success: false,
	error: {},
};

const StartupForm = () => {
	const { register, formState, control, watch } = useForm<Schema>({
		resolver: zodResolver(schema),
		mode: "onBlur",
	});

	const [_, formAction, isPending] = React.useActionState(
		(prevData: StartupActionState, formData: FormData) =>
			createStartup(prevData, formData, { additionalField: { pitch: watch("pitch") } }),
		initialState
	);

	const { errors, isValid } = formState;
	// const mergedErrors = { ...errors, ..._.error }; TODO: handle server-side errors

	return (
		<form action={formAction} className="startup-form">
			<Input
				label="Title"
				placeholder="Enter your startup title"
				{...register("title")}
				error={errors.title?.message}
				className="startup-form_input"
			/>
			<Textarea
				label="Description"
				placeholder="Describe your startup"
				{...register("description")}
				error={errors.description?.message}
				className="startup-form_textarea"
			/>
			<Input
				label="Category"
				placeholder="Startup Category (Tech, Health, Education...)"
				{...register("category")}
				error={errors.category?.message}
				className="startup-form_input"
			/>
			<Input
				label="Image URL"
				placeholder="Enter image URL"
				{...register("image")}
				error={errors.image?.message}
				className="startup-form_input"
			/>
			<Controller
				name="pitch"
				control={control}
				defaultValue=""
				render={({ field, fieldState: { error } }) => (
					<MarkdownInput
						label="Pitch"
						content={field.value}
						onChange={field.onChange}
						onBlur={field.onBlur}
						error={error?.message}
						disabled={field.disabled}
					/>
				)}
			/>
			<button type="submit" disabled={!isValid || isPending} className="startup-form_btn">
				{isPending ? "Submitting..." : "Submit"}
			</button>
		</form>
	);
};

export default StartupForm;
