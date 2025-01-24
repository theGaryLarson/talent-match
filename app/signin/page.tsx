/* eslint-disable react/jsx-key */
import { signIn, auth, providerMap } from '@/auth';
import { Button } from '@mui/material';
import Image from 'next/image';

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const callbackUrl = (await searchParams).callbackUrl || '/';

  console.log(providerMap);
  return (
    <main className="mx-auto max-w-screen-sm-tablet">
      {/* <SignupPrompt/> */}
      <section className="flex w-full flex-col gap-8 px-8 pt-16 laptop:pt-24">
        <h1 className="text-[2.125rem]">Choose an account to log in</h1>
        <div className="flex flex-col gap-2 text-center">
          {Object.values(providerMap).map((provider) => (
            <form
              action={async () => {
                'use server';
                try {
                  await signIn(provider.id, { redirectTo: callbackUrl });
                } catch (error) {
                  console.log(error);
                  // Signin can fail for a number of reasons, such as the user
                  // not existing, or the user not having the correct role.
                  // In some cases, you may want to redirect to a custom error
                  // if (error instanceof AuthError) {
                  //   return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                  // }

                  // Otherwise if a redirects happens NextJS can handle it
                  // so you can just re-thrown the error and let NextJS handle it.
                  // Docs:
                  // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                  throw error;
                }
              }}
            >
              <Button
                type="submit"
                fullWidth
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  border: '1px solid rgba(30, 36, 50, 0.23)',
                  textTransform: 'none',
                  padding: '0.5rem',
                  backgroundColor: 'transparent',
                  '&:focus': {
                    backgroundColor: 'rgba(0, 128, 158, 0.23)',
                    boxShadow: 'none',
                  },
                  '&:active': {
                    backgroundColor: 'rgba(0, 128, 158, 0.23)',
                  },
                  '&:hover:enabled': {
                    backgroundColor: 'rgba(0, 128, 158, 0.23)',
                  },
                }}
              >
                <Image
                  src={`/images/signup/oauth_logos/${provider.name}-mark.svg`}
                  width={20}
                  height={20}
                  alt="Green checkmark"
                  style={{
                    marginLeft: '0.5rem',
                    marginRight: '0.5rem',
                    display: 'inline',
                  }}
                />
                <span style={{ color: '#000000' }}>
                  Sign in with {provider.name}
                </span>{' '}
              </Button>
            </form>
          ))}
        </div>
      </section>
    </main>
  );
}
