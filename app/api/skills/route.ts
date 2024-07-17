export async function GET(req:Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');
  console.log(q);

  return Response.json([
      'C and C++',
      'C#',
      'HTML',
      'CSS',
      'Java',
      'JavaScript',
      'Python',
      'R'
    ], {
    status: 200
  });
}