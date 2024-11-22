import { getTrainingProviders, searchEduProviderTrainingProviderPrograms } from '@/app/lib/prisma';

export async function GET(req:Request) {
  const trainingProviders = await getTrainingProviders();
  return Response.json(
    trainingProviders,
    {
      status: 200
    }
  );
}