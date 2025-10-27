import React from "react";

import StartupForm from "@/components/StartupForm";

const CreateStartupPage = () => {
	return (
		<>
			<section className="pink_container">
				<h1 className="heading">
					Submit Your Startup Idea <br /> and Get Noticed
				</h1>
			</section>
			<StartupForm />
		</>
	);
};

export default CreateStartupPage;
