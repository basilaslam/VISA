import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isUserPublicPath = path === '/' || path === '/login'|| path === '/register'
    const isAdminPublicPath = path === '/' || path === '/admin/login'
    
    const token = request.cookies.get("token")?.value || ''
    const role = request.cookies.get("role")?.value || ''    
    if(path === '/dashboard' && role === "ADMIN"){
        return NextResponse.redirect(new URL('/admin/dashboard', request.nextUrl))

    }
    if(isUserPublicPath && token && role === "USER"){
        
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }
    
    if(isUserPublicPath && token && role === "ADMIN"){
        return NextResponse.redirect(new URL('/admin/dashboard', request.nextUrl))
    }
    
    if(!isUserPublicPath && !token && !role){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    if(token && !isAdminPublicPath && role === "ADMIN"){
        return NextResponse.redirect(new URL('/admin/dashboard', request.nextUrl))
    }

    if(path.includes('/admin/') && role !== "ADMIN" && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
    
    
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/login',
    '/register'
  ],
}