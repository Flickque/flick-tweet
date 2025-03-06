import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';
import { Platform, PostStatus } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const createPostsSchema = z.object({
	posts: z.array(
		z.object({
			date: z
				.string()
				.refine((date) => !Number.isNaN(new Date(date).getTime()), {
					message: 'Invalid date format',
				}),
			content: z.string(),
		}),
	),
});

export async function POST(request: Request) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		// Find user by email instead of ID
		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
		});

		if (!user) {
			return new NextResponse('User not found', { status: 404 });
		}

		const json = await request.json();
		const body = createPostsSchema.parse(json);

		const posts = await Promise.all(
			body.posts.map((post) => {
				const scheduledAt = new Date(post.date);
				if (Number.isNaN(scheduledAt.getTime())) {
					throw new Error(`Invalid date: ${post.date}`);
				}

				return prisma.post.create({
					data: {
						text: post.content,
						authorId: user.id,
						scheduledAt,
						status: PostStatus.SCHEDULED,
						platform: Platform.TWITTER,
						mediaUrls: [],
					},
				});
			}),
		);

		return NextResponse.json(posts);
	} catch (error) {
		console.error('[POSTS]', error);
		if (error instanceof z.ZodError) {
			return new NextResponse(JSON.stringify(error.errors), { status: 400 });
		}
		return new NextResponse('Internal Error', { status: 500 });
	}
}
