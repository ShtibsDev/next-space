import { getPosts } from '@/app/services/content-service';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
	const session = await getServerSession();

	if (!session) {
		return NextResponse.json({ errorMessage: 'Not Authorized' }, { status: 401 });
	}

	const posts = await getPosts();
	return NextResponse.json(posts);
}
