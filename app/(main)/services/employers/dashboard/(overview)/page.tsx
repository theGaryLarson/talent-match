import ArticleStub from '@/app/ui/components/ArticleStub';
import BrowseByCategory from '@/app/ui/components/BrowseByCategory';
import EmployerNameTitleTag from '@/app/ui/components/EmployerNameTitleTag';
import FeaturedCandidates from '@/app/ui/components/FeaturedCandidates';
import JobSeekerCardView from '@/app/ui/components/JobSeekerCardView';
import LargeRoundedButtonCard from '@/app/ui/components/LargeRoundedButtonCard';
import ScoreCard from '@/app/ui/components/ScoreCard';
import Teaser from '@/app/ui/components/Teaser';
//employer dashboard
export default async function Page() {
  return (
    <main className="space-y-3 py-8 mx-4 md:mx-[150px] lg:mx-[200px] font-['Roboto']">
      <EmployerNameTitleTag name={'Damien Cruz'} title={'Programming Instructor'} company={'Computing For All'}/>
      <div className="flex flex-wrap justify-between gap-5">
        {<ScoreCard title="Saved Candidates" val={3} />} 
        {<ScoreCard title="Job Applications " val={5} />}
        {<ScoreCard title="Direct Messages" val={1} />}
      </div>
     
      <div className='flex justify-center'>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        <Teaser
          isLarge={true}
          title={'Become a Mentor'}
          text={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor derp labore et dolore magna fugito aliqua. ed do eiusmod tempor incididunt '
          }
        />
        <Teaser
          isLarge={true}
          title={'Create a Job Posting'}
          text={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elitr derp sigma you lost the game incididunt ut labore et dolore magna fugito aliqua. ed do eiusmod tempor incididunt '
          }
        />
        <Teaser
          isLarge={true}
          title={'Create an Assessment'}
          text={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor derp sigma you lost the game incididunt ut fugito aliqua. ed do eiusmod tempor incididunt '
          }
        />
      </div>
      </div>
      <LargeRoundedButtonCard
        title={'Ready to Hire'}
        blurb={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
        }
        buttonContent={'Search For talent'}
      />
      <FeaturedCandidates/>
      <BrowseByCategory/>
       {/* <ArticleStub
        isPhotoFirst={true}
        imagesrc={
          '/cfa_images/stock/people-using-digital-device-while-meeting 2.png'
        }
      /> */}
    </main>
  );
}
