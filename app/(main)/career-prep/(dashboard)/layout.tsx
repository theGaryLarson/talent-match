import "@/app/ui/admin.css";
import Link from "next/link";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CasesOutlinedIcon from "@mui/icons-material/CasesOutlined";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import { auth } from "@/auth";
export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log(session);

  return (
    <div className="flex">
      <div className="flex min-w-[150px] flex-col text-primary-main capitalize">
        <Link
          href="/career-prep"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <PersonOutlineOutlinedIcon />
          Home
        </Link>
        <Link
          href="/career-prep/my-case-load"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <CasesOutlinedIcon />
          My Case Load
        </Link>
        <Link
          href="/career-prep/new-cases"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <CreateNewFolderOutlinedIcon />
          Unassigned Cases
        </Link>

        <Link
          href="/career-prep/placement-tracking"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <TableChartOutlinedIcon />
          Application Status
        </Link>
        <Link
          href="/career-prep/postajob"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <PostAddOutlinedIcon />
          Post a Job
        </Link>
        <Link
          href="/career-prep/updatejob"
          className="inline-flex items-center justify-start gap-[5px]  p-2 hover:bg-gray-200"
        >
          <UpdateOutlinedIcon />
          Update a job
        </Link>
        <Link
          href="/career-prep/events"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <EditCalendarIcon />
          Events
        </Link>

        {/*
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
