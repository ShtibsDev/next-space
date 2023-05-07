import { User } from '@prisma/client';
import prisma from '../utils/prisma';
import { hashPassword } from './auth-service';

export async function getUsers() {
	const users = await prisma.user.findMany();
	return users;
}

export async function getUser(id: string) {
	const users = await prisma.user.findUnique({ where: { id } });
	return users;
}

export async function getUserByEmail(email: string) {
	const users = await prisma.user.findUnique({ where: { email } });
	return users;
}

export async function updateUser(user: User) {
	user.age = Number(user.age);

	const updatedUser = await prisma.user.update({ where: { id: user.id }, data: { ...user } });
	return updatedUser;
}

export async function createUser(data: User) {
	data.password = await hashPassword(data.password);
	const user = await prisma.user.create({ data });
	return user;
}
