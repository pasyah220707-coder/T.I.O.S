import Link from 'next/link'

export default function PeraturanPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Peraturan Komunitas
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Harap dibaca dan dipatuhi demi kenyamanan bersama.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Peraturan Umum</h2>
            <ol className="list-decimal list-inside space-y-2 text-slate-700">
              <li>Saling menghormati antar sesama anggota.</li>
              <li>Dilarang melakukan spamming dalam bentuk apapun di grup chat.</li>
              <li>Dilarang menyebarkan konten SARA, pornografi, atau kekerasan.</li>
              <li>Jaga nama baik komunitas T.I.O.S di dalam dan di luar game.</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Peraturan Roleplay</h2>
            <ol className="list-decimal list-inside space-y-2 text-slate-700">
              <li>Ikuti alur cerita yang sedang berjalan.</li>
              <li>Gunakan karakter yang sesuai dengan tema sekolah.</li>
              <li>Hindari OOC (Out of Character) di area roleplay utama.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
