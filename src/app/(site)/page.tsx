import { prisma } from '@/lib/prisma';
import { PostsView } from '@/views/Posts/PostsView';
import { columns } from '@/views/Posts/columns';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Posts - Flick Tweet',
	description: 'Manage your scheduled tweets.',
};

export default async function PostsPage() {
	const posts = await prisma.post.findMany({
		orderBy: [
			{
				scheduledAt: 'desc',
			},
			{
				createdAt: 'desc',
			},
		],
	});

	return (
		<div className="hidden h-full flex-1 flex-col space-y-8 py-8 md:flex">
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Posts</h2>
					<p className="text-muted-foreground">
						Here&apos;s a list of your scheduled post!
					</p>
				</div>
			</div>
			<PostsView data={posts} columns={columns} />
		</div>
	);
}
