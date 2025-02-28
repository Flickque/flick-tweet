import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { UserNavClient } from './UserNavClient';

export async function UserNav() {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		redirect('/login');
	}

	return <UserNavClient user={session.user} />;
}
