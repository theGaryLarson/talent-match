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

  const jobseekerRoutes = [
    "/services/joblistings/[id]",
    "/services/jobseekers/[id]",
    "/services/jobseekers/dashboard",
    "/create-profile/jobseeker/complete",
    "/create-profile/jobseeker/disclosures",
    "/create-profile/jobseeker/education",
    "/create-profile/jobseeker/intro",
    "/create-profile/jobseeker/preferences",
    "/create-profile/jobseeker/showcase",
    "/create-profile/jobseeker/work-experience",
    "/cfa_images/",
    "/signout",
  ];

  const employerRoutes = [
    "/services/employers/dashboard",
    "/create-profile/employer/personal",
    "/create-profile/employer/company-info",
    "/create-profile/employer/professional-info",
    "/create-profile/employer/about",
    "/create-profile/employer/disclosures",
    "/create-profile/employer/mission",
    "/create-profile/employer/video",
    "/create-profile/employer/congratulations",
  ];

  const publicRoutes = [
    "/signin",
    "/login",
    "/signup",
    "/signup/employer",
    "/signup/jobseeker",
    "/",
    "/pre-apprenticeship",
    "/services",
    "/services/employers",
    "/services/employers/dashboard/listview",
    "/services/employers/faq",
    "/services/joblistings",
    "/services/jobseekers",
    "/create-profile/employer",
  ];

  const allowedRolesForJobseekerRoutes = [Role.ADMIN, Role.EMPLOYER, Role.JOBSEEKER];
  const allowedRolesForEmployerRoutes = [Role.ADMIN, Role.EMPLOYER];
  const homeUrl = new URL("/", req.nextUrl.origin);

  // Explicitly allow public routes
  if (!req.auth) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(homeUrl);
    }
  }

  // If you're at signin and logged in, reroute to the main page
  if (req.auth && pathname === "/signin") {
    return NextResponse.redirect(homeUrl);
  }

  // If you're at signout and logged out, reroute to the main page
  if (!req.auth && pathname === "/signout") {
    return NextResponse.redirect(homeUrl);
  }

  if (jobseekerRoutes.some((route) => pathname.includes(route))) {
    if (!allowedRolesForJobseekerRoutes.some((role) => userRoles.includes(role))) {
      console.log("Access denied: User does not have permission for jobseeker route");
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  }

  if (employerRoutes.some((route) => pathname.includes(route))) {
    if (!allowedRolesForEmployerRoutes.some((role) => userRoles.includes(role))) {
      console.log("Access denied: User does not have permission for employer route");
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};