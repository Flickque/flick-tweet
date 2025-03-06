'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import React from 'react';

const CommandSymbol3D = dynamic(
	() =>
		import('@/components/elements/CommandSymbol3D').then(
			(mod) => mod.CommandSymbol3D,
		),
	{
		ssr: false,
	},
);

export function LoginScene() {
	return (
		<div className="relative hidden h-full flex-col bg-black p-10 lg:flex">
			<Suspense fallback={<div className="size-full animate-pulse bg-black" />}>
				<CommandSymbol3D />
			</Suspense>
		</div>
	);
}
