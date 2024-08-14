import { PrismaClient } from '@prisma/client';
import { User } from './definitions';

const prisma = new PrismaClient();

// Get user function specifically for credentials auth

export async function getUser(email?: string | null): Promise<User | null> {
  console.log('getUser called with email:', email);
  if (email) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      const emailVerification = user?.emailVerified ? user.emailVerified.toISOString() : null;
      const dateCreated = user?.createdAt ? user.createdAt.toISOString() : new Date().toISOString();
      const dateUpdated = user?.updatedAt ? user.updatedAt.toISOString() : null;
      if (user) {
        return {
          id: user.id,
          name: user.first_name + ' ' + user.last_name,
          email: user.email,
          emailVerified: emailVerification,
          image: user.photo_url,
          role: user.role,
          createdAt: dateCreated,
          updatedAt: dateUpdated,
        };
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }
  return null;
}

export async function getUserRole(email?: string | null): Promise<string | null> {
  console.log('getUserRole called with email:', email);
  if (email) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        return user.role;
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  }
  return null;
}
