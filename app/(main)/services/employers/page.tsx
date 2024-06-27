//employer landing page
import BlockQuote from '@/app/ui/components/BlockQuote';
import BrowseByCategory from '@/app/ui/components/BrowseByCategory';
import GreyBackgroundBulletPointListBlock from '@/app/ui/components/GreyBackgroundBulletPointListBlock';
import LargeRoundedButtonCard from '@/app/ui/components/LargeRoundedButtonCard';
import PageBanner from '@/app/ui/components/PageBannner';
import PhotoCardWithTitle from '@/app/ui/components/PhotoCardWithTitle';
import RoundedButton from '@/app/ui/components/RoundedButton';
import RoundedButtonCard from '@/app/ui/components/RoundedButtonCard';
import SimpleCard from '@/app/ui/components/SimpleCard';
import Tabs from '@/app/ui/components/Tabs';
import VideoBlock from '@/app/ui/components/VideoBlock';

export default function Page() {
  const tabs = [
    {
      label: 'Why Join',
      content: <VideoBlock />,
    },
    {
      label: 'Growth',
      content: (
        <div className="flex space-x-20">
          <GreyBackgroundBulletPointListBlock />
          <GreyBackgroundBulletPointListBlock />
        </div>
      ),
    },
    {
      label: 'Candidates',
      content: <div>Content of Tab 3</div>,
    },
    {
      label: 'Mentor',
      content: <div>Content of Tab 4</div>,
    },
    {
      label: 'Recruitment',
      content: <div>Content of Tab 5</div>,
    },
    {
      label: 'Visibility',
      content: <div>Content of Tab 6</div>,
    },
  ];

  return (
    <>
      <PageBanner title={'Employers: Discover Talent'} bg="bg-employer-hero-1" />
      <main className="mx-4 space-y-3 py-8 font-['Roboto'] md:mx-[150px] lg:mx-[200px]">
      <h1 className="text-2xl font-bold">Welcome to CFA's Tech Talent Showcase where employers can discover talent, post jobs, and volunteer</h1>

        <h1 className="text-2xl">Discover Talent</h1>
        <p>
        You'll find a rich source of diverse, talented  job candidates who have achieved TechReady status with a showcase of validated achievements in the areas of technical proficiency and professionalism.  You can also post your jobs so they can find you.  This access is limited to very few employers as the initial project of a Department of Commerce funded Green Jobs Challenge grant and the Washington Jobs initiative.
        </p>
        <p>
        Join here to gain exclusive access to expand and diversify your talent pipeline with the best of both new and existing talent.  Our Tech Ready Talent Showcase offers skilled talent and fresh voices with innovative ideas to your company.  Our Showcase features candidates who not only have up to date tech training, but the durable workplace communication and teamwork skills you most value.
        The Showcase provides you with a quick and easy way to screen potential hires; jobseeker portfolios and resumes are easily accessed, and those who have completed our program will display a TechReady Badge along with a two-minute personal brand video where you can learn more about them. 
        </p>
        <RoundedButton content={'Join Here'} link={'/signup'} invertColor={true}/>
        

        <h1 className="text-2xl">
        Tech Ready Candidates
        </h1>
        <p>All of the jobseekers in our Tech Talent Showcase will be at different stages of their progress towards a Tech Ready Badge.  Those who have competed in the program will have a Tech Ready badge on their Showcase page.</p>
        <h2 className='text-xl text-primary-600'>
        What is a CFA Tech Ready Candidate?
        </h2>
        <ul className='list-square'>
          <li className='list-inside pl-8'>Clearly articulates achievements in prior job assignments.  Describes problems addressed and relevant solutions. </li>
          <li className='list-inside pl-8'>Develops a profile of work experience that relates directly to job postings for their desired role;  shows how their experience qualifies them for the role they are seeking.</li>
          <li className='list-inside pl-8'>Can articulate why they meet job posting requirements</li>
          <li className='list-inside pl-8'>Creates a value proposition that they can communicate to prospective employers.  Translates their profile of prior work experience into knowledge and skills that will be valuable in meeting requirements of the target job.  Conveys work ethic, problem-solving skills, and consultative abilities that exceed the job requirements.  Facilitates letters of reference that align with this value proposition. </li>
          <li className='list-inside pl-8'>Has an updated, relevant resume.</li>
          <li className='list-inside pl-8'>Creates a video that communicates who they are, what their super power is, and how their knowledge, skills, and prior achievements provide the key elements of their value proposition to prospective employers</li>
        </ul>
        <LargeRoundedButtonCard
          title={'Ready to Hire'}
          blurb={
           "You're invited to enjoy elite access to TechReady talent, a pipeline of IT/Cybersecurity 4-year graduates with the skills and experience to quickly become productive in your organization." 
          }
          buttonContent={'Search For talent'}
        />

        
        <h1 className="text-2xl">Hire the right candidate</h1>
        <p>
        Whether you are looking for an intern or an experienced software developer, you can find talent to meet your hiring needs here.  Click on the box that best describes the position you are trying to fill to identify the most qualified candidates.
        </p>
        <div className="flex flex-wrap justify-evenly gap-4">
          <PhotoCardWithTitle
            title={'Job Candidates'}
            article={
              "Discover top talent ready to join your team and hit the ground running. Our curated pool of job candidates brings a wealth of experience and fresh perspectives to drive your company's success."
            }
            imgSrc={'/cfa_images/stock/annie-spratt-vGgn0xLdy8s-unsplash 1.png'}
          />
          <PhotoCardWithTitle
            title={'Interns'}
            article={
              "Nurture the next generation of innovators. They have an educational foundation and are ready for real work. Invest in the future with these bright minds eager to grow."
            }
            imgSrc={
              '/cfa_images/stock/christina-wocintechchat-com-bPVM4nOy0Rg-unsplash 1.png'
            }
          />
          <PhotoCardWithTitle
            title={'Apprentice'}
            article={
              'Here is a b unch of random information that will be replaced yada yada radda radda'
            }
            imgSrc={'/cfa_images/stock/headway-5QgIuuBxKwM-unsplash 1.png'}
          />
        </div>
        
        {/* <BlockQuote
          text={
            'Partnering with Computing for All brought us an outstanding intern, Maria, whose fresh ideas and dedication have been invaluable to our team.'
          }
          author={'James Lee'}
          imgSrc={'/cfa_images/stock/Mask group.png'}
        /> */}
        <BrowseByCategory/>
        <h1 className="text-2xl">
          Still not sure here, here are other Ways to Meet Our Candidates
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat.
        </p>
        <div className="flex flex-wrap justify-evenly gap-4">
          <SimpleCard
            title={'Host a Job Fair'}
            content={
              'Host a job fair with Computing for All. Get to know candidates ahead of the interview process.'
            }
            href={'/#'}
          />
          <SimpleCard
            title={'Run a Job Readiness Workshop'}
            content={
              'Conduct a workshop on general career prep or get to know students through mock interviews.'
            }
            href={'/#'}
          />
        </div>
      </main>
    </>
  );
}
