import prisma from '../utils/prisma';

export async function createFollow(userEmail: string, targetUserId: string) {
	const currentUserId = await prisma.user.findUnique({ where: { email: userEmail } }).then((user) => user?.id!);

	return await prisma.follows.create({
		data: {
			followerId: currentUserId,
			followingId: targetUserId,
		},
	});
}

export async function deleteFollow(userEmail: string, targetUserId: string) {
	const currentUserId = await prisma.user.findUnique({ where: { email: userEmail } }).then((user) => user?.id!);

	return await prisma.follows.delete({
		where: {
			followerId_followingId: {
				followerId: currentUserId,
				followingId: targetUserId,
			},
		},
	});
}
