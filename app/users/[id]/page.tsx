import { metadata } from '@/app/layout';
import { getUser } from '@/app/services/users-service';
import { notFound } from 'next/navigation';

type Props = {
	params: { id: string };
};

export default async function UserProfilePage({ params }: Props) {
	const user = await getUser(params.id);
	if (!user) notFound();

	metadata.title = `User profile of ${user.name}`;

	return (
		<div>
			<h1 className="text-3xl">{user.name}</h1>
			<img src={user.image ?? '/mememan.webp'} width={300} />
			<section className="pt-4">
				<h3 className="text-xl">Bio</h3>
				<p>{user.bio}</p>
			</section>
		</div>
	);
}
