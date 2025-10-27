import React from "react";

const Ping = () => (
	<div className="absolute -right-1 -top-1">
		<span className="flex size-[11px]">
			<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary--default opacity-75"></span>
			<span className="inline-flex size-[11px] rounded-full bg-primary--default"></span>
		</span>
	</div>
);

export default Ping;
