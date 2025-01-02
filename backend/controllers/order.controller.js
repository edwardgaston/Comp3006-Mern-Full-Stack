import Order from '../models/order.models.js';

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createOrder = async (req, res) => {
  const { items, total, customer } = req.body;
  try {
    const newOrder = new Order({ items, total, customer });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { items, total, customer, status } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, { items, total, customer, status }, { new: true });
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndDelete(id);
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};