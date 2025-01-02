import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/userModels.js';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the root directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const createAdmin = async () => {
  try {
    const dbUri = process.env.DB_URI;
    if (!dbUri) {
      throw new Error('DB_URI is not defined in the environment variables');
    }
    await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    
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