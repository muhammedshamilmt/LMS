import { resend } from "./resend";

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string
) => {
  await resend.emails.send({
    from: "noreply@verification.innerhealing.school",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`
  });
};

export const sendPasswordResetOtpEmail = async (
  email: string,
  otp: string
) => {
  await resend.emails.send({
    from: "noreply@verification.innerhealing.school",
    to: email,
    subject: "Your Password Reset Code",
    html: `
      <h2>Password Reset Request</h2>
      <p>Your 6-digit password reset code is: <strong>${otp}</strong></p>
      <p>This code will expire in 1 minute.</p>
    `
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: "noreply@verification.innerhealing.school",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
  });
};

export const sendVerificationEmail = async (
  email: string, 
  token: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "noreply@verification.innerhealing.school",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
  });
};
