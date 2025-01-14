"use client"
import Link from 'next/link';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { CalendarTodayOutlined, InboxOutlined, Menu, NotificationsOutlined, Task, TaskOutlined, WorkOutlineOutlined } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Drawer,
  Grid2,
  IconButton,
  Stack,
  Toolbar,
} from '@mui/material';
import Image from 'next/image';
import Avatar from '@/app/ui/components/Avatar';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const drawerWidth = 260;

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  let {data: session} = useSession();

  const JobseekerDrawer = () => (
      <>
        <Toolbar sx={{mb: 2.5}} />
        <Stack direction={'row'} spacing={1} sx={{alignItems: 'center', ml: 2}}>
          <Avatar scale={0.66} imgsrc={session?.user.image || ''} />
          <div>
            <p className="text-wrap font-bold">{session?.user.name}</p>
            <Link href={'/edit-profile/jobseeker/introduction'} className="text-wrap text-primary-600 text-sm sm-tablet:text-base">Edit Profile</Link>
          </div>
        </Stack>
        <Link
          href={'/services/jobseekers/dashboard'}
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <PersonOutlineOutlinedIcon />
          Home
        </Link>
        <Link
          href={'/services/jobseekers/dashboard'}
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <InboxOutlined />
          Inbox
        </Link>
        <Link
          href="/services/joblistings"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <WorkOutlineOutlined />
          Jobs
        </Link>
        <Link
          href="/services/jobseekers/dashboard/my-applications"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <TaskOutlined />
          Applications
        </Link>
        <Link
          href="/underconstruction"
          className="inline-flex items-center justify-start gap-[5px] p-2 hover:bg-gray-200"
        >
          <CalendarTodayOutlined />
          Events
        </Link>
      </>
    );

  const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

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
      <div>
        <AppBar position='relative' variant="outlined" color="inherit" sx={{zIndex: "10000"}}>
          <Toolbar sx={{ justifyContent: 'space-between', zIndex: "20000"}}>
            <Link href="/">
              <span className="sr-only">Tech Workforce Coalition</span>
              <Image
                src="/images/TWC_75x50_2024.svg"
                alt="Tech Workforce Coalition"
                width={75}
                height={31.8}
              />
            </Link>
            <Stack direction={'row'}>
            <IconButton
              color="inherit"
              aria-label="open notifications"
              edge="start"
                sx={{ mr: {xs: 2, sm: 4} }}
            >
              <NotificationsOutlined />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{display: { xs: 'block', sm: 'none' } }}
            >
              <Menu />
            </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>
        <Grid2 sx={{width: drawerWidth}}>
        <Drawer
          elevation={0}
          variant="permanent"
          anchor="right"
          sx={{
            display: { xs: 'none', sm: 'block' },
            width: drawerWidth,
            '& .MuiDrawer-paper': { border: 0, width: drawerWidth },
          }}
        >
          {<JobseekerDrawer />}
        </Drawer>
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            },
          }}
        >
          <JobseekerDrawer />
        </Drawer>
        </Grid2>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          {children}
        </Box>
      </div>
    );
  } else {
    return <>{children}</>;
  }
}
