import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
	async function middleware(req) {
		const token = await getToken({ req });
		const isAuth = !!token;
		const isAuthPage = req.nextUrl.pathname.startsWith('/login');

		if (isAuthPage) {
			if (isAuth) {
				return NextResponse.redirect(new URL('/', req.url));
			}
			return null;
		}

		if (!isAuth) {
			let from = req.nextUrl.pathname;
			if (req.nextUrl.search) {
				from += req.nextUrl.search;
			}

			return NextResponse.redirect(
				new URL(`/login?from=${encodeURIComponent(from)}`, req.url),
			);
		}
	},
	{
		callbacks: {
			authorized: () => true,
		},
	},
);

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|objects).*)'],
};
