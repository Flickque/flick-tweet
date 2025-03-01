import { prisma } from '../src/lib/prisma';

async function main() {
	const user = await prisma.user.findFirst();

	if (!user) {
		console.error('No user found in the database. Please create a user first.');
		process.exit(1);
	}

	const post = await prisma.post.create({
		data: {
			text: 'This is a test tweet! #testing #development',
			authorId: user.id,
			status: 'DRAFT',
			scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
		},
	});

	console.log('Created test post:', post);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
