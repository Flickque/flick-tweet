import { formatISO, parse } from 'date-fns';

export function parsePosts(input: string): { content: string; date: string }[] {
	return input
		.trim()
		.split(/\n\n/)
		.map((block) => {
			const lines = block.split('\n');
			const rawDate = lines.shift()?.trim() || '';
			const content = lines.join('\n').trim();

			// Parse date from dd.MM.yyyy HH:mm
			try {
				const parsedDate = parse(rawDate, 'dd.MM.yyyy HH:mm', new Date());
				return {
					date: formatISO(parsedDate),
					content,
				};
			} catch (error) {
				console.error('Error parsing date:', rawDate, error);
				return null;
			}
		})
		.filter(
			(tweet): tweet is { content: string; date: string } =>
				tweet !== null && !!tweet.content,
		);
}
