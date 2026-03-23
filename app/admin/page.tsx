import { createClient } from "../../lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Ambil data profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div className="p-8 border-b border-gray-200">
            {/* Header Dashboard */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Selamat Datang, {profile?.username || user.email}
                </h1>
                <p className="mt-2 text-slate-600">
                  Status:{" "}
                  <span className="font-semibold text-blue-600 uppercase">
                    {profile?.role}
                  </span>
                </p>
              </div>

              {/* Tombol Logout (Sementara pakai Link ke API route atau client component nanti) */}
              <form action="/auth/signout" method="post">
                <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                  Keluar
                </button>
              </form>
            </div>

            {/* Area Admin (Hanya muncul jika role admin) */}
            {profile?.role === "admin" && (
              <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                <h2 className="text-xl font-bold text-blue-900 mb-4">Panel Admin</h2>
                <p className="text-blue-700 mb-4">
                  Anda memiliki akses administrator.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/admin/users"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Kelola Member
                  </Link>
                  <Link
                    href="/admin/approvals"
                    className="bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Persetujuan Pending
                  </Link>
                </div>
              </div>
            )}

            {/* Konten Umum Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Pengumuman Terbaru
                </h3>
                <p className="text-slate-500">Belum ada pengumuman saat ini.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
