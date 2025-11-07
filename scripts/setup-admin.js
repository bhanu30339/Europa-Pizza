const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupAdmin() {
  try {
    const email = 'admin@test.com';
    const password = 'admin123';
    const name = 'Admin User';

    const passwordHash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('admins')
      .upsert(
        { email, password_hash: passwordHash, name },
        { onConflict: 'email' }
      )
      .select();

    if (error) {
      console.error('Error creating admin:', error);
      process.exit(1);
    }

    console.log('\n✅ Admin user created successfully!\n');
    console.log('Login credentials:');
    console.log('Email: admin@test.com');
    console.log('Password: admin123\n');
    console.log('Access the admin dashboard at: http://localhost:3000/admin/login\n');
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
}

setupAdmin();
