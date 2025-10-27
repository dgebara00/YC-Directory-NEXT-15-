"use client";

import { EditorContent, type Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Separator } from "@/components/ui/separator";
import { BlockquoteToolbar } from "@/components/toolbars/blockquote";
import { BoldToolbar } from "@/components/toolbars/bold";
import { BulletListToolbar } from "@/components/toolbars/bullet-list";
import { CodeToolbar } from "@/components/toolbars/code";
import { CodeBlockToolbar } from "@/components/toolbars/code-block";
import { HardBreakToolbar } from "@/components/toolbars/hard-break";
import { HorizontalRuleToolbar } from "@/components/toolbars/horizontal-rule";
import { ItalicToolbar } from "@/components/toolbars/italic";
import { OrderedListToolbar } from "@/components/toolbars/ordered-list";
import { RedoToolbar } from "@/components/toolbars/redo";
import { StrikeThroughToolbar } from "@/components/toolbars/strikethrough";
import { ToolbarProvider } from "@/components/toolbars/ToolbarProvider";
import { UndoToolbar } from "@/components/toolbars/undo";

const extensions = [
	StarterKit.configure({
		orderedList: {
			HTMLAttributes: {
				class: "list-decimal",
			},
		},
		bulletList: {
			HTMLAttributes: {
				class: "list-disc",
			},
		},
		code: {
			HTMLAttributes: {
				class: "bg-accent rounded-md p-1",
			},
		},
		horizontalRule: {
			HTMLAttributes: {
				class: "my-2",
			},
		},
		codeBlock: {
			HTMLAttributes: {
				class: "bg-primary text-primary-foreground p-2 text-sm rounded-md p-1",
			},
		},
		heading: {
			levels: [1, 2, 3, 4],
			HTMLAttributes: {
				class: "tiptap-heading",
			},
		},
	}),
];

type Props = {
	content: string;
	label: string;
	onChange: (content: string) => void;
	onBlur: () => void;
	disabled?: boolean;
	error?: string;
};

const MarkdownInput = ({ content, onChange, onBlur, label, error, disabled }: Props) => {
	const editor = useEditor({
		extensions: extensions as Extension[],
		content,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
		onBlur,
		editable: !disabled,
		immediatelyRender: false,
	});

	if (!editor) {
		return null;
	}
	return (
		<span className="flex flex-col gap-1 w-full">
			<span className="startup-form_label">{label}</span>
			<div className="border-3 border-black w-full relative rounded-[20px] overflow-hidden pb-3 mt-3">
				<div className="flex w-full items-center py-2 px-2 justify-between border-b  sticky top-0 left-0 bg-background z-20">
					<ToolbarProvider editor={editor}>
						<div className="flex items-center gap-2">
							<UndoToolbar />
							<RedoToolbar />
							<Separator orientation="vertical" className="h-7" />
							<BoldToolbar />
							<ItalicToolbar />
							<StrikeThroughToolbar />
							<BulletListToolbar />
							<OrderedListToolbar />
							<CodeToolbar />
							<CodeBlockToolbar />
							<HorizontalRuleToolbar />
							<BlockquoteToolbar />
							<HardBreakToolbar />
						</div>
					</ToolbarProvider>
				</div>
				<div
					onClick={() => {
						editor?.chain().focus().run();
					}}
					className="cursor-text min-h-[18rem] bg-background"
				>
					<EditorContent className="outline-none" editor={editor} />
				</div>
			</div>
			<p className={`min-h-5 text-sm text-destructive mt-1 ${error ? "visible" : "invisible"}`}>{error}</p>
		</span>
	);
};

export default MarkdownInput;
