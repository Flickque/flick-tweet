import { LoginButton } from '@/components/modules/login/LoginButton';
import { LoginScene } from '@/components/modules/login/LoginScene';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Login - Flick Tweet',
	description: 'Login to Flick Tweet with your Twitter account',
};

export default function Login() {
	return (
		<div className="relative min-h-screen size-full flex-col items-center justify-center grid sm:px-0 px-2 lg:max-w-none lg:grid-cols-2 lg:px-0">
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">Welcome!</h1>
						<p className="text-sm text-muted-foreground">
							Schedule and manage your post in Twitter and Farcaster with ease.
						</p>
					</div>
					<LoginButton />
				</div>
			</div>
			<LoginScene />
		</div>
	);
}
