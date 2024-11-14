import Link from 'next/link';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { auth } from '@/auth';
import { BookmarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { AddBusinessOutlined } from '@mui/icons-material';
export default async function layout({ children }: { children: React.ReactNode }) {
  let session = await auth()
  console.log(session)

  return (
    <div className="flex capitalize">
      <div className="flex min-w-[230px] flex-col text-[#047f9c]">
        <Link
          href="/career-prep"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <PersonOutlineOutlinedIcon />
          Home
        </Link>
        <Link
          href="/career-prep"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <BookmarkIcon width={24}/>
          My Case Load
        </Link>
        <Link
          href="/career-prep"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <BookmarkIcon width={24}/>
          Unassigned Cases
        </Link>
        <Link
          href="/career-prep/postjob"
          className="inline-flex items-center justify-start gap-[5px]  p-2 hover:bg-gray-200"
        >
          <PencilSquareIcon width={24}/>
          Post a job
        </Link>
      </div>
      {children}
    </div>
  );
}
