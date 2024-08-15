import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT as DefaultJWT } from 'next-auth/jwt';

import { User as NextAuthUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends NextAuthUser {
    id: string;
    roles: string[];
    createdAt: Date;
    updatedAt: Date;
  }

  interface Session {
    user?: User;
  }

  interface JWT {
    role: string;
  }
}