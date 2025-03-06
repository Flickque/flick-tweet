import { authOptions } from '@/auth';
import { decryptToken } from '@/lib/kms';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { TwitterApi } from 'twitter-api-v2';
import { z } from 'zod';

const sendTweetSchema = z.object({
	postId: z.string(),
	text: z.string(),
});

export async function POST(request: Request) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const json = await request.json();
		const { text } = sendTweetSchema.parse(json);

		// First find the user by email
		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
		});

		if (!user) {
			return new NextResponse('User not found', { status: 404 });
		}

		// Get Twitter tokens from the Account model
		const twitterAccount = await prisma.account.findFirst({
			where: {
				userId: user.id,
				provider: 'twitter',
			},
			select: {
				oauthToken: true,
				oauthTokenSecret: true,
			},
		});

		if (!twitterAccount?.oauthToken || !twitterAccount?.oauthTokenSecret) {
			return new NextResponse('Twitter account not connected', { status: 400 });
		}

		// Decrypt tokens before using them
		const decryptedToken = await decryptToken(twitterAccount.oauthToken);
		const decryptedTokenSecret = await decryptToken(
			twitterAccount.oauthTokenSecret,
		);

		const client = new TwitterApi({
			appKey: process.env.AUTH_TWITTER_API_KEY || '',
			appSecret: process.env.AUTH_TWITTER_API_KEY_SECRET || '',
			accessToken: decryptedToken,
			accessSecret: decryptedTokenSecret,
		});

		const tweet = await client.v2.tweet(text);

		return NextResponse.json(tweet);
	} catch (error) {
		console.error('[TWEETS]', error);
		if (error instanceof z.ZodError) {
			return new NextResponse(JSON.stringify(error.errors), { status: 400 });
		}
		return new NextResponse('Internal Error', { status: 500 });
	}
}
