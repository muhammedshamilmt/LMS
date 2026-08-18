require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.IMAGEKIT_PRIVATE_KEY);
async function run() {
  const { data, error } = await supabase.from('course_progress').select('*').limit(1);
  if (error) console.error(error);
  else console.log(data.length > 0 ? Object.keys(data[0]) : "No data, but query succeeded");
}
run();
