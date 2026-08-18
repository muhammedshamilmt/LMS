'use server'

import { cookies } from 'next/headers'
import { verifyAdminPassword } from '@/lib/adminAuth'

export async function loginAdmin(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL

  if (!adminEmail) {
    console.error("ADMIN_EMAIL is not set in environment variables")
    return { is_admin: false }
  }

  if (email === adminEmail && verifyAdminPassword(password)) {
    // Set an HTTP-only secure cookie for the admin session
    const cookieStore = await cookies()
    cookieStore.set('admin_token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    })
    return { is_admin: true }
  }

  return { is_admin: false }
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_token')
}
