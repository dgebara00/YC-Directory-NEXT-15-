import { type SchemaTypeDefinition } from "sanity";

import { startupType } from "./StartupType";
import { authorType } from "./AuthorType";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [startupType, authorType],
};
