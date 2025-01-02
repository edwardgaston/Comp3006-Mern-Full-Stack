// filepath: /d:/Coding Projects/Comp3006 Full Stack Development/Comp3006-Mern-Full-Stack/backend/models/order.models.js
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true }],
  status: { type: String, enum: ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'], default: 'Pending' },
  total: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('Order', OrderSchema);