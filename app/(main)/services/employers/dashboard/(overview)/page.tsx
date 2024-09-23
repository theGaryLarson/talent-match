
"use client"
import EmployerNameTitleTag from '@/app/ui/components/EmployerNameTitleTag';
import ScoreCard from '@/app/ui/components/ScoreCard';
import { useSession } from "next-auth/react"
import {
  ReadCompanyInfoDTO,
} from "@/data/dtos/EmployerProfileCreationDTOs";
import { useEffect, useState } from 'react';
//employer dashboard
export default function Page() {
  const { data: session } = useSession();
  const [company, setCompany] = useState<ReadCompanyInfoDTO>();

  useEffect(() => {
    async function getData() {
      try {
        console.log(session);
        if (session?.user?.employerId) {
          const response = await fetch(
            `/api/employers/account/company-info/get/${session.user.companyId}`  
          );
         console.log(response)
        const data = await response.json();
          setCompany(data.result);
          console.log("wjcniw;nci;w;c", data.result);
        }
      } catch (e) {
        console.log(e);
      }
    }

    if (session) {
      getData();
    }
  }, [session]);
  
  
  return (
   
   
    <main className="space-y-3 py-8 mx-4 tablet:mx-[50px] tablet:mx-[100px] desktop:mx-[200px] font-['Roboto']">
      <div className="text-black/90 text-2xl font-medium font-['Roboto'] leading-[28.80px]">My Dashboard</div>
      <EmployerNameTitleTag name={session?.user.name} title={"recrutor"} company={company?.companyName??""} pfp={session?.user.image??undefined}/>
      <div className="flex flex-wrap justify-evenly gap-5">
        {<ScoreCard title="Saved Candidates" val={3} />}
        {<ScoreCard title="Job Applications " val={5} />}
      </div>
    </main>
  );
}
