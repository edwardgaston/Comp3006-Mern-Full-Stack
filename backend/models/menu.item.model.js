// filepath: /d:/Coding Projects/Comp3006 Full Stack Development/Comp3006-Mern-Full-Stack/backend/models/menu.item.model.js
import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('MenuItem', MenuItemSchema);