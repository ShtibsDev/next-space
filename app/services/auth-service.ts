import Credentials from '../types/Credentials';
import { getUserByEmail } from './users-service';
import bcrypt from 'bcrypt';

export async function authenticateUser(credentials: Credentials) {
	const user = await getUserByEmail(credentials.username);

	if (!user) return null;

	const isValidated = await validatePassword(credentials.password, user.password);

	if (isValidated) return user;

	return null;
}

export async function validatePassword(userPassword: string, hashedPassword: string) {
	const isMatch = await bcrypt.compare(userPassword, hashedPassword);
	return isMatch;
}

export async function hashPassword(password: string) {
	return await bcrypt.hash(password, 10);
}
