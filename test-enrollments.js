const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
async function run() {
  const { data, error } = await supabase.from('courses').select('id, thumbnail_url, promo_video_url').limit(3);
  console.log(data);
}
run();
async function check() { const { data, error } = await supabase.from('enrollments').select('*').limit(1); console.log('enrollments:', error ? error.message : data); const { data: p, error: pe } = await supabase.from('progress').select('*').limit(1); console.log('progress:', pe ? pe.message : p); } check();
