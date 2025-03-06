'use client';

import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/ui/icons';
import type { Platform, PostStatus } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

const formatDate = (date: Date) => {
	return date.toISOString().replace('T', ' ').slice(0, 19);
};

export type Post = {
	id: string;
	text: string;
	scheduledAt: Date | null;
	status: PostStatus;
	platform: Platform;
};

const PlatformIcon = ({ platform }: { platform: Platform }) => {
	switch (platform) {
		case 'TWITTER':
			return <Icons.twitter className="h-4 w-4 fill-foreground" />;
		case 'FARCASTER':
			// You can add Farcaster icon here when needed
			return <Icons.farcaster className="h-4 w-4 fill-foreground" />;
		default:
			return null;
	}
};

export const columns: ColumnDef<Post>[] = [
	{
		accessorKey: 'index',
		header: '#',
		cell: ({ row }) => row.index + 1,
	},
	{
		accessorKey: 'text',
		header: 'Text',
		cell: ({ row }) => {
			const text: string = row.getValue('text');
			return (
				<div className="max-w-3xl w-full" title={text}>
					<p>{text}</p>
				</div>
			);
		},
	},
	{
		accessorKey: 'platform',
		header: 'Platform',
		cell: ({ row }) => {
			const platform: Platform = row.getValue('platform');
			return (
				<div className="flex items-center gap-2">
					<PlatformIcon platform={platform} />
					<span className="text-sm">
						{platform.charAt(0).toUpperCase() +
							platform.slice(1).toLocaleLowerCase()}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'scheduledAt',
		header: 'Scheduled At',
		cell: ({ row }) => {
			const date: Date | null = row.getValue('scheduledAt');
			if (!date)
				return <div className="text-muted-foreground">Not scheduled</div>;
			return <div>{formatDate(date)}</div>;
		},
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const status: PostStatus = row.getValue('status');
			return (
				<Badge
					variant={
						status === 'PUBLISHED'
							? 'default'
							: status === 'SCHEDULED'
								? 'secondary'
								: status === 'DRAFT'
									? 'outline'
									: 'destructive'
					}
				>
					{status.toLowerCase()}
				</Badge>
			);
		},
	},
];
