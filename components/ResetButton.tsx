import React from "react";
import Link from "next/link";
import { XIcon } from "lucide-react";

const ResetButton = () => {
	return (
		<Link href="/" className="search-btn">
			<XIcon className="size-5" />
		</Link>
	);
};

export default ResetButton;
