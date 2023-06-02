import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const redirectFactory = (request: NextRequest) => (newPath: string) => {
  const pathname = new URL(request.url).pathname;
  if (pathname === newPath) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL(newPath, request.url));
};

const middleware = async (request: NextRequest) => {
  const pathname = new URL(request.url).pathname;
  const redirect = redirectFactory(request);

  if (pathname.includes("admin") && request.cookies.get("bvj-secure")?.value !== "1") {
    return redirect("/admin/login");
  }

  if (request.cookies.get("bvj")?.value !== "1") {
    return redirect("/guest");
  }

  if (pathname === "/guest") {
    return redirect("/");
  }
  return NextResponse.next();
};

export default middleware;

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
