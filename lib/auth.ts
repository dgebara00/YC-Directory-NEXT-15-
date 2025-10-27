import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

import { AUTHOR_BY_GITHUB_ID_QUERY } from "../sanity/lib/queries";
import { writeClient } from "../sanity/lib/write-client";
import { client } from "../sanity/lib/client";

export const { handlers, auth } = NextAuth({
	providers: [
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID,
			clientSecret: process.env.AUTH_GITHUB_SECRET,
		}),
	],
	callbacks: {
		async signIn({ profile }) {
			const userExists = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id }, { useCdn: false });

			if (!userExists) {
				await writeClient.create({
					_type: "author",
					githubId: profile?.id,
					name: profile?.name,
					username: profile?.login,
					email: profile?.email,
					bio: profile?.bio,
					image: profile?.avatar_url,
				});
			}

			return true;
		},
		jwt: async ({ token, profile }) => {
			if (profile) {
				const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile.id });

				if (user) {
					token.id = user._id;
					token.githubId = profile.id;
				}
			}

			return token;
		},
		session: async ({ session, token }) => {
			if (token) {
				session.user.id = token.id as string;
				session.user.githubId = token.githubId as number;
			}

			return session;
		},
	},
});
