import Link from 'next/link';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
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
          href="/admin"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <PersonOutlineOutlinedIcon />
          Home
        </Link>
        <Link
            href="/admin/add-edu-provider"
            className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <AddBusinessOutlined/>
          Add Training Provider
        </Link>
        <Link
          href="/admin/update-edu-provider"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <AddBusinessOutlined/>
          Update Training Provider
        </Link>
        <Link
          href="/admin/add-company"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <AddBusinessOutlined/>
          Add a Company
        </Link>
        <Link
          href="/admin/user-management"
          className="inline-flex items-center justify-start gap-[5px]  p-2 hover:bg-gray-200"
        >
          <ManageAccountsOutlinedIcon/>
          User Management
        </Link>
        <Link
          href="/admin/postjob"
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
