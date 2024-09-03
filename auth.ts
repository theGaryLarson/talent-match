import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
// import Microsoft from "next-auth/providers/microsoft-entra-id";
// import LinkedIn from "next-auth/providers/linkedin";
import type { Provider } from "next-auth/providers";
import { Role } from "./data/dtos/UserInfoDTO";

const providers: Provider[] = [
  GitHub,
 // Google,
 // Microsoft,
 // LinkedIn
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
        console.log("GOT TO LINE 31");
        if (user && user.email) {
          let fetchResponse;
          let createResponse;

          try {
            fetchResponse = await fetch(`/api/users/get/${user.email}`);
          } catch (error) {
            console.log("KEITH LOOK HERE" + fetchResponse);

            createResponse = await fetch(`/api/users/add`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: user.email,
                firstName: user.name?.split(" ")[0] || "",
                lastName: user.name?.split(" ")[1] || "",
                roles: [Role.JOBSEEKER],
              }),
            });

            if (createResponse && !createResponse.ok) {
              console.error(`Failed to create user: ${createResponse.statusText}`);
              throw new Error(`Failed to create user: ${createResponse.statusText}`);
            }

            const { result } = await createResponse.json();
            if (token.user) {
              token.id = result.userId;
              token.email = result.email;
              token.jobseekerId = result.jobseekerId || null;
              token.employerId = result.employerId;
              token.companyId = result.companyId;
              token.companyIsApproved = result.companyIsApproved;
              token.employeeIsApproved = result.employeeIsApproved;
            }
          }

          if (fetchResponse && fetchResponse.ok) {
            const { result } = await fetchResponse.json();
            token.id = result.userId;
            token.email = result.email;
            token.jobseekerId = result.jobseekerId;
            token.employerId = result.employerId;
            token.companyId = result.companyId;
            token.companyIsApproved = result.companyIsApproved;
            token.employeeIsApproved = result.employeeIsApproved;
          } else {
            console.error(`Failed to fetch user: ${fetchResponse?.statusText}`);
            throw new Error(`Failed to fetch user: ${fetchResponse?.statusText}`);
          }
        }
      } catch (error) {
        console.error('Error in JWT callback:', error);
        throw new Error('Failed to handle user authentication');
      }
      return token;
    },
    async session({ session, token }) {
      session.user.jobseekerId = token.jobseekerId;
      session.user.employerId = token.employerId;
      session.user.companyId = token.companyId;
      session.user.companyIsApproved = token.companyIsApproved;
      session.user.employeeIsApproved = token.employeeIsApproved;
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.roles = [Role.JOBSEEKER];
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
