'use client';

import { User } from '@prisma/client';
import axios from 'axios';
import { FormEvent } from 'react';

type Props = {
	user: User;
};

export default function ProfileForm({ user }: Props) {
	const updateUser = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const body = {
			email: user.email,
			name: formData.get('name'),
			bio: formData.get('bio'),
			age: formData.get('age'),
			image: formData.get('image'),
		};

		const res = await axios.put(`/api/users/${user.id}`, body);
	};

	return (
		<div>
			<h2>Edit Your Profile</h2>
			<form className="flex flex-col gap-4" onSubmit={updateUser}>
				<div className="flex flex-col">
					<label htmlFor="name">Name</label>
					<input className="border" type="text" name="name" defaultValue={user?.name ?? ''} />
				</div>
				<div className="flex flex-col">
					<label htmlFor="bio">Bio</label>
					<textarea name="bio" cols={30} rows={10} defaultValue={user?.bio ?? ''}></textarea>
				</div>
				<div className="flex flex-col">
					<label htmlFor="age">Age</label>
					<input type="text" name="age" defaultValue={user?.age ?? 0} />
				</div>
				<div className="flex flex-col">
					<label htmlFor="image">Profile Image URL</label>
					<input type="text" name="image" defaultValue={user?.image ?? ''} />
				</div>

				<button className="w-14 bg-green-400 text-white rounded" type="submit">
					Save
				</button>
			</form>
		</div>
	);
}
