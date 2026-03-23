import { createClient } from "../../../lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function MemberDashboard() {
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

  // Pengaman: Jika admin nyasar ke sini, lempar ke halaman admin
  if (profile?.role === 'admin') {
    redirect('/admin');
  }

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
                  <span className="font-semibold text-green-600 uppercase">
                    {profile?.role}
                  </span>
                </p>
              </div>

              <form action="/auth/signout" method="post">
                <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                  Keluar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}