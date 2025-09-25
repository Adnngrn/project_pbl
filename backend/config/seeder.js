// seeder.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = 'admin@komunitas.com';
    const password = 'admin123';

    // cek admin
    if (await User.findOne({ email })) {
      console.log('⚠️ Admin sudah ada');
      return process.exit(0);
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name: 'Super Admin',
      handphone: '081234567890',
      gender: 'male',
      address: 'Jl. Admin No.1',
      email,
      password: hashed,
      role: 'admin',
      status: 'active'
    });

    console.log('✅ Admin berhasil dibuat');
    process.exit(0);
  } catch (err) {
    console.error('Seeder error:', err.message);
    process.exit(1);
  }
})();
