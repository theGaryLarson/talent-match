import { searchCompanies } from '@/app/lib/prisma';

export async function GET(req:Request, { params }: { params: { terms: string } }) {
  const terms = decodeURIComponent(params.terms);
  const searchResults = await searchCompanies(terms);

  return Response.json(
    searchResults,
    {
      status: 200
    }
  );
}