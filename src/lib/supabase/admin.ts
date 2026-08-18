import { createClient } from '@supabase/supabase-js';

// Note: This client uses the SERVICE ROLE KEY. 
// It bypasses Row Level Security (RLS) entirely.
// NEVER use this client in the browser or in unauthenticated server contexts.
// Only use this in secure server actions or protected API routes.

export const createAdminClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      }
    }
  );
};
