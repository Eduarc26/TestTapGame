import { NextResponse, userAgent } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { device } = userAgent(request);
  const mobile = device.type === "mobile";
  if (request.url.includes("/app/desktop") && mobile)
    return NextResponse.redirect(new URL("/", request.url));
  if (request.url.includes("/app/desktop") && !mobile)
    return NextResponse.next();
  // if (!mobile) {
  // return NextResponse.redirect(new URL("/app/desktop", request.url));
  // }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/earn", "/app/desktop", "/boosts"],
};
