import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Twitter from 'next-auth/providers/twitter';
import { prisma } from './lib/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		Twitter({
			clientId: process.env.TWITTER_CLIENT_ID ?? '',
			clientSecret: process.env.TWITTER_CLIENT_SECRET ?? '',
			version: '2.0', // opt-in to Twitter OAuth 2.0
		}),
	],
	callbacks: {
		session({ session, user }) {
			if (session.user && user) {
				session.user = {
					...session.user,
					id: user.id,
				};
			}
			return session;
		},
	},
});
