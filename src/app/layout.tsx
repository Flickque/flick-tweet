import type { Metadata } from 'next';
import { Geist_Mono as FontMono, Inter as FontSans } from 'next/font/google';

import './globals.css';
import { authOptions } from '@/auth';
import { cn } from '@/lib/utils';
import { SessionProvider } from '@/providers/session';
import { getServerSession } from 'next-auth';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

const fontMono = FontMono({
	subsets: ['latin'],
	variable: '--font-mono',
});

export const metadata: Metadata = {
	title: 'Flick Tweet',
	description: 'Schedule tweets easily and stay consistent without the hassle.',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession(authOptions);

	return (
		<html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
			<body
				className={cn(
					'bg-background overscroll-none font-sans antialiased',
					fontSans.variable,
					fontMono.variable,
				)}
			>
				<SessionProvider session={session}>{children}</SessionProvider>
			</body>
		</html>
	);
}
