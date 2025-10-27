import "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			githubId: number;
			name: string;
			email: string;
			image: string;
		};
	}
}
