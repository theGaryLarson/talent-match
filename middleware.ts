import { auth } from "@/auth";
import { NextResponse } from 'next/server';
import { Role } from "./data/dtos/UserInfoDTO";

export default auth((req) => {
  // console.log(req);
  const jobseekerRoutes = [
    "/services/jobseekers",
    "/services/jobseekers/[id]",
    "/services/jobseekers/dashboard",
    "/services/jobseekers/dashboard/(overview)",
    "/create-profile/jobseeker/complete",
    "/create-profile/jobseeker/disclosures",
    "/create-profile/jobseeker/education",
    "/create-profile/jobseeker/introduction",
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
    "/create-profile/employer",
    "/create-profile/employer/personal",
    "/create-profile/employer/company",
    "/create-profile/employer/about",
    "/create-profile/employer/disclosures",
    "/create-profile/employer/mission",
    "/create-profile/employer/video",
    "/create-profile/employer/congratulations",

    "/create-profile/employer/professional-info",
  ];

  const pathname = req.nextUrl.pathname;

  if (!req.auth && !pathname.startsWith("/signin")) {
    console.log("redirected to signin again");
    const loginUrl = new URL("/signin", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

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
    return NextResponse.next();
  }

  // Check for employer role access
  if (employerRoutes.some((route) => pathname.includes(route))) {
    if (!userRoles.includes(Role.EMPLOYER)) {
      console.log("Access denied: User is not an employer");
      const loginUrl = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|cfa_images|favicon.ico).*)"],
};