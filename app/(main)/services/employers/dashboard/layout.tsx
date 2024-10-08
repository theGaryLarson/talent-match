import Link from 'next/link';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
export default function layout({ children }: { children: React.ReactNode }) {
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
      </div>
      {children}
    </div>
  );
}
