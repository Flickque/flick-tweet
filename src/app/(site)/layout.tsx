import { Header } from '@/components/layout/Header';
import type { ReactNode } from 'react';

export default function SiteLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Header />
			<main className="container py-4">{children}</main>
		</>
	);
}
