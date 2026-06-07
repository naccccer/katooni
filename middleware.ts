import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  // The OVALA landing lives at `/` and is not locale-prefixed.
  // Bypass next-intl for the root so the new landing page is served as-is.
  if (req.nextUrl.pathname === "/") {
    return NextResponse.next();
  }
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // Skip Next internals, API, _next, _vercel, and static files.
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
