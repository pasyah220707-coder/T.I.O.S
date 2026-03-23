import Link from 'next/link'

export default function TentangKami() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Tentang Kami
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            The International Organization School (T.I.O.S)
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-slate-700 leading-relaxed">
          <p>
            T.I.O.S adalah komunitas Pony Town yang berfokus pada roleplay sekolah. 
            Kami menyediakan lingkungan yang aman, menyenangkan, dan terorganisir bagi 
            para pemain untuk berinteraksi, belajar, dan bermain bersama.
          </p>
          <p>
            Didirikan pada tahun 2023, kami terus berkembang dengan berbagai kegiatan 
            rutin seperti kelas, ekskul, dan event spesial.
          </p>
          
          <div className="pt-6 text-center">
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
              &larr; Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}