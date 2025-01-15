'use client';
import Link from 'next/link';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import {
  CalendarTodayOutlined,
  InboxOutlined,
  LogoutRounded,
  Menu,
  NotificationsOutlined,
  QuestionAnswerOutlined,
  Task,
  TaskOutlined,
  TimelineOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material';
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
import { usePathname } from 'next/navigation';
import PillButton from '@/app/ui/components/PillButton';
import Header from '@/app/ui/Header';
import Footer from '@/app/ui/Footer';

const drawerWidth = 260;

export default function Layout({ children }: { children: React.ReactNode }) {
  let { data: session, status } = useSession();

  const JobseekerDrawer = () => {
    const pathname = usePathname();
    return (
      <>
        <Toolbar sx={{ height: '76px', mb: '25px' }} />
        <div className="flex flex-col text-button-secondary-idle-text">
          <Stack
            direction={'row'}
            spacing={1}
            sx={{ alignItems: 'center', ml: 5, mb: 3 }}
          >
            <Avatar scale={0.66} imgsrc={session?.user.image || ''} />
            <div>
              <p className="text-wrap font-bold">{session?.user.name}</p>
              <Link
                href={'/edit-profile/jobseeker/introduction'}
                className="text-wrap text-sm text-primary-600 sm-tablet:text-base"
              >
                Edit Profile
              </Link>
            </div>
          </Stack>
          <Link
            href={'/services/jobseekers/dashboard'}
            className={`inline-flex items-center justify-start rounded-l-[20px] p-2 ${pathname === '/services/jobseekers/dashboard' ? 'bg-button-secondary-idle-text text-button-secondary-idle-bg' : 'hover:bg-gray-200'}`}
          >
            <div className="ml-10 space-x-1">
              <PersonOutlineOutlinedIcon />
              <span>Home</span>
            </div>
          </Link>
          <Link
            href={'/underconstruction'}
            className={`inline-flex items-center justify-start rounded-l-[20px] p-2 ${pathname === '/underconstruction' ? 'bg-button-secondary-idle-text text-button-secondary-idle-bg' : 'hover:bg-gray-200'}`}
          >
            <div className="ml-10 space-x-1">
              <InboxOutlined />
              <span>Inbox</span>
            </div>
          </Link>
          <Link
            href="/services/joblistings"
            className={`inline-flex items-center justify-start rounded-l-[20px] p-2 ${pathname === '/services/joblistings' ? 'bg-button-secondary-idle-text text-button-secondary-idle-bg' : 'hover:bg-gray-200'}`}
          >
            <div className="ml-10 space-x-1">
              <WorkOutlineOutlined />
              <span>Jobs</span>
            </div>
          </Link>
          <Link
            href="/services/jobseekers/dashboard/my-applications"
            className={`inline-flex items-center justify-start rounded-l-[20px] p-2 ${pathname === '/services/jobseekers/dashboard/my-applications' ? 'bg-button-secondary-idle-text text-button-secondary-idle-bg' : 'hover:bg-gray-200'}`}
          >
            <div className="ml-10 space-x-1">
              <TaskOutlined />
              <span>Applications</span>
            </div>
          </Link>
          <Link
            href="/underconstruction"
            className={`inline-flex items-center justify-start rounded-l-[20px] p-2 ${pathname === '/underconstruction' ? 'bg-button-secondary-idle-text text-button-secondary-idle-bg' : 'hover:bg-gray-200'}`}
          >
            <div className="ml-10 space-x-1">
              <CalendarTodayOutlined />
              <span>Events</span>
            </div>
          </Link>
          <Link
            href="/underconstruction"
            className={`inline-flex items-center justify-start rounded-l-[20px] p-2 ${pathname === '/underconstruction' ? 'bg-button-secondary-idle-text text-button-secondary-idle-bg' : 'hover:bg-gray-200'}`}
          >
            <div className="ml-10 space-x-1">
              <TimelineOutlined />
              <span>Career Services</span>
            </div>
          </Link>
          <Link
            href="https://forum.watechwfcoalition.org/"
            target="_blank"
            className={`inline-flex items-center justify-start rounded-l-[20px] p-2 ${pathname === '/underconstruction' ? 'bg-button-secondary-idle-text text-button-secondary-idle-bg' : 'hover:bg-gray-200'}`}
          >
            <div className="ml-10 space-x-1">
              <QuestionAnswerOutlined />
              <span>Community Network</span>
            </div>
          </Link>
          <PillButton
            startIcon={<LogoutRounded />}
            disableElevation
            href="/signout"
            sx={{
              ml: 5,
              mt: 3,
              width: '123px',
              backgroundColor: '#f6f6f6',
              color: '#014260',
            }}
          >
            Log Out
          </PillButton>
        </div>
      </>
    );
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (status === "loading") {
     return (
       <div className="min-h-screen">
         {/* Header skeleton */}
         <div className="animate-pulse">
           <div className="h-[76px] border-b bg-white">
             <div className="flex h-full items-center justify-between px-4">
               <div className="h-[50px] w-[75px] bg-gray-200"></div>
             </div>
           </div>

           {/* Main content with right drawer */}
           <div className="flex justify-between">
             {/* Main content area */}
             <div className="flex-1 p-4">
             </div>
           </div>
         </div>
       </div>
     );
   }

  if (session?.user.employerId) {
    return (
      <>
        <Header />
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
        <Footer />
      </>
    );
  } else if (session?.user.jobseekerId) {
    return (
      <div>
        <AppBar
          position="sticky"
          variant="outlined"
          color="inherit"
          sx={{ zIndex: '10000', height: '76px', justifyContent: 'center' }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', zIndex: '20000' }}>
            <Link href="/">
              <span className="sr-only">Tech Workforce Coalition</span>
              <Image
                src="/images/TWC_75x50_2024.svg"
                alt="Tech Workforce Coalition"
                width={75}
                height={50}
              />
            </Link>
            <Stack direction={'row'}>
              <IconButton
                color="inherit"
                aria-label="open notifications"
                edge="start"
                sx={{ mr: { xs: 2, sm: 4 } }}
              >
                <NotificationsOutlined />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { xs: 'block', sm: 'none' } }}
              >
                <Menu />
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>
        <Grid2
          sx={{ display: { xs: 'none', sm: 'block' }, width: drawerWidth }}
        >
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
                width: drawerWidth,
              },
            }}
          >
            <JobseekerDrawer />
          </Drawer>
        </Grid2>
        <Box
          component="main"
          sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          {children}
        </Box>
      </div>
    );
  } else {
    return (
      <>
        <Header />
        {children}
        <Footer />
      </>
    );
  }
}
