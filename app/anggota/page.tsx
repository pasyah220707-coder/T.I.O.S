import { createClient } from "../../lib/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AnggotaList() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Ambil user yang sudah disetujui (Active Members)
  const { data: members } = await supabase
    .from("profiles")
    .select("username, role, created_at")
    .eq("is_approved", true)
    .order("created_at", { ascending: true });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Daftar Anggota
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Keluarga besar komunitas T.I.O.S
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members?.map((member: any) => (
            <Link 
              href={`/anggota/${member.username}`} 
              key={member.username}
              className="group block"
            >
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col items-center text-center transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                <div className="h-20 w-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-indigo-200">
                  <span className="text-2xl font-bold text-blue-600">
                    {member.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 truncate w-full">
                  {member.username}
                </h3>
                
                <span className={`mt-2 px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wide ${
                  member.role === 'admin' ? 'text-purple-600 bg-purple-50' : 'text-slate-500 bg-slate-100'
                }`}>
                  {member.role}
                </span>

                <p className="mt-4 text-xs text-slate-400">
                  Bergabung {new Date(member.created_at).getFullYear()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
