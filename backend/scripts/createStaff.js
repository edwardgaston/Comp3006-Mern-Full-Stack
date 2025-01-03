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

const createStaff = async () => {
  try {
    const dbUri = process.env.DB_URI;
    if (!dbUri) {
      throw new Error('DB_URI is not defined in the environment variables');
    }
    console.log('Connecting to MongoDB...');
    await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    
    const hashedPassword = await bcrypt.hash('staffpassword', 10);
    const staff = new User({
      name: 'Staff',
      email: 'staff@example.com',
      password: hashedPassword,
      role: 'staff'
    });
    await staff.save();
    console.log('Staff account created');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error creating staff account:', err);
    mongoose.disconnect();
  }
};

createStaff();