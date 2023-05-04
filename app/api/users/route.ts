import { getUsers } from '@/app/services/users-service';
import { NextResponse } from 'next/server';

export async function GET() {
	const users = await getUsers();

	if (!users.length) return NextResponse.json({ errorMessage: 'Users not found' }, { status: 404 });

	return NextResponse.json(users);
}
