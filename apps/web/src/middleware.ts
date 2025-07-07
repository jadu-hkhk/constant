import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtected = path.startsWith("/app")
  const isAuth = path.startsWith("/signin") || path.startsWith("/signup")
  const hasToken = request.cookies.has("token")

  if (isProtected && !hasToken) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  if (isAuth && hasToken) {
    return NextResponse.redirect(new URL("/app/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
