//employer landing page
import BrowseByCategory from '@/app/ui/components/BrowseByCategory';
import CategoryCard from '@/app/ui/components/CategoryCard';
import LargeRoundedButtonCard from '@/app/ui/components/LargeRoundedButtonCard';
import PageBanner from '@/app/ui/components/PageBannner';
import PhotoCardWithTitle from '@/app/ui/components/PhotoCardWithTitle';
import RoundedButton from '@/app/ui/components/RoundedButton';

import SimpleCard from '@/app/ui/components/SimpleCard';
import SimpleCardWithPhoto from '@/app/ui/components/SimpleCarWithPhoto';

export default function Page() {
  return (
    <>
      <PageBanner
        title={"Welcome to CFA's Tech Talent Showcase"}
        bg="bg-employer-hero-1"
      />
      <main className="mx-4 space-y-3 py-8 font-['Roboto'] md:mx-[150px] lg:mx-[200px]">
        <h1 className="text-3xl font-bold">
        Employers: Discover Diverse Talent • Post Jobs • Volunteer
        </h1>
        <h2 className="text-lg text-primary-600">
        CFA’s Tech Talent Showcase (platform or interface?) will help you make the right hires.
        </h2>
        <p>
        We are inviting employers to take part in this initial project of a Department of Commerce funded Green Jobs Challenge grant and the Washington Jobs initiative. Expand and diversify your talent pipeline with fresh talent that will contribute expertise, diverse voices, and innovative ideas.
        </p>
        <p className="text-2xl font-bold">Why Join</p>
        <p>
        Gain exclusive access to expand and diversify your talent pipeline with skilled candidates who will contribute to your long-term hiring strategy and help meet your company’s unique, evolving needs.
        </p>
        <p>
        Our Showcase features jobseekers of all ages, work experience and backgrounds who have participated in programs from one of our Washington Tech Workforce coalition colleges and tech training partners. Jobseekers not only have up to date tech training, but the durable workplace communication and teamwork skills you most value.
        </p>
        <p>
        The Showcase provides you with a quick and easy way to screen potential hires. Job candidates who have completed our screening and training program will display a TechReady Badge along with a two-minute personal brand video where you can learn more about them.
        </p>

        <RoundedButton
          content={'Join Here'}
          link={'/signup'}
          invertColor={true}
        />

        <h1 className="text-2xl font-bold">Tech Ready Candidates</h1>
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
        />

        <h1 className="text-2xl font-bold">Hire the Right Candidate</h1>
        <p>
        Whether you are looking for an intern or an experienced software developer, you can find talent to meet your hiring needs <i>here</i>. Click on the box that best describes the position you are trying to fill to identify the most qualified candidates. 
        </p>
        <h1 className="text-2xl font-bold">Browse by Jobseeker Skills</h1>
        <div className='flex flex-wrap gap-6'>
          
          
          
          
          
          
          
          
          <CategoryCard
            imgSrc={
              '/cfa_images/stock/linkedin-sales-solutions-EI50ZDA-l8Y-unsplash.jpg'
            }
            title={'Cloud Computing'}
            text={'Find job seekers with training and expertise in Cloud Computing.'}
          />
          <CategoryCard
            imgSrc={
              '/cfa_images/stock/linkedin-sales-solutions-EI50ZDA-l8Y-unsplash.jpg'
            }
            title={'Cyber Security'}
            text={'Find job seekers with training and expertise in Cyber Security.'}
          />
          <CategoryCard
            imgSrc={
              '/cfa_images/stock/linkedin-sales-solutions-EI50ZDA-l8Y-unsplash.jpg'
            }
            title={'Data Analyst'}
            text={'Find job seekers with training and expertise in Data Analytics'}
          />
          <CategoryCard
            imgSrc={
              '/cfa_images/stock/linkedin-sales-solutions-EI50ZDA-l8Y-unsplash.jpg'
            }
            title={'IT Support'}
            text={
              'Find job seekers with training and expertise in IT Support'
            }
          />
          <CategoryCard
            imgSrc={
              '/cfa_images/stock/linkedin-sales-solutions-EI50ZDA-l8Y-unsplash.jpg'
            }
            title={'Project Management'}
            text={'Find job seekers with training and expertise in Project Management'}
          />
          <CategoryCard
            imgSrc={
              '/cfa_images/stock/linkedin-sales-solutions-EI50ZDA-l8Y-unsplash.jpg'
            }
            title={'Software Devolopment'}
            text={'Find job seekers with training and expertise in Software Devolopment'}
          />
          





        </div>
        
        <h1 className="text-2xl font-bold">Employers: Get Involved by volunteering!</h1>
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
        </div>
        {/* <BrowseByCategory /> */}
      </main>
    </>
  );
}



