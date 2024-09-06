/* eslint-disable react/jsx-key */
import { redirect } from 'next/navigation';
import { signIn, auth, providerMap } from '@/auth';

// export default async function SignInPage() {
//   return (
//     <div className="flex flex-col gap-2">
//       {Object.values(providerMap).map((provider) => (
//         <form
//           action={async () => {
//             'use server';
//             try {
//               await signIn(provider.id);
//             } catch (error) {
//               console.log(error);
//               // Signin can fail for a number of reasons, such as the user
//               // not existing, or the user not having the correct role.
//               // In some cases, you may want to redirect to a custom error
//               // if (error instanceof AuthError) {
//               //   return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
//               // }

//               // Otherwise if a redirects happens NextJS can handle it
//               // so you can just re-thrown the error and let NextJS handle it.
//               // Docs:
//               // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
//               throw error;
//             }
//           }}
//         >
//           <button type="submit">
//             <span>Sign in with {provider.name}</span>
//           </button>
//         </form>
//       ))}
//     </div>
//   );
// }

import DividerWithText from '@/app/ui/components/DividerWithText';
import Link from 'next/link';
import {Button} from '@/app/ui/button';
import CFASignupPrompt from '@/app/ui/components/CFASignupPrompt';
import Image from 'next/image';
import CFAFooter from '@/app/ui/CFAFooter';
import CFASignupHeader from '@/app/ui/CFASignupHeader';

export default function SignInPage(){
    return(
      <>
      <CFASignupHeader className='laptop:hidden'/>

      <main className="max-w-screen-sm-tablet mx-auto laptop:flex laptop:flex-row laptop:gap-8 laptop:max-w-full">
        <CFASignupPrompt/>
        <section className="px-8 w-full laptop:pt-24">
          <div className="flex flex-col gap-2">
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
                <button type="submit">
                  <span>Sign in with {provider.name}</span>
                </button>
              </form>
            ))}
          </div>
          <DividerWithText className='py-8'>or</DividerWithText>
          {/* <div className='text-center flex flex-col gap-2'>
            <p>Already have a CFA account?</p>
            <Link className='text-blue-500' href="/login">Login</Link>
          </div> */}
          
        </section>
        <Image src='/cfa_images/signup/jobseeker-vector.png' width={1092} height={1040} className='pt-16 h-1/2 hidden sm-tablet:block laptop:hidden' alt='Art of jobseeker'/>
      </main>
      
      <footer className='absolute w-full bottom-0 sm-tablet:hidden'><CFAFooter></CFAFooter></footer>
      </>
    );
}
