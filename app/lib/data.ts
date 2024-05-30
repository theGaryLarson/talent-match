import { PrismaClient } from '@prisma/client';
import type { User } from '@/app/lib/definitions';

const prisma = new PrismaClient();

export async function getUser(email?: string | null): Promise<User | null> {
  console.log('getUser called with email:', email);
  if (email) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      console.log('User fetched:', user);
      return user;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }
  console.warn('No email provided to getUser');
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
        console.log('User role fetched:', user.role);
        return user.role;
      } else {
        console.warn('No user found for email:', email);
      }
    } catch (error) {
      console.error('Failed to fetch user role:', error);
      throw new Error('Failed to fetch user role.');
    }
  }
  console.warn('No email provided to getUserRole');
  return null;
}
