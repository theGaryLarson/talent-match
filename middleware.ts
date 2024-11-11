import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { Role } from './data/dtos/UserInfoDTO';

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const userRoles = req.auth?.user?.roles || [];
  const jobseekerId = req.auth?.user?.jobseekerId;

  const guestRoutes = [ // Routes for logged in users with GUEST role
    '/signup',
    '/signup/jobseeker',
    '/signup/employer',

    '/api/users/',
  ];

  const jobseekerRoutes = [ // Routes for logged in users with JOBSEEKER role
    '/edit-profile/jobseeker/congratulations',
    '/edit-profile/jobseeker/disclosures',
    '/edit-profile/jobseeker/education',
    '/edit-profile/jobseeker/introduction',
    '/edit-profile/jobseeker/preferences',
    '/edit-profile/jobseeker/showcase',
    '/edit-profile/jobseeker/work-experience',
    
    '/services/jobseekers/dashboard',
    '/services/jobseekers/',
    '/services/joblistings',
    '/api/joblistings/apply',
    '/api/joblistings/bookmark/add/',
    '/api/joblistings/bookmark/remove/',

    '/api/jobseekers/',
    '/api/edu-providers/',
    '/api/skills/search/',
    '/api/employers/technology-areas',
    '/api/users/avatar/upload',
  ];

  const employerRoutes = [ // Routes for logged in users with EMPLOYER role
    '/edit-profile/employer/personal',
    '/edit-profile/employer/company',
    '/edit-profile/employer/professional-info',
    '/edit-profile/employer/about',
    '/edit-profile/employer/disclosures',
    '/edit-profile/employer/mission',
    '/edit-profile/employer/video',
    '/edit-profile/employer/congratulations',

    '/services/employers/dashboard',
    '/services/jobseekers/',
    '/services/joblistings',

    '/api/joblistings/add',
    '/api/joblistings/delete',
    '/api/employers/',
    '/api/companies',
    '/api/users/avatar/upload',
    '/api/skills/search/',
    '/api/postal-geo-data/zip/search',
    '/api/joblistings/sectors',
    '/api/joblistings/techarea',
  ];

  const publicRoutes = [ // Routes for anyone, logged in or not
    '/',
    '/underconstruction',

    '/signin',
    '/signout',

    '/services',
    '/services/employers',
    '/services/employers/faq',
    '/services/talent-search',
    '/services/jobseekers',
    '/services/careers',
    '/services/careers/cybersecurity',
    '/services/careers/data-analytics',
    '/services/careers/it-cloud-support',
    '/services/careers/software-developer',

    '/api/jobseekers/query',
    '/api/employers/industry-sectors',
    '/api/postal-geo-data/zip/search/',
  ];

  function userIsGuest() {
    return userRoles.includes(Role.GUEST) || userRoles.includes(Role.ADMIN);
  }
  function userIsJobseeker() {
    return userRoles.includes(Role.JOBSEEKER) || userRoles.includes(Role.ADMIN);
  }
  function userIsEmployer() {
    return userRoles.includes(Role.EMPLOYER) || userRoles.includes(Role.ADMIN);
  }

  function pathIsGuestRoute() {
    return guestRoutes.some((route) => pathname.startsWith(route));
  }
  function pathIsJobseekerRoute() {
    return jobseekerRoutes.some((route) => pathname.startsWith(route));
  }
  function pathIsEmployerRoute() {
    return employerRoutes.some((route) => pathname.startsWith(route));
  }

  const homeUrl = new URL('/', req.nextUrl.origin);

  // HOME PAGE ------------ Always allowed

  if (pathname === '/') {
    return NextResponse.next();
  }

  // SPECIFIC REDIRECTS ------------ Handling special cases

  if (!req.auth && pathname === '/signout') {
    return NextResponse.redirect(homeUrl); // If you're at signout and logged out, reroute to the main page
  }
  else if (req.auth && pathname === '/signin') {
    if (userRoles.includes(Role.GUEST)) { // If you're signed in and haven't picked a role, you gotta
      return NextResponse.redirect(new URL('/signup', req.nextUrl.origin));
    }
    else return NextResponse.redirect(homeUrl); // Everyone else, reroute to the main page after signin
  }
  else if (!req.auth && pathname.startsWith('/services/jobseekers/')) {
    // Caught someone! Create account to view jobseeker
    return NextResponse.redirect(new URL('/signin', req.nextUrl.origin));
  }

  // PUBLIC ROUTING ------------ Any route which is always publicly accessible
  else if (publicRoutes.includes(pathname)) {
    // Explicitly allow public routes, no wildcards or startsWith for safety
    return NextResponse.next();
  }

  // ROLE BASED ROUTING ------------ Check most permissive roles first, least permissive roles last
  
  else if (userRoles.includes(Role.ADMIN)) { // Route checking for ADMIN routes
    console.log('Admin role recognized! *Do not* use ADMIN to test other roles!!')
    return NextResponse.next();
  }

  else if (userIsEmployer()) { // Route checking for EMPLOYER routes
    if (pathIsEmployerRoute()) return NextResponse.next();
    else {
      console.log('Access denied: Employer role does not have permission to access - ' + pathname);
      return NextResponse.redirect(homeUrl);
    }
  }

  else if (userIsJobseeker()) { // Route checking for JOBSEEKER routes
    if (pathIsJobseekerRoute()) {
      if ( pathname != '/services/jobseekers/dashboard' && // allow dashboard
           pathname.startsWith('/services/jobseekers/') ) {
        
        const requestedId = pathname.replace('/services/jobseekers/', '');
        if (requestedId != jobseekerId) { // Jobseekers can only access their own profile
          console.log('Access denied: Jobseeker can only access their own profile');
          return NextResponse.redirect(homeUrl);
        }
      }
      return NextResponse.next();
    } else {
      console.log('Access denied: Jobseeker role does not have permission to access - ' + pathname);
      return NextResponse.redirect(homeUrl);
    }
  }

  else if (userIsGuest()) { // Route checking for GUEST routes
    if (pathIsGuestRoute()) return NextResponse.next();
    else {
      console.log('Access denied: User does not have permission to access - ' + pathname);
      return NextResponse.redirect(homeUrl);
    }
  }

  // FAILED ALL CHECKS, REDIRECT HOME ------------ Do not pass GO, do not collect $200
  else {
    console.log("Access denied: User's role does not have permission to access - " + pathname);
    return NextResponse.redirect(homeUrl);
  }
});

/* Match all request paths except for the ones starting with:
 * - api/auth (all auth routes are allowed)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - images (...images. what did you expect?)
 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
 */
export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|images|favicon.ico|ess).*)',
  ],
};
