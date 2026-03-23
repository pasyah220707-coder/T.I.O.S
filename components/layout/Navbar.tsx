import Link from 'next/link'
import { createClient } from '../../lib/supabase/server'
import { cookies } from 'next/headers'

export default async function Navbar() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  // Cek user yang sedang login
  const { data: { user } } = await supabase.auth.getUser()

  // Tentukan arah tombol profil (Admin ke /admin, Member ke /dashboard)
  let dashboardHref = '/dashboard'
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    
    if (profile?.role === 'admin') {
      dashboardHref = '/admin'
    }
  }

  return (
    <nav className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Area */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
              T
            </div>
            <Link href="/" className="font-bold text-xl tracking-wider hover:text-blue-400 transition-colors">
              T.I.O.S
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="hover:bg-slate-800 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Beranda
              </Link>
              <Link href="/tentang-kami" className="hover:bg-slate-800 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Tentang Kami
              </Link>
              <Link href="/peraturan" className="hover:bg-slate-800 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Peraturan
              </Link>
              <Link href="/anggota" className="hover:bg-slate-800 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Anggota
              </Link>
              <Link href="/galeri" className="hover:bg-slate-800 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Galeri
              </Link>
            </div>
          </div>

          {/* Login/Register Area */}
          <div className="flex gap-2 items-center">
            {user ? (
              <>
                <Link href={dashboardHref} className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Profil
                </Link>
                <form action="/auth/signout" method="post">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-lg shadow-red-900/20">
                    Keluar
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Login
                </Link>
                <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-lg shadow-blue-900/20">
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
