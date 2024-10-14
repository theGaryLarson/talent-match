import { auth } from "@/auth";
import { NextResponse } from 'next/server';
import { Role } from "./data/dtos/UserInfoDTO";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const userRoles = req.auth?.user?.roles || [];
  const jobseekerId = req.auth?.user?.jobseekerId;

  const guestRoutes = [ // Routes for logged in users with GUEST role
    "/signup",
    "/signup/jobseeker",
    "/signup/employer",

    "/api/users/",
  ];

  const jobseekerRoutes = [ // Routes for logged in users with JOBSEEKER role
    "/create-profile/jobseeker/congratulations",
    "/create-profile/jobseeker/disclosures",
    "/create-profile/jobseeker/education",
    "/create-profile/jobseeker/introduction",
    "/create-profile/jobseeker/preferences",
    "/create-profile/jobseeker/showcase",
    "/create-profile/jobseeker/work-experience",

    "/services/jobseekers/dashboard",


    "/services/joblistings",

    "/api/jobseekers/",

    "/api/edu-providers/", //fixme: had to add so jobseeker can see list of colleges in TextFieldAutoComplete component
    "/api/skills/search/",  //fixme: had to add so jobseeker can see list of skills in TextFieldAutoComplete component
    "/api/employers/technology-areas", //fixme: had to add so jobseeker can see list of tech-areas in TextFieldAutoComplete component
    "/services/jobseekers",  // fixme: had to add to view own profile. Need to validate that id is theirs to view the page.
    "/api/users/avatar/upload" // fixme: had to add so jobseeker can update their avatar image.
  ];

  const employerRoutes = [ // Routes for logged in users with EMPLOYER role
    "/create-profile/employer/personal",
    "/create-profile/employer/company",
    "/create-profile/employer/professional-info",
    "/create-profile/employer/about",
    "/create-profile/employer/disclosures",
    "/create-profile/employer/mission",
    "/create-profile/employer/video",
    "/create-profile/employer/congratulations",

    "/services/employers/dashboard",
    "/services/jobseekers/",
    "/services/joblistings",
    "/api/joblistings/add",
    "/api/employers/",

    "/api/companies",  //fixme: had to add so employer can see list of existing companies in TextFieldAutoComplete component
    "/api/users/avatar/upload", //fixme: had to add so employer can upload an image
    "/api/skills/search/", // fixme: had to add so employer can search based on skills
    "/api/post-geo-data/zip/search/", // fixme: had to add so employer can select work location.
  ];

  const publicRoutes = [ // Routes for anyone, logged in or not
    "/",
    "/underconstruction",

    "/signin",
    "/signout",

    "/services",
    "/services/employers",
    "/services/employers/faq",
    "/services/employers/dashboard/listview",
    "/services/jobseekers",

    "/api/jobseekers/query",
    "/api/employers/industry-sectors",
  ];

  function userIsGuest() { return userRoles.includes(Role.GUEST) /* || userRoles.includes(Role.ADMIN)*/; }
  function userIsJobseeker() { return userRoles.includes(Role.JOBSEEKER) /* || userRoles.includes(Role.ADMIN)*/; }
  function userIsEmployer() { return userRoles.includes(Role.EMPLOYER) /* || userRoles.includes(Role.ADMIN)*/; }

  function pathIsGuestRoute() { return guestRoutes.some((route) => pathname.startsWith(route)); }
  function pathIsJobseekerRoute() { return jobseekerRoutes.some((route) => pathname.startsWith(route)); }
  function pathIsEmployerRoute() { return employerRoutes.some((route) => pathname.startsWith(route)); }

  const homeUrl = new URL("/", req.nextUrl.origin);


  // HOME PAGE ------------ Always allowed

  if (pathname === "/") {
    return NextResponse.next();
  }


  // SPECIFIC REDIRECTS ------------ Handling special cases

  if (!req.auth && pathname === "/signout") { // If you're at signout and logged out, reroute to the main page
    return NextResponse.redirect(homeUrl);
  }

  else if (req.auth && pathname === "/signin") { // If you're at signin and logged in
    if (userRoles.includes(Role.GUEST)) { // If you're signed in and haven't picked a role, you gotta
      return NextResponse.redirect(new URL("/signup", req.nextUrl.origin));
    }
    else return NextResponse.redirect(homeUrl); // Everyone else, reroute to the main page after signin
  }

  else if (!req.auth && pathname.startsWith("/services/jobseekers/")) { // Caught someone! Create account to view jobseeker
    return NextResponse.redirect(new URL("/signin", req.nextUrl.origin));
  }


  // PUBLIC ROUTING ------------ Any route which is always publicly accessible

  else if (publicRoutes.includes(pathname)) { // Explicitly allow public routes, no wildcards or startsWith for safety
    return NextResponse.next();
  }


  // ROLE BASED ROUTING ------------ Check most permissive roles first, least permissive roles last

  else if (userIsEmployer()) { // Route checking for employer routes
    if (pathIsEmployerRoute()) return NextResponse.next();
    else {
      console.log("Access denied: Employer role does not have permission to access - " + pathname);
      return NextResponse.redirect(homeUrl);
    }
  }

  else if (userIsJobseeker()) { // Route checking for jobseeker routes
    if (pathIsJobseekerRoute()) {
      if (pathname.startsWith("/services/jobseekers/")) { // Jobseekers can only access their own profile
        const requestedId = pathname.replace("/services/jobseekers/", "");
        if (requestedId != jobseekerId) {
          console.log("Access denied: Jobseeker can only access their own profile");
          return NextResponse.redirect(homeUrl);
        }
      }
      return NextResponse.next();
    }
    else {
      console.log("Access denied: Jobseeker role does not have permission to access - " + pathname);
      return NextResponse.redirect(homeUrl);
    }
  }

  else if (userIsGuest()) { // Route checking for guest routes
    if (pathIsGuestRoute()) return NextResponse.next();
    else {
      console.log("Access denied: User does not have permission to access - " + pathname);
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
export const config = { // TODO: route guard the API...
  matcher: ["/((?!api/auth|_next/static|_next/image|images|favicon.ico|ess).*)"],
};