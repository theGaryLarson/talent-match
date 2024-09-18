import { auth } from "@/auth";
import { NextResponse } from 'next/server';
import { Role } from "./data/dtos/UserInfoDTO";

// Access tier list:
// Admin can see any route
// Employers can see Employer, Jobseeker, and public (None)
// Jobseekers can see Jobseeker and public
// None can only see public

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const userRoles = req.auth?.user?.roles || [];
  const userId = req.auth?.user?.id;

    // Routes for logged in users with jobseeker role
    const guestRoutes = [
      "/signup",
      "/signout",
    ];

  // Routes for logged in users with jobseeker role
  const jobseekerRoutes = [
    "/signup/jobseeker",
    
    "/create-profile/jobseeker/complete",
    "/create-profile/jobseeker/disclosures",
    "/create-profile/jobseeker/education",
    "/create-profile/jobseeker/introduction",
    "/create-profile/jobseeker/preferences",
    "/create-profile/jobseeker/showcase",
    "/create-profile/jobseeker/work-experience",

    // "/services/joblistings/[id]", // out of scope for MVP
    "/services/jobseekers/dashboard",

    "/signout",
  ];

  // Routes for logged in users with employer role
  const employerRoutes = [
    "/signup/employer",

    "/create-profile/employer/personal",
    "/create-profile/employer/company-info",
    "/create-profile/employer/professional-info",
    "/create-profile/employer/about",
    "/create-profile/employer/disclosures",
    "/create-profile/employer/mission",
    "/create-profile/employer/video",
    "/create-profile/employer/congratulations",

    "/services/employers/dashboard",
    "/services/employers/dashboard/listview",
    // "/services/joblistings/[id]", // out of scope for MVP
    "/services/jobseekers/[id]",

    "/signout",
  ];

  // Routes for any public, non-logged in user
  const publicRoutes = [
    "/signin",
    "/",
    "/pre-apprenticeship",
    "/services",
    "/services/employers",
    "/services/employers/faq",
    // "/services/joblistings", // out of scope for MVP
    "/services/jobseekers",
    "/cfa_images/",
  ];
  
  const rolesForGuest = [/*Role.ADMIN,*/ Role.GUEST]; // disable admin routing for now
  const rolesForJobseeker = [/*Role.ADMIN,*/ Role.JOBSEEKER]; // disable admin routing for now
  const rolesForEmployer = [/*Role.ADMIN,*/ Role.EMPLOYER]; // disable admin routing for now

  const homeUrl = new URL("/", req.nextUrl.origin);

  // Explicitly allow public routes
  if (!req.auth) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      console.log("Access denied: This page is not public - " + pathname);
      return NextResponse.redirect(homeUrl);
    }
  }

  // If you're signed in and haven't picked a role, you gotta
  if (req.auth && userRoles.includes(Role.GUEST) && pathname !== "/signup") {
    const signUpUrl = new URL("/signup", req.nextUrl.origin);
    return NextResponse.redirect(signUpUrl);
  } // TODO: maybe allow guest signout? low priority for now

  // If you're at signin and logged in, reroute to the main page
  if (req.auth && pathname === "/signin") {
    return NextResponse.redirect(homeUrl);
  }

  // If you're at signout and logged out, reroute to the main page
  if (!req.auth && pathname === "/signout") {
    return NextResponse.redirect(homeUrl);
  }

  // Route checking for jobseeker routes
  if (jobseekerRoutes.some((route) => pathname.includes(route))) {
    // TODO: only allow jobseekers to view their own profile
    if (!rolesForJobseeker.some((role) => userRoles.includes(role))) {
      console.log("Access denied: User does not have permission for jobseeker route");
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  }

  // Route checking for employer routes
  if (employerRoutes.some((route) => pathname.includes(route))) {
    if (!rolesForEmployer.some((role) => userRoles.includes(role))) {
      console.log("Access denied: User does not have permission for employer route");
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  }

  // Route checking for guest routes
  if (guestRoutes.some((route) => pathname.includes(route))) {
    if (!rolesForGuest.some((role) => userRoles.includes(role))) {
      console.log("Access denied: User does not have permission for guest route");
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};