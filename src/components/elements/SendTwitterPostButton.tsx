import { Button } from '../ui/button';

export function SendTwitterPostButton() {
	return (
		<form
			action={async () => {
				'use server';
			}}
		>
			<Button type="submit">Send Twitter Post</Button>
		</form>
	);
}
