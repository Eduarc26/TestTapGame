import { NextResponse, userAgent } from "next/server";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { verifyTelegramWebAppData } from "./actions/verify-telegram-data";

export async function middleware(request: NextRequest) {
  const { device } = userAgent(request);
  const mobile = device.type === "mobile";
  if (request.url.includes("/api/launch")) {
    return NextResponse.next();
  }
  if (request.url.includes("/app/desktop") && mobile)
    return NextResponse.redirect(new URL("/", request.url));
  if (request.url.includes("/app/desktop") && !mobile)
    return NextResponse.next();
  if (!mobile) {
    return NextResponse.redirect(new URL("/app/desktop", request.url));
  }

  if (request.url.includes("/api")) {
    const headersList = headers();
    const authData = headersList.get("x-auth-data");
    const result = await verifyTelegramWebAppData(authData ?? "");
    if (!result.success || !result.userId) {
      return NextResponse.error();
    }
    const ip = headersList.get("x-forwarded-for");
    const userId = result.userId.toString();
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("X-Forwarded-For", ip ?? "");
    requestHeaders.set("x-user-id", userId);
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/earn", "/app/desktop", "/boosts", "/api/:path*"],
};
