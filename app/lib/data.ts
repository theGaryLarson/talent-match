/**import { PrismaClient } from '@prisma/client';
import { User } from './definitions';
import { hash } from 'bcryptjs';

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


export async function createJobseekerIfNotExists(email: string): Promise<User | null> {
  // Check if the user already exists
  const existingUser = await prisma.contacts.findUnique({
    where: { email },
  });


  if (existingUser) {
    if (existingUser.password === null) {
      const updatedUser = await prisma.contacts.update({
        where: { email },
        data: {
          updatedAt: new Date(),
        },
      });
        return updatedUser;
    }
    return existingUser;
  }
  try {

    const newUser = await prisma.contacts.create({
      data: {
        email,
        role: 'JOBSEEKER',
        name: '',
        emailVerified: null,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}
  */