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
    // "/services/joblistings/[id]", // out of scope for MVP
  ];

  // Routes for any public, non-logged in user
  const publicRoutes = [
    "/signin",
    "/signout",
    "/",
    // "/pre-apprenticeship",
    "/services",
    "/services/employers",
    "/services/employers/faq",
    "/services/employers/dashboard/listview",
    // "/services/joblistings", // out of scope for MVP
    "/services/jobseekers",
    "/cfa_images/",
  ];

  const rolesForGuest = [/*Role.ADMIN,*/ Role.GUEST]; // disable admin routing for now
  const rolesForJobseeker = [/*Role.ADMIN,*/ Role.JOBSEEKER]; // disable admin routing for now
  const rolesForEmployer = [/*Role.ADMIN,*/ Role.EMPLOYER]; // disable admin routing for now

  const homeUrl = new URL("/", req.nextUrl.origin);


  // HOME PAGE ------------
  if (pathname === "/") {
    return NextResponse.next();
  }


  // SPECIFIC REDIRECTS ------------

  // If you're at signout and logged out, reroute to the main page
  if (!req.auth && pathname === "/signout") {
    return NextResponse.redirect(homeUrl);
  }
  // If you're at signin and logged in, reroute to the main page
  else if (req.auth && pathname === "/signin") {
    return NextResponse.redirect(homeUrl);
  }
  // If you're signed in and haven't picked a role, you gotta
  else if (req.auth && userRoles.includes(Role.GUEST) && pathname !== "/signup") {
    const signUpUrl = new URL("/signup", req.nextUrl.origin);
    return NextResponse.redirect(signUpUrl);
  }


  // PUBLIC ROUTING ------------

  // Explicitly allow public routes
  else if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }


  // ROLE BASED ROUTING ------------

  // Route checking for jobseeker routes
  else if (jobseekerRoutes.some((route) => pathname.includes(route))) {
    if (!rolesForJobseeker.some((role) => userRoles.includes(role))) {
      console.log("Access denied: User does not have permission for jobseeker route");
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  }
  // Only allow jobseekers to view their own profile, not others
  else if (rolesForJobseeker.some((role) => userRoles.includes(role)) &&
    pathname.startsWith("/services/jobseekers/")) {
    const requestedId = pathname.replace("/services/jobseekers/", "");
    console.log(requestedId + ", " + userId);
    if (requestedId != userId) {
      console.log("Access denied: Jobseeker can only access their own profile");
      return NextResponse.redirect(homeUrl);
    }
    else return NextResponse.next();
  }
  // Route checking for employer routes
  else if (employerRoutes.some((route) => pathname.includes(route) || 
           pathname.startsWith("/services/jobseekers/"))) { // Maybe think of a better way to handle [id]'s when I've had some sleep
    if (!rolesForEmployer.some((role) => userRoles.includes(role))) {
      console.log("Access denied: User does not have permission for employer route");
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  }
  // Route checking for guest routes
  else if (guestRoutes.some((route) => pathname.includes(route))) {
    if (!rolesForGuest.some((role) => userRoles.includes(role))) {
      console.log("Access denied: User does not have permission for guest route");
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  }

  // FAILED ALL CHECKS, REDIRECT HOME ------------
  // Do not pass GO, do not collect $200
  else {
    console.log("Access denied: This page is not public - " + pathname);
    return NextResponse.redirect(homeUrl);
  }
});

export const config = { // TODO: route guard the API...
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};