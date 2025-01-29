'use client';
import Link from 'next/link';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import {
  BookmarkBorderRounded,
  CalendarTodayRounded,
  InboxOutlined,
  LinkedIn,
  LogoutRounded,
  Menu,
  NotificationsOutlined,
  PersonOutlineRounded,
  QuestionAnswerOutlined,
  TaskOutlined,
  TimelineRounded,
  WorkOutlineRounded,
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
import { useCallback, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import PillButton from '@/app/ui/components/PillButton';
import Header from '@/app/ui/Header';
import Footer from '@/app/ui/Footer';

const drawerWidth = 260;

const JobseekerDrawer = ({ session }: { session: any }) => {
  const pathname = usePathname();

  const links = [
    {
      href: '/services/jobseekers/dashboard',
      icon: <PersonOutlineRounded />,
      label: 'Home',
    },
    { href: '/underconstruction', icon: <InboxOutlined />, label: 'Inbox' },
    {
      href: '/services/joblistings',
      icon: <WorkOutlineRounded />,
      label: 'Jobs',
    },
    {
      href: '/services/jobseekers/dashboard/bookmarks',
      icon: <BookmarkBorderRounded />,
      label: 'Saved Jobs',
    },
    {
      href: '/services/jobseekers/dashboard/my-applications',
      icon: <TaskOutlined />,
      label: 'Applications',
    },
    {
      href: '/services/jobseekers/dashboard/events',
      icon: <CalendarTodayRounded />,
      label: 'Events',
    },
    {
      href: '/underconstruction',
      icon: <TimelineRounded />,
      label: 'Career Services',
    },
    {
      href: 'https://forum.watechwfcoalition.org/',
      icon: <QuestionAnswerOutlined />,
      label: 'Community Network',
      external: true,
    },
  ];

  return (
    <>
      <Toolbar sx={{ height: '76px' }} />
      <div className="flex flex-col text-button-secondary-idle-text">
        <Stack
          direction={'row'}
          gap={1}
          sx={{mt: '25px', alignItems: 'center', ml: 5, mb: 3 }}
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
        {links.map((link) => (
          <Link
            key={link.label + link.href}
            href={link.href}
            className={`inline-flex items-center justify-start rounded-l-[20px] p-2 ${
              pathname === link.href
                ? 'bg-button-secondary-idle-text text-button-secondary-idle-bg'
                : 'hover:bg-gray-200'
            }`}
            target={link.external ? '_blank' : undefined}
          >
            <div className="ml-10 space-x-1">
              {link.icon}
              <span>{link.label}</span>
            </div>
          </Link>
        ))}
        <PillButton
          startIcon={<LogoutRounded />}
          disableElevation
          href="/signout"
          sx={{
            ml: 5,
            mt: 3,
            mb: 3,
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

export default function Layout({ children }: { children: React.ReactNode }) {
  let { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  if (status === 'loading') {
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
            <div className="flex-1 p-4"></div>
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
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
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
                sx={{ mr: { xs: 2, md: 4 } }}
              >
                <NotificationsOutlined />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                <Menu />
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>
        <Grid2
          sx={{ display: { xs: 'none', md: 'block' }, width: drawerWidth }}
        >
          <Drawer
            elevation={0}
            variant="permanent"
            anchor="right"
            sx={{
              display: { xs: 'none', md: 'block' },
              width: drawerWidth,
              '& .MuiDrawer-paper': { border: 0, width: drawerWidth },
            }}
          >
            <JobseekerDrawer session={session} />
          </Drawer>
          <Drawer
            variant="temporary"
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            <JobseekerDrawer session={session} />
          </Drawer>
        </Grid2>
        <Box
          component="main"
          sx={{ mt: '25px', flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
        >
          {children}
        </Box>
        <Grid2
          gap={2}
          container
          sx={{
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 5,
            py: 2.5,
            zIndex: 9000,
            bgcolor: '#F6F6F6',
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
            <Link href={'/policies/terms-of-service'}>Terms of Service</Link>
            {/*<Link href={'/underconstruction'}>Privacy Policy</Link>
            <Link href={'/underconstruction'}>Cookie Settings</Link>*/}
          </Stack>
          <div>
            <p>
              Follow Us{' '}
              <Link
                target="_blank"
                href="https://www.linkedin.com/company/washington-tech-workforce-coalition"
              >
                <LinkedIn />
              </Link>
            </p>
          </div>
        </Grid2>
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
