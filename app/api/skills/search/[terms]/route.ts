import { searchSkills } from '@/app/lib/prisma';

export async function GET(req:Request, { params }: { params: { terms: string } }) {
  const terms = decodeURIComponent(params.terms);
  const searchResults = await searchSkills(terms);

  return Response.json(
    searchResults,
    {
      status: 200
    }
  );
}