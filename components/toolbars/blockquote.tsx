"use client";

import { TextQuote } from "lucide-react";
import React from "react";

import { Button, type ButtonProps } from "../ui/Button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "../toolbars/ToolbarProvider";

const BlockquoteToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, onClick, children, ...props }, ref) => {
		const { editor } = useToolbar();
		return (
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className={cn("h-8 w-8", editor?.isActive("blockquote") && "bg-accent", className)}
						onClick={e => {
							editor?.chain().focus().toggleBlockquote().run();
							onClick?.(e);
						}}
						disabled={!editor?.can().chain().focus().toggleBlockquote().run()}
						ref={ref}
						{...props}
					>
						{children || <TextQuote className="h-4 w-4" />}
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<span>Blockquote</span>
				</TooltipContent>
			</Tooltip>
		);
	}
);

BlockquoteToolbar.displayName = "BlockquoteToolbar";

export { BlockquoteToolbar };
