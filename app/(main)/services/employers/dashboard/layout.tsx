import Link from 'next/link';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { auth } from '@/auth';
export default async function layout({ children }: { children: React.ReactNode }) {
  let session = await auth()
  console.log(session)
  if(session?.user.employerId){
  return (
    <div className="flex">
      <div className="flex w-[230px] flex-col text-[#047f9c]">
        <Link
          href="/services/employers/dashboard"
          className="inline-flex items-center justify-start gap-[5px] p-2"
        >
          <PersonOutlineOutlinedIcon />
          Home
        </Link>
        <Link
          href="/services/employers/dashboard/listview"
          className="inline-flex items-center justify-start gap-[5px]  p-2"
        >
          <SearchOutlinedIcon />
          Candidate Search
        </Link>

        <Link
          href="/services/employers/dashboard/myjobposts"
          className="inline-flex items-center justify-start gap-[5px] p-2"
        >
          <FolderOutlinedIcon />
          My Job Posts
        </Link>

        <Link
          href="/services/employers/dashboard"
          className="inline-flex items-center justify-start gap-[5px]  p-2"
        >
          <EmailOutlinedIcon />
          Inbox
        </Link>
        <Link
          href="/services/employers/dashboard/postjob"
          className="inline-flex items-center justify-start gap-[5px]  p-2"
        >
          <EmailOutlinedIcon />
          Post a job
        </Link>
      </div>
      {children}
    </div>
  );}else{
    return <>{children}</>
  }
}
