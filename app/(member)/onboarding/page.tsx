"use client";

import { useState } from "react";
import { createClient } from "../../../lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleFinishOnboarding = async () => {
    setLoading(true);
    const supabase = createClient();
    
    // Ambil user saat ini
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Update status is_onboarded menjadi true
      const { error } = await supabase
        .from("profiles")
        .update({ is_onboarded: true })
        .eq("id", user.id);

      if (error) {
        alert("Terjadi kesalahan: " + error.message);
        setLoading(false);
        return;
      }

      // Refresh router untuk update middleware state dan pindah ke admin
      router.refresh();
      router.push("/admin"); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
          Selamat Datang!
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Akun Anda telah disetujui. Klik tombol di bawah untuk menyelesaikan proses dan masuk ke Dashboard.
        </p>

        <button
          onClick={handleFinishOnboarding}
          disabled={loading}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
        >
          {loading ? "Memproses..." : "Masuk Dashboard"}
        </button>
      </div>
    </div>
  );
}
