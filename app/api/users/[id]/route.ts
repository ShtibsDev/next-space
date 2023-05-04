import { getUser, updateUser } from '@/app/services/users-service';
import { User } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const user = await getUser(params.id);

	if (!user) return NextResponse.json({ errorMessage: 'User not found' }, { status: 404 });

	return NextResponse.json(user);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
	const session = await getServerSession(authOptions);
	const data: User = await request.json();

	if (!session || session.user?.email !== data.email) {
		return NextResponse.json({ errorMessage: 'Not Authorized' }, { status: 401 });
	}

	data.id = params.id;
	const updatedUser = await updateUser(data);

	return NextResponse.json(updatedUser);
}
