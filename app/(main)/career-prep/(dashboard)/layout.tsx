import Link from 'next/link';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import { auth } from '@/auth';
import { BookmarkIcon } from '@heroicons/react/24/outline';
export default async function layout({ children }: { children: React.ReactNode }) {
  let session = await auth()
  console.log(session)

  return (
    <div className="flex">
      <div className="flex min-w-[230px] flex-col text-[#047f9c] capitalize">
        <Link
          href="/career-prep"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <PersonOutlineOutlinedIcon />
          Home
        </Link>
        {/* <Link
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
        </Link> */}
      </div>
      {children}
    </div>
  );
}
