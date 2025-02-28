import NextAuth, { type AuthOptions } from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';
import { prisma } from './lib/prisma';

type OAuthAccount = {
	type: string;
	provider: string;
	providerAccountId: string;
};

async function linkAccount(userId: string, account: OAuthAccount) {
	return prisma.account.create({
		data: {
			userId,
			type: account.type,
			provider: account.provider,
			providerAccountId: account.providerAccountId,
		},
	});
}

async function findUserByEmailOrAccount(
	email: string | null | undefined,
	provider: string,
	providerAccountId: string,
) {
	// Try email first (indexed lookup)
	if (email) {
		const user = await prisma.user.findUnique({
			where: { email },
		});
		if (user) return user;
	}

	// Try provider account
	const account = await prisma.account.findUnique({
		where: {
			provider_providerAccountId: { provider, providerAccountId },
		},
		include: { user: true },
	});

	return account?.user ?? null;
}

async function updateUserProfile(
	userId: string,
	data: { name?: string | null; image?: string | null; email?: string | null },
) {
	return prisma.user.update({
		where: { id: userId },
		data: {
			...(data.name && { name: data.name }),
			...(data.image && { image: data.image }),
			...(data.email && { email: data.email }),
		},
	});
}

export const authOptions: AuthOptions = {
	providers: [
		TwitterProvider({
			clientId: process.env.AUTH_TWITTER_API_KEY ?? '',
			clientSecret: process.env.AUTH_TWITTER_API_KEY_SECRET ?? '',
			version: '1.0',
		}),
	],
	session: { strategy: 'jwt' },
	callbacks: {
		async signIn({ user, account }) {
			try {
				if (!account?.provider || !account.providerAccountId) {
					console.error('Auth failed: Missing provider account details');
					return false;
				}

				const dbUser = await findUserByEmailOrAccount(
					user.email,
					account.provider,
					account.providerAccountId,
				);

				if (dbUser) {
					// Check if account exists using unique constraint
					const existingAccount = await prisma.account.findUnique({
						where: {
							provider_providerAccountId: {
								provider: account.provider,
								providerAccountId: account.providerAccountId,
							},
						},
					});

					if (!existingAccount) {
						await linkAccount(dbUser.id, account);
					}

					// Keep profile update synchronous
					await updateUserProfile(dbUser.id, {
						name: user.name,
						image: user.image,
						email: user.email,
					});

					return true;
				}

				// Create new user with account
				await prisma.user.create({
					data: {
						email: user.email,
						name: user.name,
						image: user.image,
						accounts: {
							create: {
								type: account.type,
								provider: account.provider,
								providerAccountId: account.providerAccountId,
							},
						},
					},
				});

				return true;
			} catch (error) {
				console.error('Sign in error:', error);
				return false;
			}
		},

		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.sub as string;
			}
			return session;
		},
	},
};

export default NextAuth(authOptions);
