
/* eslint-disable react/jsx-key */
import { signIn, auth, providerMap } from '@/auth';
import { Button } from 'flowbite-react';
import Image from 'next/image';

export default function SignInPage(){
    console.log(providerMap);
    return(
      <main className="max-w-screen-sm-tablet mx-auto">
        {/* <CFASignupPrompt/> */}
        <section className="px-8 w-full flex flex-col gap-8 laptop:pt-24">
          <h1 className='text-[2.125rem]'>Create an account</h1>
          <div className="flex flex-col gap-2 text-center">
            {Object.values(providerMap).map((provider) => (
              <form
                action={async () => {
                  'use server';
                  try {
                    await signIn(provider.id);
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
                <Button type="submit" className='w-full justify-start bg-transparent border border-[#1E2432]/[.23] enabled:hover:bg-[#00809E]/[.23] focus:bg-[#00809E]/[.23] active:bg-[#00809E]/[.23] focus:ring-0'>
                  <Image src='/cfa_images/signup/oauth_logos/github-mark.svg' width={20} height={20} alt='Green checkmark' className='inline mr-2'/>
                  <span className='text-black'>Sign in with {provider.name}</span>
                </Button>
              </form>
            ))}
          </div>
          
        </section>
      </main>
    );
}
