import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
// import Microsoft from "next-auth/providers/microsoft-entra-id";
// import LinkedIn from "next-auth/providers/linkedin";
import type { Provider } from "next-auth/providers";
import { Role } from "./data/dtos/UserInfoDTO";
import { createUser, getUserByEmail } from "./app/lib/user";

const providers: Provider[] = [
  GitHub,
  // Google,
  // Microsoft,
  // LinkedIn
];

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
          let fetchResponse;
          let createResponse;

          try {
            fetchResponse = await getUserByEmail(user.email);

            if (!fetchResponse) {
              const userData = {
                email: user.email,
                firstName: user.name?.split(" ")[0] || "",
                lastName: user.name?.split(" ")[1] || "",
                roles: [Role.NONE],
              };

              createResponse = await createUser(userData);

              if (!createResponse) {
                console.error('Failed to create user');
                throw new Error('Failed to create user');
              }

              console.log('User created successfully:', createResponse);

              token.id = createResponse.userId;
              token.email = createResponse.email;
              token.jobseekerId = createResponse.jobseekerId || null;
              token.employerId = createResponse.employerId;
              token.companyId = createResponse.companyId;
              token.companyIsApproved = createResponse.companyIsApproved;
              token.employeeIsApproved = createResponse.employeeIsApproved;
            } else {
              token.id = fetchResponse.userId;
              token.email = fetchResponse.email;
              token.jobseekerId = fetchResponse.jobseekerId;
              token.employerId = fetchResponse.employerId;
              token.companyId = fetchResponse.companyId;
              token.companyIsApproved = fetchResponse.companyIsApproved;
              token.employeeIsApproved = fetchResponse.employeeIsApproved;
            }
          } catch (error) {
            console.error('Error during user fetch/create:', error);
            throw new Error('Failed to handle user authentication');
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
      session.user.roles = [Role.NONE];
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
