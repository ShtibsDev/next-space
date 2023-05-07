import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { createFollow, deleteFollow } from '@/app/services/follow-service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: Request) {
	const session = await getServerSession(authOptions);
	const currentUserEmail = session?.user?.email;

	if (!currentUserEmail) return NextResponse.json({ errorMessage: 'Not Authorized' }, { status: 401 });

	const { targetUserId } = await request.json();

	const record = await createFollow(currentUserEmail, targetUserId);
	return NextResponse.json(record);
}

export async function DELETE(request: NextRequest) {
	const session = await getServerSession(authOptions);
	const currentUserEmail = session?.user?.email;
	if (!currentUserEmail) return NextResponse.json({ errorMessage: 'Not Authorized' }, { status: 401 });

	const targetUserId = request.nextUrl.searchParams.get('targetUserId');

	if (!targetUserId) return NextResponse.json({ errorMessage: 'Invalid targetUserId in URL' });

	const record = await deleteFollow(currentUserEmail, targetUserId);
	return NextResponse.json(record);
}
