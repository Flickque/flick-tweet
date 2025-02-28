'use client';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';

export function LoginButton() {
	const [isLoading, setIsLoading] = useState(false);
	const { data: session } = useSession();

	if (session) return null;

	const handleSignIn = async () => {
		setIsLoading(true);
		try {
			await signIn('twitter');
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
			{isLoading ? (
				<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
			) : (
				<Icons.twitter className="mr-2 h-4 w-4 fill-muted-foreground" />
			)}{' '}
			Continue with Twitter
		</Button>
	);
}
