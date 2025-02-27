import type { Metadata } from 'next';
import { Geist_Mono as FontMono, Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
			<body
				className={cn(
					'bg-background overscroll-none font-sans antialiased',
					fontSans.variable,
					fontMono.variable,
				)}
			>
				{children}
			</body>
		</html>
	);
}
