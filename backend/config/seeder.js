// seeder.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

async function seedAdmin() {
  try {
    // konek ke MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    const email = 'admin@komunitas.com';
    const password = 'admin123';

    // cek apakah sudah ada admin
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('⚠️ Admin sudah ada:', existingAdmin.email);
      process.exit(0);
    }

    // buat password hash
    const hashed = await bcrypt.hash(password, 10);

    // insert admin baru
    const admin = await User.create({
      name: 'Super Admin',
      email,
      password: hashed,
      role: 'admin',
      status: 'active'
    });

    console.log('✅ Admin berhasil dibuat:');
    console.log(`   Email   : ${email}`);
    console.log(`   Password: ${password}`);
    process.exit(0);
  } catch (err) {
    console.error('Seeder error:', err);
    process.exit(1);
  }
}

seedAdmin();
