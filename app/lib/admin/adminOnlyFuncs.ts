//TODO: write function that takes in a userID and sets their role to career Navigator
import {PrismaClient} from '@prisma/client';
import { Role } from '@/data/dtos/UserInfoDTO';
import getPrismaClient from '@/app/lib/prismaClient.mjs';
import {auth} from "@/auth";
const prisma: PrismaClient = getPrismaClient();
/**
 * fully replaces the users role with the role[] provided
 * @param userId user to be updated
 * @param newRoles 
 */
export async function adminUpdateUserRole(userId:string, newRoles:Role[]) {
    try {
      const session = await auth();
      if(!session?.user.roles.includes(Role.ADMIN)){
        throw new Error("ADMIN Role Needed for this function");
      }
      const result = await prisma.user.update({
        where: { id: userId },
        data: { role: newRoles.join() },
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  }