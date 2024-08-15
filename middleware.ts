import { auth } from "@/auth";
import { NextResponse } from 'next/server';

export default auth((req) => {
  console.log(req);
  const jobseekerRoutes = [
    "/services/jobseekers",
    "/services/jobseekers/[id]",
    "/services/jobseekers/dashboard",
    "/services/jobseekers/dashboard/(overview)",
    "/create-profile/jobseeker/complete",
    "/create-profile/jobseeker/disclosures",
    "/create-profile/jobseeker/education",
    "/create-profile/jobseeker/intro",
    "/create-profile/jobseeker/preferences",
    "/create-profile/jobseeker/showcase",
    "/create-profile/jobseeker/work-experience",
  ];

  const employerRoutes = [
    "/create-profile/employer",
    "/create-profile/employer/personal-info",
    "/create-profile/employer/company-info",
    "/create-profile/employer/professional-info",
  ];

  const pathname = req.nextUrl.pathname;

  if (!req.auth && !pathname.startsWith("/signin")) {
    console.log("redirected to signin again");
    const loginUrl = new URL("/signin", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  if (req.auth && pathname === "/signin") {
    console.log("logged in, redirecting to dashboard");
    const loginUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  const userRoles = req.auth?.user?.roles || [];

  // Check for jobseeker role access
  if (jobseekerRoutes.some((route) => pathname.includes(route))) {
    if (!userRoles.includes("jobseeker")) {
      console.log("Access denied: User is not a jobseeker");
      const loginUrl = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Check for employer role access
  if (employerRoutes.some((route) => pathname.includes(route))) {
    if (!userRoles.includes("employer")) {
      console.log("Access denied: User is not an employer");
      const loginUrl = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};