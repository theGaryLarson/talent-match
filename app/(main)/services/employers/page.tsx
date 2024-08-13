//employer landing page
import BrowseByCategory from '@/app/ui/components/BrowseByCategory';
import CategoryCard from '@/app/ui/components/CategoryCard';
import LargeRoundedButtonCard from '@/app/ui/components/LargeRoundedButtonCard';
import PageBanner from '@/app/ui/components/PageBannner';
import PhotoCardWithTitle from '@/app/ui/components/PhotoCardWithTitle';
import RoundedButton from '@/app/ui/components/RoundedButton';

import SimpleCard from '@/app/ui/components/SimpleCard';
import SimpleCardWithPhoto from '@/app/ui/components/SimpleCarWithPhoto';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <PageBanner
        title={"Welcome to CFA's Tech Talent Showcase"}
        bg="bg-employer-hero-1"
      />
      <main className="mx-4 space-y-3 py-8 font-['Roboto'] md:mx-[150px] lg:mx-[200px]">
        <h1 className="text-3xl font-bold">
        Unique Access to Tech Talent
        </h1>
        <h2 className="text-2xl text-primary-600">
        Experienced workers, easily assimilated into your culture
        </h2>


      <p>
      Take advantage of a <span className='font-bold'>$5M Department of Commerce grant</span> that enhances jobseeker abilities to add productivity and innovation to your workforce.
      </p>
      <p>
      Experienced jobseekers with a <span className='font-bold'>BS or BAS degree are completing our months-long professional development process,</span> providing them with the durable communication and teamwork skills our industry partners have specified. 
      </p>
      <p>
      <span className='font-bold'>Our Tech Finder Portal</span> provides quick and easy ways to find and screen potential hires. Once in the Portal, a <span className='font-bold'>Showcase offers insights into job candidates that are not available through traditional job boards.</span>
      </p>


        <RoundedButton
          content={'Register Here'}
          link={'/signup'}
          invertColor={true}
        />

        {/* <h1 className="text-2xl font-bold">Tech Ready Candidates</h1>
        <h2 className="text-xl text-primary-600">
        What does a Tech Ready badge represent?
        </h2>
        <p>
        TechReady Jobseekers have completed their college degrees or a series of training courses with CFA or one of our Washington Tech Workforce coalition training partners, qualifying them for a TechReady badge.  A candidate featuring a Tech Ready badge will:
        </p>
        <ul className="list-square">
          <li className="list-inside pl-8">
          Have relevant work experience related to job postings for their desired roles.
          </li>
          <li className="list-inside pl-8">
          Have translated their work experience into valuable knowledge and skills for target jobs and can apply their skills in a professional setting.
          </li>
          <li className="list-inside pl-8">
          Demonstrated essential soft skills like effective communication, teamwork, problem-solving, adaptability, and time management. 
          </li>
          <li className="list-inside pl-8">
          Possess an updated, relevant resume with pertinent letters of reference. 
          </li>
          <li className="list-inside pl-8">
          Created a personal brand video showcasing who they are, their superpower, and their value proposition.  
          </li>
        </ul>
        <LargeRoundedButtonCard
          title={'Ready to Hire'}
          blurb={
            "You are invited to enjoy elite access to TechReady IT talent, a pipeline of college graduates and both new and veteran workforce candidates with the skills and experience to quickly become productive in your organization."
          }
          buttonContent={'Search For talent'}
        /> */}

        <h1 className="text-2xl font-bold">Hire the Right Candidate</h1>
        <p>
        Whether you are looking for an intern or an experienced software developer, you can find talent to meet your hiring needs here. 
        </p>
        <p className='font-bold'>
        Click on the box that best describes the position you are trying to fill to identify the most qualified candidates.
        </p>
        <h1 className="text-2xl font-bold">Browse by Jobseeker Skills</h1>
        <div className='flex flex-wrap gap-4'>
        <CategoryCard
            imgSrc={'/cfa_images/stock/SoftwareDevLink.png'}
            title={'Software Devolopment'}
            text={'Find job seekers with training and expertise in Software Devolopment'} href={'/services/employers/dashboard/listview?search=Software+Devolopment'}          />
          <CategoryCard
            imgSrc={'/cfa_images/stock/cyberLink.png'}
            title={'Cyber Security'}
            text={'Find job seekers with training and expertise in Cyber Security.'} href={'/services/employers/dashboard/listview?search=Cyber+Security'}          />
          <CategoryCard
            imgSrc={'/cfa_images/stock/dataLink.png'}
            title={'Data Analytics'}
            text={'Find job seekers with training and expertise in Data Analytics'} href={'/services/employers/dashboard/listview?search=Data+Analytics'}          />
        </div>
        <h4 className='text-lg font-bold'>Need more information? <Link href={'/services/employers/faq'}>Click here.</Link></h4>
        <h4 className='text-lg text-primary-600'>First candidates will be available for interview in September. This offer is limited to ~ 100 employers as we develop an initial cohort of job candidates.</h4>
        
        <div className='flex flex-wrap'>
          <div className='w-6/12 space-y-8 grow'>
            <h3 className='text-xl font-bold'>About the Washington Tech Workforce Coalition:</h3>
            <p className='font-bold'>The Coalition is comprised of Community, Education, Government, Industry, and Workforce Partners with the common goal to cultivate a diverse, highly skilled technology workforce throughout Washington State.</p>
            <p>The Coalition provides strategic guidance and support for the tech sector and tech roles, clarifies industry demand, participates in the development and implementation of programs to holistically answer demand and realize job placements, and ensure opportunity and priority for underserved and underrepresented populations.</p>
          </div>
          <Image src={'/cfa_images/TWC_75x50_2024.svg'} alt={'TWC logo'} width={400} height={266}/>
        </div>
        <div className='flex flex-wrap-reverse gap-5'>
          <Image src={'/cfa_images/stock/black-office-worker-checkered-shirt-embracing-blonde-secretary-woman-while-she-making-selfie-young-managers-international-company-having-fun-meeting 1.jpg'} alt={'Stock Image of office workers'} width={400} height={266}/>
          <div className='w-6/12 space-y-8 grow'>
            <h3 className='text-xl font-bold'>About Computing for All:</h3>
            <p className='font-bold'>Computing for All is a nonprofit that has trained diverse, low-income high school and college students for more than five years. </p>
            <p>In our role as the <span className='font-bold'>Washington State IT/Cybersecurity Sector Intermediary,</span> we manage the <span className='font-bold'>Tech Workforce Coalition</span>, building synergies among community, education, and business partners to align training and job opportunities while uniting and lifting our local economies. </p>
          </div>
          
        </div>
        
        
        
        
        
        
        {/* <h1 className="text-2xl font-bold">Employers: Get Involved by volunteering!</h1>
        <h2 className="text-lg">There are many ways to get involved:</h2>
        <div className="flex flex-wrap gap-4">
          <SimpleCard
            title={'Host a Job Fair'}
            content={
              'Join Computing for All by hosting a job fair. This is a great opportunity to meet and engage with potential candidates before the interview process begins.'
            }
            href={'/#'}
          />
          <SimpleCard
            title={'Run a Job Readiness Workshop'}
            content={
              'Lead a workshop focused on general career preparation or specific job roles. Conduct mock interviews to get to know our candidates better.'
            }
            href={'/#'}
          />
          <SimpleCard
            title={'Participate in a Career Awareness Panel'}
            content={'Share insights about in-demand job roles at your company by participating in one of our career awareness panels.'}
            href={'/#'}
          />
          <SimpleCard
            title={'Virtual Speakers'}
            content={
              'Volunteer as a virtual classroom speaker to share your career journey and other topics of interest with job seekers. Speak at our Web Development Pre-Apprenticeship or during one of our training events.'
            }
            href={'/#'}
          />
          <SimpleCard
            title={'Host an internship or Apprenticeship'}
            content={
              'If your company offers internships or apprenticeships, please post them on our Job Board! If you need assistance developing an internship or apprenticeship program, we can guide you to resources to help you get started. '
            }
            href={'/#'}
          />
          <SimpleCardWithPhoto title={'Volunteer At CFA'} content={'Email us at: Volunteer@ComputingforAll.org'} href={''}></SimpleCardWithPhoto>
        </div> */}
        {/* <BrowseByCategory /> */}
      </main>
    </>
  );
}



