//employer landing page
import BrowseByCategory from '@/app/ui/components/BrowseByCategory';
import CategoryCard from '@/app/ui/components/CategoryCard';
import LargeRoundedButtonCard from '@/app/ui/components/LargeRoundedButtonCard';
import PageBanner from '@/app/ui/components/PageBannner';
import PhotoCardWithTitle from '@/app/ui/components/PhotoCardWithTitle';
import RoundedButton from '@/app/ui/components/RoundedButton';

import SimpleCard from '@/app/ui/components/SimpleCard';

export default function Page() {
  return (
    <>
      <PageBanner
        title={"Welcome to CFA's Tech Talent Showcase"}
        bg="bg-employer-hero-1"
      />
      <main className="mx-4 space-y-3 py-8 font-['Roboto'] md:mx-[150px] lg:mx-[200px]">
        <h1 className="text-2xl font-bold">
          Discover diverse talent, post jobs, and volunteer
        </h1>

        <h1 className="text-xl">
          Employers: Find and Attract Job Ready Candidates
        </h1>
        <h2 className="text-lg text-primary-600">
          CFA’s Tech Talent Showcase interface will help you make the right
          hires.
        </h2>
        <p>
          We are inviting employers to take part in this initial project of a
          Department of Commerce funded Green Jobs Challenge grant and the
          Washington Jobs initiative.
        </p>

        <p className="text-xl font-bold">Why Join</p>
        <p>
          Expand and diversify your talent pipeline with the best of both new
          and existing talent who will bring diverse voices and innovative ideas
          to your company.
        </p>
        <p>
          Join here to gain exclusive access to expand and diversify your talent
          pipeline with the best of both new and existing talent. Our Tech Ready
          Talent Showcase offers diverse, skilled talent will contribute to your
          company’s long-term hiring strategy and help you meet your unique,
          evolving needs.
        </p>
        <p>
          Our Showcase includes jobseekers of all ages and backgrounds who have
          participated in programs from one of our Washington Tech Workforce
          coalition colleges and tech training partners. Jobseekers not only
          have up to date tech training, but the durable workplace communication
          and teamwork skills you most value.
        </p>
        <p>
          The Showcase provides you with a quick and easy way to screen
          potential hires. Jobseekers who have completed our screening and
          training program will display a TechReady Badge along with a
          two-minute personal brand video where you can learn more about them.
        </p>

        <RoundedButton
          content={'Join Here'}
          link={'/signup'}
          invertColor={true}
        />

        <h1 className="text-2xl">Tech Ready Candidates</h1>
        <h2 className="text-xl text-primary-600">
          What is a Tech Ready badge?
        </h2>
        <p>
          TechReady Jobseekers have completed a series of training courses with
          CFA or our training partners, qualifying them for a TechReady badge.
          These candidates:
        </p>

        <ul className="list-square">
          <li className="list-inside pl-8">
            Have relevant work experience directly related to job postings for
            their desired roles.
          </li>
          <li className="list-inside pl-8">
            Possess an updated, relevant resume with pertinent letters of
            reference.
          </li>
          <li className="list-inside pl-8">
            Have translated their work experience into valuable knowledge and
            skills for target jobs.
          </li>
          <li className="list-inside pl-8">
            Created a personal brand video showcasing who they are, their
            superpower, and their value proposition.
          </li>
          <li className="list-inside pl-8">
            Demonstrated essential soft skills like effective communication,
            teamwork, problem-solving, adaptability, and time management.
          </li>
        </ul>
        <LargeRoundedButtonCard
          title={'Ready to Hire'}
          blurb={
            "You're invited to enjoy elite access to TechReady talent, a pipeline of IT/Cybersecurity 2 and 4-year graduates with the skills and experience to quickly become productive in your organization."
          }
          buttonContent={'Search For talent'}
        />

        <h1 className="text-2xl">Hire the right candidate</h1>
        <p>
          Whether you are looking for an intern or an experienced software
          developer, you can find talent to meet your hiring needs here. Click
          on the box that best describes the position you are trying to fill to
          identify the most qualified candidates.
        </p>

        <div className='flex flex-wrap gap-5'>
          <CategoryCard
            imgSrc={
              '/cfa_images/stock/linkedin-sales-solutions-EI50ZDA-l8Y-unsplash.jpg'
            }
            title={'Software Engineering'}
            text={'Develops and maintains software applications and systems.'}
          />
          <CategoryCard
            imgSrc={
              '/cfa_images/stock/linkedin-sales-solutions-EI50ZDA-l8Y-unsplash.jpg'
            }
            title={'UX Designer'}
            text={
              'Designs user-friendly interfaces and enhances user experience.'
            }
          />
          <CategoryCard
            imgSrc={
              '/cfa_images/stock/linkedin-sales-solutions-EI50ZDA-l8Y-unsplash.jpg'
            }
            title={'IT Support'}
            text={
              'Provides technical assistance and support for computer systems.'
            }
          />
          <CategoryCard
            imgSrc={
              '/cfa_images/stock/linkedin-sales-solutions-EI50ZDA-l8Y-unsplash.jpg'
            }
            title={'Cyber Security'}
            text={
              'Protects systems and networks from cyber threats and attacks.'
            }
          />
          <CategoryCard
            imgSrc={
              '/cfa_images/stock/linkedin-sales-solutions-EI50ZDA-l8Y-unsplash.jpg'
            }
            title={'Machine Learning'}
            text={
              'Creates algorithms that enable computers to learn from data.'
            }
          />
          <CategoryCard
            imgSrc={
              '/cfa_images/stock/linkedin-sales-solutions-EI50ZDA-l8Y-unsplash.jpg'
            }
            title={'Project Management'}
            text={'Plans, executes, and oversees projects to achieve goals.'}
          />
        </div>
        
        <h1 className="text-xl">Employers: Get Involved by volunteering!</h1>
        <h2 className="text-lg">There are many ways to get involved:</h2>
        <div className="flex flex-wrap gap-4">
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
          <SimpleCard
            title={'Participate in a Career Awareness Panel'}
            content={'describing in-demand job roles at your company'}
            href={'/#'}
          />
          <SimpleCard
            title={'Virtual Speakers'}
            content={
              'Volunteer as a virtual classroom speaker describing your career journey and other topics of interest to job seekers.  Speak aro our Web Development Pre-Apprenticeship or at one of our training events'
            }
            href={'/#'}
          />
          <SimpleCard
            title={'Host an internship or Apprenticeship'}
            content={
              'If your company already hosts an internship or Apprenticeship, please post it on our Job Board!  If you would like assistance developing an internship or Apprenticeship program at your company please let us know here and we will reach out to you with resources to help  you get started.'
            }
            href={'/#'}
          />
        </div>
        <BrowseByCategory />
      </main>
    </>
  );
}
