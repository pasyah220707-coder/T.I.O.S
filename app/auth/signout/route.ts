import { createClient } from "../../../lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Proses Logout: Supabase akan menghapus cookies session dari browser
  await supabase.auth.signOut();

  // Redirect kembali ke halaman login setelah logout berhasil
  return NextResponse.redirect(new URL("/login", request.url), {
    status: 302,
  });
}
