import { getIndustrySectors } from '@/app/lib/prisma';

export async function GET(req:Request) {
  const industrySectors = await getIndustrySectors();

  return Response.json(
    industrySectors,
    {
      status: 200
    }
  );
}