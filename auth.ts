import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [
  GitHub,
]

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  providers,
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user && user.email) {
          // Fetch user by email from your API
          const fetchResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/users/get/${user.email}`);

          if (fetchResponse.status === 404) {
            // User does not exist, create the user
            const createResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/users/add`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: user.email,
                firstName: user.name?.split(" ")[0] || "",
                lastName: user.name?.split(" ")[1] || "",
                roles: ["JOBSEEKER"],  // Default to JOBSEEKER role
              }),
            });

            if (!createResponse.ok) {
              console.error(`Failed to create user: ${createResponse.statusText}`);
              throw new Error(`Failed to create user: ${createResponse.statusText}`);
            }

            const { result } = await createResponse.json();
            token.id = result.userId;
            token.email = result.email;
          } else if (fetchResponse.ok) {
            const { result } = await fetchResponse.json();
            token.id = result.userId;
            token.email = result.email;
          } else {
            console.error(`Failed to fetch user: ${fetchResponse.statusText}`);
            throw new Error(`Failed to fetch user: ${fetchResponse.statusText}`);
          }
        }
      } catch (error) {
        console.error('Error in JWT callback:', error);
        throw new Error('Failed to handle user authentication');
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.roles = ["JOBSEEKER"];
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
