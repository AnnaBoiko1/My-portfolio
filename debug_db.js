import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '/Users/annaboiko/code/my-portfolio/.env.local' });

console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Loaded (length " + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length + ")" : "Not loaded");

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
  const { data, error } = await supabase.from('milestones').select('*');
  if (error) {
    console.error("Error query:", error.message);
  } else {
    console.log("Success! Count:", data.length);
    console.log(JSON.stringify(data[0], null, 2));
  }
}

check();
