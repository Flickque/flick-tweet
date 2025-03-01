'use client';

import { Badge } from '@/components/ui/badge';
import type { PostStatus } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

const formatDate = (date: Date) => {
	return date.toISOString().replace('T', ' ').slice(0, 19);
};

export type Post = {
	id: string;
	text: string;
	scheduledAt: Date | null;
	status: PostStatus;
};

export const columns: ColumnDef<Post>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
		cell: ({ row }) => {
			const id: string = row.getValue('id');
			return <div className="font-mono">{id.slice(0, 8)}...</div>;
		},
	},
	{
		accessorKey: 'text',
		header: 'Text',
		cell: ({ row }) => {
			const text: string = row.getValue('text');
			return (
				<div className="max-w-[500px] truncate" title={text}>
					{text}
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
