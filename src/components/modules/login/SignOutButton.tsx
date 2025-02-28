'use client';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

export function SignOutButton() {
	const [isLoading, setIsLoading] = useState(false);
	const { data: session } = useSession();

	if (!session) return null;

	const handleSignIn = async () => {
		setIsLoading(true);
		try {
			await signOut();
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			variant="outline"
			type="button"
			disabled={isLoading}
			onClick={handleSignIn}
		>
			{isLoading && (
				<Icons.twitter className="mr-2 h-4 w-4 fill-muted-foreground" />
			)}{' '}
			Sign Out
		</Button>
	);
}
