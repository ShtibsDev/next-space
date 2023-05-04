import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getUserByEmail } from '../services/users-service';
import ProfileForm from './components/ProfileForm';
import { authOptions } from '../api/auth/[...nextauth]/route';

type Props = {};

export default async function DashboardPage({}: Props) {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/api/auth/signin');
	}

	const currentUserEmail = session.user?.email!;
	const user = (await getUserByEmail(currentUserEmail))!;

	return (
		<div>
			<h1>Dashboard</h1>
			<ProfileForm user={user} />
		</div>
	);
}
