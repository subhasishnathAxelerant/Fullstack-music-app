import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// following pages would be protected.
const signedinPages = ["/", "/playlist", "/library"];
/*
Middleware allows you to run code before a request is completed.
Then, based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.
Middleware will execute before _app.tsx
*/
export default function middleware(req: NextRequest) {
  // we're searching, if any path matches the above array items
  // Given a request to /playlist, pathname is /playlist
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    // retriving our token with our cookie name
    const token = req.cookies.SUBHASISH_ACCESS_TOKEN;
    // if no token is found,
    if (!token) {
      // we will redirect to signin page.
      return NextResponse.redirect("/signin");
    }
  }
}
