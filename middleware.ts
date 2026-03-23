import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 1. Cek User Login
  const { data: { user } } = await supabase.auth.getUser()

  // URL yang sedang diakses
  const url = request.nextUrl.clone()
  const pathname = url.pathname

  // Daftar halaman yang WAJIB login
  const protectedRoutes = ['/dashboard', '/onboarding', '/pending', '/admin']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Daftar halaman Auth (Login/Register)
  const authRoutes = ['/login', '/register']
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  // JIKA BELUM LOGIN tapi maksa masuk halaman member -> Tendang ke Login
  if (!user && isProtectedRoute) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // JIKA SUDAH LOGIN tapi masuk halaman Login/Register -> Tendang ke Dashboard
  if (user && isAuthRoute) {
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // JIKA SUDAH LOGIN, kita cek status di database profile
  if (user && isProtectedRoute) {
    // Ambil data profil
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_approved, is_onboarded, role')
      .eq('id', user.id)
      .single()

    // LOGIKA REDIRECT (Hanya berlaku jika user mengakses dashboard/member area)
    if (profile) {
      
      // A. Cek Admin
      if (pathname.startsWith('/admin') && profile.role !== 'admin') {
        url.pathname = '/dashboard' // User biasa gaboleh masuk admin
        return NextResponse.redirect(url)
      }

      // Jika Admin mencoba masuk ke dashboard member, arahkan ke panel admin
      if (pathname.startsWith('/dashboard') && profile.role === 'admin') {
        url.pathname = '/admin'
        return NextResponse.redirect(url)
      }

      // B. Cek Approval (Pending)
      if (!profile.is_approved && !pathname.startsWith('/pending')) {
        url.pathname = '/pending'
        return NextResponse.redirect(url)
      }

      // C. Cek Onboarding (Data belum lengkap)
      // Hanya redirect ke onboarding jika sudah diapprove TAPI belum onboard
      if (profile.is_approved && !profile.is_onboarded && !pathname.startsWith('/onboarding')) {
        url.pathname = '/onboarding'
        return NextResponse.redirect(url)
      }
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}