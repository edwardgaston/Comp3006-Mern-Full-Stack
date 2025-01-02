// filepath: /d:/Coding Projects/Comp3006 Full Stack Development/Comp3006-Mern-Full-Stack/backend/scripts/createAdmin.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/userModels.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const hashedPassword = await bcrypt.hash('adminpassword', 10);
    const admin = new User({
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });
    await admin.save();
    console.log('Admin account created');
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
};

createAdmin();