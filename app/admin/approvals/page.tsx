import { createClient } from "../../../lib/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { approveUser, rejectUser } from "./actions";

export const dynamic = "force-dynamic";

export default async function ApprovalsPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Ambil user yang BELUM disetujui (is_approved = false)
  const { data: pendingUsers } = await supabase
    .from("profiles")
    .select("*")
    .eq("is_approved", false)
    .order("created_at", { ascending: true }); // Yang daftar duluan ada di atas

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Persetujuan Member</h1>
          <Link href="/admin" className="text-blue-600 hover:text-blue-800 font-medium">
            &larr; Kembali ke Dashboard
          </Link>
        </div>

        {/* Tabel Pending */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {pendingUsers && pendingUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal Daftar
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingUsers.map((user: any) => (
                    <tr key={user.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleDateString("id-ID", {
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <form action={approveUser}>
                            <input type="hidden" name="userId" value={user.id} />
                            <button type="submit" className="text-green-700 bg-green-100 hover:bg-green-200 px-3 py-1 rounded-md text-xs font-semibold transition-colors">
                              Terima
                            </button>
                          </form>
                          <form action={rejectUser}>
                            <input type="hidden" name="userId" value={user.id} />
                            <button type="submit" className="text-red-700 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md text-xs font-semibold transition-colors">
                              Tolak
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="mx-auto h-12 w-12 text-gray-400">
                ✓
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Semua bersih!</h3>
              <p className="mt-1 text-sm text-gray-500">Tidak ada member baru yang menunggu persetujuan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
