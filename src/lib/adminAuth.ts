export function verifyAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    console.error("ADMIN_PASSWORD environment variable is not set!");
    return false;
  }

  // Uses a simple time-constant comparison approach if needed, 
  // or simple strict equality for internal admin logic.
  return password === adminPassword;
}
