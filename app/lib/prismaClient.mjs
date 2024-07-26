
// singleton instance of prisma client
import { PrismaClient } from '@prisma/client';

let prisma = null;

const getPrismaClient = () => {
    if (!prisma) {
        try {
            prisma = new PrismaClient();
        } catch (error) {
            console.error("Failed to initialize PrismaClient", error);
            throw error;
        }
    }
    return prisma;
};

export default getPrismaClient;
