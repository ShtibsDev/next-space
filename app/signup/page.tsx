import { User } from '@prisma/client';
import { createUser } from '../services/users-service';
import { redirect } from 'next/navigation';

type Props = {};

export default async function Page({}: Props) {
	async function createUserAction(data: FormData) {
		'use server';

		const user = {
			email: data.get('email')?.toString() ?? null,
			name: data.get('name')?.toString() ?? null,
			password: data.get('password')!.toString(),
		};

		const result = await createUser(user as User);

		if (result?.id) {
			redirect(`/users/${result.id}`);
		}
	}

	return (
		<>
			<h1>Create Your User</h1>
			<form action={createUserAction} className="flex flex-col gap-4 w-[50%] mt-4">
				<input type="email" name="email" placeholder="Email" />
				<input type="text" name="name" placeholder="Full Name" />
				<input type="password" name="password" placeholder="Password" />
				<input type="password" name="confirm-password" placeholder="Confirm Password" />
				<button>Create User</button>
			</form>
		</>
	);
}
