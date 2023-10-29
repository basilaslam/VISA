// middleware.js 

import { NextRequest, NextResponse } from "next/server"

export function middleware(request:NextRequest) {

    const token = request.cookies.get('token')?.value
    const role = request.cookies.get('role')?.value
  
    if(!token) {
      return redirectUser(request) 
    }
    console.log(token);
    
  
    if(role === 'USER' && request.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect('/dashboard')
    }

    if(role === 'ADMIN' && request.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(`${request.nextUrl.origin}/admin/login`)
    }
    if(role === 'ADMIN' && request.nextUrl.pathname.startsWith('/admin/login')) {
      return NextResponse.redirect(`${request.nextUrl.origin}/admin/dashboard`)
    }
    
    if(role === 'ADMIN' && request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect('/admin/dashboard')
    }
  
    return NextResponse.next()
  
  }
  
  function redirectUser(request:NextRequest) {
    if(request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(`${request.nextUrl.origin}/login`)
    }
  
    if(request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
      return NextResponse.redirect(`${request.nextUrl.origin}/admin/login`)
    }
  }
  
  export const config = {
    matcher: [
        '/',
        '/login',
        '/dashboard/:path*',
        '/admin/:path*',
      ]
  }