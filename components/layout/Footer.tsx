import Link from 'next/link'

export default function Footer() {
  // Simulasi data statistik
  const startYear = 2023
  const currentYear = new Date().getFullYear()
  const communityAge = currentYear - startYear + 1 

  const stats = [
    { label: 'Anggota Aktif', value: '120+' },
    { label: 'Tahun Berjalan', value: `${communityAge} Th` },
    { label: 'Total Kunjungan', value: '1.5k' },
  ]

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-wider">T.I.O.S</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              The International Organization School. Komunitas Pony Town yang mengedepankan persahabatan, kreativitas, dan roleplay sekolah yang menyenangkan.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 text-center md:text-left">Statistik Komunitas</h4>
            <div className="grid grid-cols-3 gap-4 text-center md:text-left">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col p-3 bg-slate-800 rounded-lg">
                  <span className="text-2xl font-bold text-blue-400">{stat.value}</span>
                  <span className="text-xs text-slate-500 uppercase">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end justify-center space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <Link href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <span className="font-bold text-xs">DC</span>
              </Link>
              <Link href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <span className="font-bold text-xs">TW</span>
              </Link>
              <Link href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <span className="font-bold text-xs">YT</span>
              </Link>
            </div>
            <p className="text-xs text-slate-500">
              &copy; {currentYear} T.I.O.S Community.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
