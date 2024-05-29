import { NextAuthConfig, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { User, Account, Profile } from 'next-auth';
import { getUserRole } from './app/lib/data';

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
    async authorized({ auth, request: { nextUrl } }: { auth: any; request: { nextUrl: URL } }): Promise<boolean> {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/services/employers');
      
      if (isOnDashboard) {
        if (isLoggedIn && auth.user.role === 'employer') {
          return true; 
        }
        return false;
      } else if (isLoggedIn) {
        if (auth.user.role === 'employer' && nextUrl.pathname !== '/services/employers/dashboard') {
          return false;
        } else if (auth.user.role === 'jobseeker' && nextUrl.pathname !== '/services/jobseekers/dashboard') {
          return false;
        }
      }
      return true;
    },
  },
  providers: [
    // Add your providers here, e.g.,
    // Providers.Google({ clientId: process.env.GOOGLE_ID, clientSecret: process.env.GOOGLE_SECRET }),
  ],
};