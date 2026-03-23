import Link from "next/link";

export default function Pending() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center">
        {/* Icon */}
        <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl">⏳</span>
        </div>

        {/* Content */}
        <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
          Menunggu Verifikasi
        </h2>
        <p className="mt-4 text-sm text-slate-600 leading-relaxed">
          Terima kasih telah mendaftar. Akun Anda saat ini sedang dalam antrean
          verifikasi oleh Admin T.I.O.S. Silakan cek kembali secara berkala.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            &larr; Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}