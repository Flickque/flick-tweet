'use client';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function HeaderNav({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	const pathname = usePathname();

	return (
		<nav
			className={cn('flex items-center space-x-4 lg:space-x-6', className)}
			{...props}
		>
			<Link
				href="/posts"
				className={cn(
					'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
					pathname === '/posts' && 'text-primary',
				)}
			>
				Posts
			</Link>
			<Link
				href="/create"
				className={cn(
					'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
					pathname === '/create' && 'text-primary',
				)}
			>
				Create
			</Link>
		</nav>
	);
}
