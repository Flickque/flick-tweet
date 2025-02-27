'use client';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		setIsLoading(true);
		// Twitter auth will be implemented here
		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<Button
				variant="outline"
				type="button"
				disabled={isLoading}
				onClick={onSubmit}
			>
				{isLoading ? (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Icons.twitter className="mr-2 h-4 w-4 fill-muted-foreground" />
				)}{' '}
				Continue with Twitter
			</Button>
		</div>
	);
}
