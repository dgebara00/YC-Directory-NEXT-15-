import { Search } from "lucide-react";

import ResetButton from "./ResetButton";

type Props = {
	query?: string;
};

const SearchInput = ({ query }: Props) => {
	return (
		<form action="/" className="search-form">
			<input name="query" type="text" className="search-input" placeholder="Search Startups..." defaultValue={query} />
			{query && <ResetButton />}
			<button type="submit" className="search-btn">
				<Search className="size-5" />
			</button>
		</form>
	);
};

export default SearchInput;
