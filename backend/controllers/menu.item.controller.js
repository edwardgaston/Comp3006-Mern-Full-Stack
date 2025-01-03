import MenuItem from '../models/menu.item.model.js';

export const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const newItem = new MenuItem({ name, description, price, category });
    await newItem.save();
    res.status(201).json(newItem);
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

export const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMenuItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const menuItem = await MenuItem.findById(id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};