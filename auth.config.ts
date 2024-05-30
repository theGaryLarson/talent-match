import { NextAuthConfig, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { User, Account, Profile } from 'next-auth';
import { getUser, getUserRole } from './app/lib/data';
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from 'bcryptjs';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User | null; account?: Account | null; profile?: Profile; isNewUser?: boolean }): Promise<JWT> {
      if (user) {
        const role = await getUserRole(user.id!);
        token.role = role || 'guest';
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      if (token?.role && session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required.');
        }

        const email = credentials.email as string;
        const password = credentials.password as string;
        const user = await getUser(email);
        console.log(user);
        if (user && user.password && await bcryptjs.compare(password, user.password)) {
          return user;
        }

        throw new Error('Invalid credentials.');
      },
    }),
  ],
};