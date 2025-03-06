'use client';

import { sendTweet } from '@/app/actions/tweets';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useState } from 'react';

interface SendTwitterPostButtonProps {
	postId: string;
	text: string;
}

export function SendTwitterPostButton({
	postId,
	text,
}: SendTwitterPostButtonProps) {
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = async () => {
		setIsLoading(true);
		try {
			const result = await sendTweet(postId, text);
			if (!result.success) {
				throw new Error(result.error);
			}
		} catch (error) {
			console.error('Failed to send tweet:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			variant="outline"
			size="sm"
			onClick={handleClick}
			disabled={isLoading}
		>
			{isLoading ? (
				<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
			) : (
				<Icons.twitter className="mr-2 h-4 w-4" />
			)}
			Send Now
		</Button>
	);
}
