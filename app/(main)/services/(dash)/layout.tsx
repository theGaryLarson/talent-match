import Link from 'next/link';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { auth } from '@/auth';
import { BookmarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { Dashboard } from '@mui/icons-material';
export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = await auth();
  if (session?.user.employerId) {
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
            className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
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
            <BookmarkIcon width={24} />
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
    );
  } else if (session?.user.jobseekerId) {
    return (
      <div className="flex">
        <div className="flex min-w-[230px] flex-col text-[#047f9c]">
          <Link
            href="/services/jobseekers/dashboard"
            className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
          >
            <Dashboard />
            Dashboard
          </Link>
          <Link
            href={"/services/jobseekers/" + session?.user.jobseekerId}
            className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
          >
            <PersonOutlineOutlinedIcon />
            My Profile
          </Link>
          <Link
            href="/services/joblistings"
            className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
          >
            <SearchOutlinedIcon />
            Job Search
          </Link>

          <Link
            href="/services/jobseekers/dashboard/my-applications"
            className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
          >
            <FolderOutlinedIcon />
            Applied Jobs
          </Link>
          <Link
            href="/services/jobseekers/dashboard/bookmarks"
            className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
          >
            <BookmarkIcon width={24} />
            Saved Jobs
          </Link>
        </div>
        {children}
      </div>
    );
  } else {
    return <>{children}</>;
  }
}
