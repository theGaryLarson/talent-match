import { auth } from "@/auth";
import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";

export default auth(async (req) => {
  const token = await getToken(req);

  if (!token && req.nextUrl.pathname !== "/login") {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  if (token) {
    const userRole = token.role;

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

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};