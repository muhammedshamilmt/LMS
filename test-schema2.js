require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.IMAGEKIT_PRIVATE_KEY);
async function run() {
  const { data: mods } = await supabase.from('course_modules').select('duration').limit(5);
  console.log("Mods duration:", mods);
}
run();
