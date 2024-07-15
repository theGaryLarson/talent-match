import { PrismaClient } from '@prisma/client';
import { User } from './definitions';

const prisma = new PrismaClient();

// Get user function specifically for credentials auth

// export async function getUser(email?: string | null): Promise<User | null> {
//   console.log('getUser called with email:', email);
//   if (email) {
//     try {
//       const user = await prisma.user.findUnique({
//         where: { email },
//       });
//
//       if (user && user.password) {
//         return {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           emailVerified: user.emailVerified,
//           image: user.image,
//           password: user.password,
//           role: user.role,
//           createdAt: user.createdAt,
//           updatedAt: user.updatedAt,
//         };
//       }
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       return null;
//     }
//   }
//   return null;
// }

// export async function getUserRole(email?: string | null): Promise<string | null> {
//   console.log('getUserRole called with email:', email);
//   if (email) {
//     try {
//       const user = await prisma.user.findUnique({
//         where: { email },
//       });
//
//       if (user) {
//         return user.role;
//       }
//     } catch (error) {
//       console.error('Error fetching user role:', error);
//       return null;
//     }
//   }
//   return null;
// }
