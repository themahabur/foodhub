import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";

const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/",
  "/explore",
  "/restaurants",
  "/offers",
];

const ALLOWED_ROLES = ["CUSTOMER", "ADMIN", "PROVIDER"];

function isPublic(pathname: string) {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Public routes
  if (isPublic(pathname)) {
    return NextResponse.next();
  }

  // 2. Get session (your service)
  const { data: userData } = await userService.getSession();

  // 3. Not logged in
  if (!userData) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. Role check
  const role = userData?.user?.role;

  if (!role || !ALLOWED_ROLES.includes(role)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};