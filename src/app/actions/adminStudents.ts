'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function createStudent(formData: FormData) {
  const email = formData.get('email') as string;
  const fullName = formData.get('fullName') as string;
  const phone = formData.get('phone') as string;
  const password = formData.get('password') as string;
  // Fallback to generating a secure random password if none is provided
  const securePassword = password || Math.random().toString(36).slice(-12) + "A1!";

  if (!email || !fullName) {
    return { error: 'Email and Full Name are required' };
  }

  const supabaseAdmin = createAdminClient();

  // Create the user in Auth (this triggers handle_new_user which inserts into public.users)
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: email,
    password: securePassword,
    phone: phone || undefined,
    email_confirm: true, // Automatically confirm email since admin created them
    user_metadata: {
      full_name: fullName,
      status: 'Active'
    }
  });

  if (error) {
    console.error("Error creating student:", error);
    return { error: error.message };
  }

  revalidatePath('/admin/students');
  return { success: true, user: data.user };
}
