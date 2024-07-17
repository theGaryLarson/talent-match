export async function GET(req:Request) {
  const res = Response;

  return res.json([
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