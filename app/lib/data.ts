import { PrismaClient } from '@prisma/client';
import type { User } from '@/app/lib/definitions';

const prisma = new PrismaClient();

export async function getUser(email?: string | null): Promise<User | null> {
  if (email) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }
  return null;
}

export async function getUserRole(email?: string | null): Promise<string | null> {
  if (email) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (user) {
      return user.role;
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }
  return null;
}

