import MenuItem from '../models/menu.item.model.js';

export const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createMenuItem = async (req, res) => {
  const { name, description, price, category } = req.body;
  try {
    const newMenuItem = new MenuItem({ name, description, price, category });
    await newMenuItem.save();
    res.status(201).json(newMenuItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;
  try {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, { name, description, price, category }, { new: true });
    res.json(updatedMenuItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    await MenuItem.findByIdAndDelete(id);
    res.json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};