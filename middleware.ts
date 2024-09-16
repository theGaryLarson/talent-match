import { auth } from "@/auth";
import { NextResponse } from 'next/server';
import { Role } from "./data/dtos/UserInfoDTO";

// Access tier list:
// Admin can see any route
// Employers can see Employer, Jobseeker, and public (None)
// Jobseekers can see Jobseeker and public
// None can only see public

export default auth((req) => {
  // console.log(req);
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
    "/signup/",
    "/signup/jobseeker/",

    // TODO: This should be in employerRoutes once auth logic is updated
    "/create-profile/employer",
    "/create-profile/employer/personal",
    "/create-profile/employer/company",
    "/create-profile/employer/about",
    "/create-profile/employer/disclosures",
    "/create-profile/employer/mission",
    "/create-profile/employer/video",
    "/create-profile/employer/congratulations",
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
    "/signout",
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

  const userRoles = req.auth?.user?.roles || [];

  if (req.auth && pathname === "/signin" && !userRoles.includes(Role.NONE)) {
    console.log("logged in, redirecting to dashboard");
    const loginUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  if (req.auth && userRoles.includes(Role.NONE) && pathname !== "/signup" && pathname !== "/signout") {
    console.log("redirected to account data creation");
    const loginUrl = new URL("/signup", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  if (req.auth && userRoles.includes(Role.NONE) && pathname === "/signup") {
    return NextResponse.next();
  }

  // Check for jobseeker role access
  if (jobseekerRoutes.some((route) => pathname.includes(route))) {
    if (!userRoles.includes(Role.JOBSEEKER)) {
      console.log("Access denied: User is not a jobseeker");
      const loginUrl = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === "/signin") {
    const homeUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(homeUrl);
  }

  if (jobseekerRoutes.some((route) => pathname.includes(route))) {
    if (!allowedRolesForJobseekerRoutes.some((role) => userRoles.includes(role))) {
      console.log("Access denied: User does not have permission for jobseeker route");
      const homeUrl = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  }

  if (employerRoutes.some((route) => pathname.includes(route))) {
    if (!allowedRolesForEmployerRoutes.some((role) => userRoles.includes(role))) {
      console.log("Access denied: User does not have permission for employer route");
      const homeUrl = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|cfa_images|favicon.ico).*)"],
};