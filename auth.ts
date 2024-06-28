import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { getUserRole } from "./app/lib/data";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [GitHub],
  callbacks: {
    jwt({ token, user }) {
      if (user && user.email) {
        token.id = user.id as string;
        token.email = user.email as string;
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id
      session.user.email = token.email
      return session
    },
  },
})