import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import FollowButton from '@/app/components/FollowButton/FollowButton';
import { metadata } from '@/app/layout';
import { getUser, getUserByEmail } from '@/app/services/users-service';
import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';

type Props = {
	params: { id: string };
};

export default async function UserProfilePage({ params }: Props) {
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		redirect('/api/auth/signin');
	}

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
				{/* @ts-ignore */}
				<FollowButton targetUserId={user.id} />
			</section>
		</div>
	);
}
