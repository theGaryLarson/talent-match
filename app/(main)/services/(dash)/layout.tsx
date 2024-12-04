import Link from 'next/link';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { auth } from '@/auth';
import { BookmarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
export default async function layout({ children }: { children: React.ReactNode }) {
  let session = await auth()
  console.log(session)
  if(session?.user.employerId){
  return (
    <div className="flex">
      <div className="flex min-w-[230px] flex-col text-[#047f9c]">
        <Link
          href="/services/employers/dashboard"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <PersonOutlineOutlinedIcon />
          Home
        </Link>
        <Link
          href="/services/talent-search"
          className="inline-flex items-center justify-start gap-[5px]  p-2 hover:bg-gray-200"
        >
          <SearchOutlinedIcon />
          Candidate Search
        </Link>

        <Link
          href="/services/employers/dashboard/myjobposts"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <FolderOutlinedIcon />
          My Job Posts
        </Link>
        <Link
          href="/services/employers/dashboard/savedcandidates"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <BookmarkIcon width={24}/>
          Saved Candidates
        </Link>
        {/* <Link
          href="/services/employers/dashboard"
          className="inline-flex items-center justify-start gap-[5px]  p-2 hover:bg-gray-200 REPLACE-BEFORE-RELEASE"
        >
          <EmailOutlinedIcon />
          Inbox
        </Link> */}
        {/*<Link*/}
        {/*  href="/services/employers/dashboard/postjob"*/}
        {/*  className="inline-flex items-center justify-start gap-[5px]  p-2 hover:bg-gray-200"*/}
        {/*>*/}
        {/*  <PencilSquareIcon width={24}/>*/}
        {/*  Post a job*/}
        {/*</Link>*/}
      </div>
      {children}
    </div>
  );}else{
    return <>{children}</>
  }
}
