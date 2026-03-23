import Link from 'next/link'

export default function Galeri() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Galeri Kegiatan
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Dokumentasi keseruan dan kenangan di T.I.O.S
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder untuk foto */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden aspect-video flex items-center justify-center border border-slate-200">
            <span className="text-slate-400">Foto akan segera hadir</span>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden aspect-video flex items-center justify-center border border-slate-200">
            <span className="text-slate-400">Foto akan segera hadir</span>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            &larr; Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
