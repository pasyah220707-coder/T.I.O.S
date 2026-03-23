import Link from "next/link";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* SECTION 1: HIGHLIGHT FOTO (HERO) */}
      <section className="relative w-full h-[600px] bg-slate-900 overflow-hidden">
        
        {/* Background Grid Images (Placeholder Area) */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-1 opacity-60">
          <div className="bg-blue-900/50 h-full w-full"></div>
          <div className="bg-sky-900/50 h-full w-full"></div>
          <div className="bg-cyan-900/50 h-full w-full hidden md:block"></div>
          <div className="bg-indigo-900/50 h-full w-full hidden md:block"></div>
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

        {/* Konten Utama Hero */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto pt-20">
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold border border-blue-500/30">
              Pony Town Community
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-lg">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">T.I.O.S</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
              Tempat di mana kreativitas dan persahabatan bertemu. Jadilah bagian dari sekolah paling berwarna di Pony Town!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link 
                href="/register" 
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all hover:scale-105 shadow-xl shadow-blue-900/50"
              >
                Daftar Sekarang
              </Link>
              <Link 
                href="/galeri" 
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-full font-bold transition-all border border-white/20"
              >
                Lihat Galeri
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ORIENTASI */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl shadow-inner flex items-center justify-center border border-slate-200">
                <p className="text-slate-400 font-medium">Foto Kegiatan Orientasi</p>
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Apa itu T.I.O.S?
              </h2>
              <div className="w-20 h-1 bg-blue-600 rounded-full"></div>
              <p className="text-slate-600 text-lg leading-relaxed">
                The International Organization School (T.I.O.S) bukan sekadar tempat berkumpul biasa. Kami adalah keluarga besar yang terorganisir di Pony Town.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                Visi kami adalah menciptakan lingkungan bermain yang aman, tertib, namun tetap seru bagi semua kalangan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FOOTER */}
      <Footer />
    </div>
  );
}
