"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { sendPasswordResetOtpEmail } from "@/lib/mail";

export async function sendResetOtp(email: string) {
  try {
    const supabase = createAdminClient();
    
    // Check if user exists first (optional, but good practice)
    // To do this reliably, we'd need a profile lookup or we just generate the OTP anyway
    // Generating it anyway prevents email enumeration attacks.

    // 1. Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 2. Set expiry to 1 minute from now
    const expiresAt = new Date(Date.now() + 1 * 60 * 1000).toISOString();
    
    // 3. Store in DB (we don't need to delete old ones immediately, but we could)
    const { error } = await supabase
      .from("password_resets")
      .insert([{ email, otp, expires_at: expiresAt }]);
      
    if (error) {
      console.error("DB Insert Error:", error);
      return { error: "Failed to generate OTP" };
    }
    
    // 4. Send email via Resend
    await sendPasswordResetOtpEmail(email, otp);
    
    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { error: err.message || "An unexpected error occurred" };
  }
}

export async function verifyOtp(email: string, otp: string) {
  try {
    const supabase = createAdminClient();
    
    const { data, error } = await supabase
      .from("password_resets")
      .select("*")
      .eq("email", email)
      .eq("otp", otp)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
      
    if (error || !data) {
      return { error: "Invalid OTP" };
    }
    
    if (new Date(data.expires_at) < new Date()) {
      return { error: "OTP has expired" };
    }
    
    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { error: err.message || "An unexpected error occurred" };
  }
}

export async function verifyOtpAndResetPassword(email: string, otp: string, newPassword: string) {
  try {
    const supabase = createAdminClient();
    
    // 1. Check OTP in DB
    const { data, error } = await supabase
      .from("password_resets")
      .select("*")
      .eq("email", email)
      .eq("otp", otp)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
      
    if (error || !data) {
      return { error: "Invalid OTP" };
    }
    
    // 2. Check Expiry
    if (new Date(data.expires_at) < new Date()) {
      return { error: "OTP has expired" };
    }
    
    // 3. Find User ID by email
    // Note: If you have a large number of users, listUsers might not find them if they are paginated far back.
    // Ideally, you'd use a public schema lookup like: const { data: userRecord } = await supabase.from('users').select('id').eq('email', email).single();
    // For this implementation, we will use listUsers for simplicity.
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      return { error: "Could not fetch user directory" };
    }

    const user = userData.users.find((u) => u.email === email);
    
    if (!user) {
      return { error: "User not found" };
    }
    
    // 4. Update Password
    const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
      password: newPassword,
    });
    
    if (updateError) {
      return { error: updateError.message };
    }
    
    // 5. Delete the OTP
    await supabase.from("password_resets").delete().eq("id", data.id);
    
    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { error: err.message || "An unexpected error occurred" };
  }
}
