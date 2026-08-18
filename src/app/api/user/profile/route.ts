import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export async function PUT(request: Request) {
  try {
    const supabaseServer = await createClient();
    const { data: { user } } = await supabaseServer.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const body = await request.json();
    const { avatar_url, full_name, email } = body;
    
    const supabase = createAdminClient();
    
    const updatePayload: any = {};
    if (avatar_url !== undefined) updatePayload.avatar_url = avatar_url;
    if (full_name !== undefined) updatePayload.full_name = full_name;
    if (email !== undefined) updatePayload.email = email;

    const { error } = await supabase.from('users').update(updatePayload).eq('id', user.id);
    
    if (error) throw error;
    
    // Also update auth user metadata as fallback
    await supabase.auth.admin.updateUserById(user.id, {
      user_metadata: { ...user.user_metadata, ...updatePayload }
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
