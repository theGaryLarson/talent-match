
// singleton instance of prisma client
import {PrismaClient} from '@prisma/client';

let prisma = null;

const getPrismaClient = () => {
    if (!prisma) {
        prisma = new PrismaClient();
    }
    return prisma;
};

export default getPrismaClient;
