import { auth } from "@/auth";
import { NextResponse } from 'next/server';

export default auth((req) => {

  if (!req.auth && req.nextUrl.pathname !== "/signin") {
    console.log("redirected to signin again");
    const loginUrl = new URL("/signin", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  if (req.auth && req.nextUrl.pathname === "/signin") {
    console.log("logged in, redirecting to dashboard");
    const loginUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

/**
    // Allow navigation within employer or jobseeker paths
    if (userRole === "EMPLOYER" && req.nextUrl.pathname.startsWith("/services/employers/")) {
      return NextResponse.next();
    }

    if (userRole === "JOBSEEKER" && req.nextUrl.pathname.startsWith("/services/jobseekers/")) {
      return NextResponse.next();
    }

    // This should re-route people to the login page if they don't have a role and try to access something
    if (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/login") {
      if (userRole === "EMPLOYER") {
        const employerDashboardUrl = new URL("/services/employers/dashboard", req.nextUrl.origin);
        return NextResponse.redirect(employerDashboardUrl);
      }

      if (userRole === "JOBSEEKER") {
        const jobseekerDashboardUrl = new URL("/services/jobseekers/dashboard", req.nextUrl.origin);
        return NextResponse.redirect(jobseekerDashboardUrl);
      }
    }
  }
  */
}

);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};