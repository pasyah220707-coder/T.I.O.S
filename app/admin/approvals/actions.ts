// c:\Project\TIOS\app\admin\approvals\actions.ts
'use server'

import { createClient } from "../../../lib/supabase/server"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function approveUser(formData: FormData) {
  const userId = formData.get('userId') as string
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // Update status menjadi approved
  const { error } = await supabase
    .from('profiles')
    .update({ is_approved: true })
    .eq('id', userId)

  if (error) {
    console.error('Error approving user:', error)
    return
  }

  // Refresh halaman agar data terbaru muncul
  revalidatePath('/admin/approvals')
  revalidatePath('/admin/users')
}

export async function rejectUser(formData: FormData) {
  const userId = formData.get('userId') as string
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // Hapus profile (Tolak pendaftaran)
  // Ini akan menghapus user dari tabel profiles sehingga hilang dari list pending
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId)

  if (error) {
    console.error('Error rejecting user:', error)
    return
  }

  revalidatePath('/admin/approvals')
  revalidatePath('/admin/users')
}
