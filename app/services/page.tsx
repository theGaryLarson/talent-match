import PageBanner from '../ui/components/PageBannner';

//landing page for career services
export default function Page() {
  return (
    <>
    <PageBanner title="Welcome To Career Services"></PageBanner>
    <main className='px-24'>
      <strong className="text-xl">
        Unlock your potential with CFA Career Services
      </strong>
      <p>
        Want to showcase your talents to a select group of employers?  Please
        visit our non-profit, free program (Embedded link to the Career Services
        landing page) to explore our unique process for getting you connected
        with ready-to-hire employers as a job candidate with a showcase of
        TechReady job skills and achievements.  We provide development
        opportunities in technical proficiency and success strategies for
        success in the work environment, along with career navigation skills.  
        This access is limited to very few job candidates as the initial project
        of a Department of Commerce funded Green Jobs Challenge grant and the
        Washington Jobs Initiative. Whether you're just starting out or a
        seasoned professional, our skills classes, workshops, panels, and soft
        skills training offer invaluable insights and tools to enhance your
        skill set and professional development. From honing your communication
        skills to mastering the art of negotiation, our training programs
        empower you to succeed in today's competitive job market. 
      </p>
    </main>
    </>
    
  );
}
