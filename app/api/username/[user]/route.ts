export async function GET(request: Request, { params }: any) {
  console.log('2222')
  // we will use params to access the data passed to the dynamic route
  const user = params.user;
  return new Response(`Welcome to my Next application, user: ${user}`);
}
