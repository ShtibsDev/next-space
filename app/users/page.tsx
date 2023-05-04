import UserCard from '../components/UserCard/UserCard';
import { getUsers } from '../services/users-service';

type Props = {};

export default async function UsersPage({}: Props) {
	const users = await getUsers();

	return (
		<div className="flex flex-wrap p-4 gap-4">
			{users.map(({ id, name, age, image }) => (
				<UserCard id={id} name={name} age={age} image={image} key={id} />
			))}
		</div>
	);
}
