import { authenticateUser } from '@/app/services/auth-service';
import Credentials from '@/app/types/Credentials';
import prisma from '@/app/utils/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import LinkedinProvider from 'next-auth/providers/linkedin';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				const user = await authenticateUser({ ...credentials! });

				if (user) {
					return user;
				}
				return null;
			},
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		LinkedinProvider({
			clientId: process.env.LINKEDIN_ID!,
			clientSecret: process.env.LINKEDIN_SECRET!,
		}),
	],
	session: {
		strategy: 'jwt',
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
