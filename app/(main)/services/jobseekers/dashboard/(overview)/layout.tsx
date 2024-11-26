import Link from 'next/link';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import { auth } from '@/auth';
import {BookmarkOutlined, BookmarksOutlined } from '@mui/icons-material';

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = await auth();
  console.log(session);

  return (
    <div className="flex">
      <div className="flex min-w-[230px] flex-col capitalize text-[#047f9c]">
        <Link
          href="/services/jobseekers/dashboard"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <PersonOutlineOutlinedIcon />
          Home
        </Link>
        {/* <Link
          href="/services/jobseekers/dashboard/jobsearch"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <SearchOutlinedIcon/>
          Job Search
        </Link>
        <Link
          href="/services/jobseekers/dashboard/my-applications"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <FolderOutlinedIcon/>
          My Applications
        </Link>
        <Link
          href="/services/jobseekers/dashboard/bookmarks"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <BookmarksOutlined/>
          Saved Jobs
        </Link> */}
      </div>
      {children}
    </div>
  );
}
