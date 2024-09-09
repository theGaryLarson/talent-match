'use client';

import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import Link from 'next/link';
import DividerWithText from '@/app/ui/components/DividerWithText';
import Image from 'next/image'
import CFAFooter from '@/app/ui/CFAFooter';
import CFASignupHeader from '@/app/ui/CFASignupHeader';
import {useSession, getSession } from 'next-auth/react';
import { useUpdateSession } from '@/app/lib/auth/useUpdateSession';
import { useRouter } from 'next/navigation';
import { Role } from "@/data/dtos/UserInfoDTO";

// interface Data {
//   userId: string;
//   role: string;
// }

export default function SignupPage() {
  const [choice, setChoice] = useState("");
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const checkIcon = <Image src='/cfa_images/signup/check-mark.png' width={22} height={22} alt='Green checkmark' className='inline mr-2'/>
  const updateSessionProperties = useUpdateSession();
  
  let handleSubmit = async () =>{
    let newRole = choice === "employer" ? Role.EMPLOYER : Role.JOBSEEKER;
    console.log("id",await getSession());
    if (session){
      let response = await fetch('/api/users/role/update',{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: session.user.id,
          role: newRole,
        })  
      });
      // console.log("response:", response);
      if(response.ok){
        let rolesArray = [newRole];
        await updateSessionProperties({
          roles: rolesArray,
        });
        console.log('Session after update:', await getSession());
        router.push(`/signup/jobseeker`);
      }
    }
  }

  return (
    <>
    <CFASignupHeader/>
    <main className='flex flex-col py-8 gap-9'>
      <h1 className='text-4xl text-center'>Create account</h1>
      <fieldset className='flex flex-col gap-8 justify-center items-center sm-tablet:flex-row'>
        <legend className='text-center pb-4'>Select your role first</legend>
        <div>
          <input
            type="radio"
            name="account-role"
            id='account-employer'
            onClick={()=> setChoice("employer")}
            className='hidden peer'
          />
          <label htmlFor='account-employer' className="relative block cursor-pointer border-2 rounded-md w-[200px] h-[180px] bg-white hover:bg-gray-100 peer-checked:border-primary-500 peer-checked:bg-primary-25">
            <Image src='/cfa_images/signup/icon-employer.png' width={80} height={80} alt='Icon of a briefcase to represent employers.' className='mx-auto py-6'/>
            <p className='text-center'>{choice === 'employer' && checkIcon}An employer</p>
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="account-role"
            id='account-jobseeker'
            onClick={()=> setChoice("jobseeker")}
            className='hidden peer'
          />
          <label htmlFor='account-jobseeker' className="relative block cursor-pointer border-2 rounded-md w-[200px] h-[180px] bg-white hover:bg-gray-100 peer-checked:border-primary-500 peer-checked:bg-primary-25">
            <Image src='/cfa_images/signup/icon-jobseeker.png' width={80} height={80} alt='Icon of a magnifying class to represent jobseekers.' className='mx-auto py-6'/>
            <p className='text-center'>{choice === 'jobseeker' && checkIcon}A job candidate</p>
          </label>
        </div>
      </fieldset>
      <Button disabled={choice === ""} onClick={handleSubmit} className='mx-auto w-fit mt-4 rounded-3xl'>Continue</Button>
      
      <div className='flex flex-col gap-4 mb-4 text-center mx-auto'>
        <DividerWithText>or</DividerWithText>
        <p>Already have a CFA account? <Link className='text-blue-500' href="/login">Login</Link></p>
      </div>
      
    </main>
    <footer className='sm-tablet:absolute sm-tablet:bottom-0 sm-tablet:w-full'><CFAFooter></CFAFooter></footer>
    </>
  );
};
