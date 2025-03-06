export async function sendTweet(postId: string, text: string) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_APP_URL}/api/tweets/send`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ postId, text }),
			},
		);

		if (!response.ok) {
			throw new Error('Failed to send tweet');
		}

		return { success: true };
	} catch (error) {
		console.error('Error sending tweet:', error);
		return { success: false, error: 'Failed to send tweet' };
	}
}
