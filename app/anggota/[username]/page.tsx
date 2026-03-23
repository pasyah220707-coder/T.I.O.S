import { createClient } from "../../../lib/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";

// Pastikan halaman selalu mengambil data terbaru
export const dynamic = "force-dynamic";

interface PageProps {
  params: {
    username: string;
  };
}

export default async function MemberProfile({ params }: PageProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  // Decode username dari URL (misal spasi jadi %20)
  const username = decodeURIComponent(params.username);

  // Ambil data member berdasarkan username
  const { data: profile } = await supabase
    .from("profiles")
    .select("username, role, created_at, email, is_approved")
    .eq("username", username)
    .single();

  // Jika user tidak ditemukan, tampilkan 404
  if (!profile) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
        
        {/* Header / Cover Profile */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-32 md:h-48 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="h-24 w-24 md:h-32 md:w-32 bg-white rounded-full border-4 border-white flex items-center justify-center shadow-md text-slate-300 font-bold text-4xl md:text-5xl">
              {profile.username.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Info Profile */}
        <div className="pt-16 pb-8 px-8">
          <div className="flex justify-between items-start flex-col md:flex-row gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                {profile.username}
              </h1>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold uppercase ${
                profile.role === 'admin' 
                  ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                  : 'bg-blue-100 text-blue-700 border border-blue-200'
              }`}>
                {profile.role}
              </span>
            </div>
            
            <Link href="/anggota" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors">
              &larr; Kembali ke Daftar
            </Link>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Bergabung Sejak
              </h3>
              <p className="text-base text-slate-700 font-medium">
                {new Date(profile.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </p>
            </div>
            
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Status Keanggotaan
              </h3>
              <p className="text-base text-slate-700 font-medium">
                {profile.is_approved ? "Anggota Resmi T.I.O.S" : "Menunggu Verifikasi"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
