import { PostsCreateForm } from '@/views/Posts/PostsCreateForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Create Posts - Flick Tweet',
	description: 'Create and schedule new tweets.',
};

export default function CreatePage() {
	return (
		<div className="container py-8">
			<div className="flex flex-col gap-4">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Create Posts</h2>
					<p className="text-muted-foreground">
						Enter your tweets in the format:
					</p>
					<pre className="mt-2 rounded-lg bg-muted p-4">
						{`dd.MM.yyyy HH:mm, example: 28.02.2025 12:00
tweet text
empty line for new tweet`}
					</pre>
				</div>
				<PostsCreateForm />
			</div>
		</div>
	);
}
