import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String }
});

const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);

export default MenuItem;