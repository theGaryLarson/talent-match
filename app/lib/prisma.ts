import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers(): Promise<User[]> {
  return await prisma.user.findMany({where:{
    role:{
        equals: 'Jobseeker'
    }
  }});
}