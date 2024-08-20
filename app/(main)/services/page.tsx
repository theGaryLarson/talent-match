import ArticleStub from '@/app/ui/components/ArticleStub';
import PageBanner from '@/app/ui/components/PageBannner';
import RoundedButtonCard from '@/app/ui/components/RoundedButtonCard';
import VideoBlock from '@/app/ui/components/VideoBlock';

//landing page for career services
export default function Page() {
  return (
    <>
      <PageBanner
        title="Tech Ready Talent Showcase" bg={'bg-services-hero'}></PageBanner>
      <main className="space-y-3 py-8 mx-4 tablet:mx-[150px] laptop:mx-[200px] font-['Roboto']">
        <h1 className="text-2xl">
          Unlock your potential with Tech Talent Showcase
        </h1>
        <h2 className='text-xl text-primary-600'>
        Want to showcase your talents to a select group of employers?
        </h2>
        <p>
        Please visit our non-profit, free program (Embedded link to the Career Services landing page) to explore our 
        unique process for getting you connected with ready-to-hire employers as a job candidate with a showcase of 
        TechReady job skills and achievements. We provide development opportunities in technical proficiency and success 
        strategies for success in the work environment, along with career navigation skills. This access is limited to 
        very few job candidates as the initial project of a Department of Commerce funded Green Jobs Challenge grant 
        and the Washington Jobs Initiative.
        </p>
        <p>
          {`Whether you're just starting out or a seasoned professional, our skills 
            classes, workshops, panels, and soft skills training offer invaluable insights
            and tools to enhance your skill set and professional development. From honing
            your communication skills to mastering the art of
            negotiation, our training programs empower you to succeed in today's competitive job market.`}
        </p>
        <div className="flex flex-wrap justify-evenly gap-10">
          <RoundedButtonCard
            title={'Job Seekers'}
            desc={
              'Explore our unique process for getting you connected with ready-to-hire employers as a job candidate with a showcase of TechReady job skills and achievements. We provide development opportunities in technical proficiency and success strategies for success in the work environment, along with career navigation skills. '
            }
            buttonText={'Register'}
            link={'/signup'}
            callToAction={
              'Register for Information session, build your profile'
            }
          />
          <RoundedButtonCard
            title={'Employers'}
            desc={
              "Our Job Board connects you with a diverse range of opportunities in the tech industry. Whether you're seeking internships, apprenticeships, or full-time positions, our platform is your gateway to exciting career prospects. "
            }
            buttonText={'Learn More'}
            link={'/services/employers'}
            callToAction={'View candidates, create an account '}
          />
        </div>
      </main>
    </>
  );
}
