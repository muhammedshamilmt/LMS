const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
async function run() {
  const { data, error } = await supabase.from('courses').select('id, title, thumbnail_url, author_avatar_url, promo_video_url').limit(3);
  console.log(JSON.stringify(data, null, 2));
}
run();
