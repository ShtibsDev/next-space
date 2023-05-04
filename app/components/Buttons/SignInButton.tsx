'use client';

import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function SignInButton() {
	const { data: session, status } = useSession();
	console.log(session, status);

	if (status === 'loading') {
		return <>...</>;
	}

	if (status === 'authenticated') {
		return (
			<Link href={`/dashboard`}>
				<img src={session.user?.image ?? '/mememan.webp'} className="rounded-full hover:opacity-80" width={32} height={32} alt="Your Name" />
			</Link>
		);
	}

	return <button onClick={() => signIn()}>Sign in</button>;
}
