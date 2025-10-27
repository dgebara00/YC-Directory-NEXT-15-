import * as React from "react";

import { cn } from "@/lib/utils";

type Props = {
	error?: string;
	label: string;
} & React.ComponentProps<"textarea">;

const Textarea = React.forwardRef(({ className, label, ...props }: Props, ref: React.Ref<HTMLTextAreaElement>) => (
	<label className="flex flex-col gap-1 w-full">
		<span className="startup-form_label">{label}</span>
		<textarea
			data-slot="textarea"
			className={cn(
				"border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				className
			)}
			{...props}
			ref={ref}
		/>
		<p className={`min-h-5 text-sm text-destructive mt-1 ${props.error ? "visible" : "invisible"}`}>{props.error}</p>
	</label>
));

Textarea.displayName = "Textarea";

export default Textarea;
