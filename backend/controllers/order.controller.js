import Order from '../models/order.models.js';
import MenuItem from '../models/menu.item.model.js';
import Notification from '../models/notification.model.js';
import { emitOrderStatusUpdate } from '../server.js';

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate('userId', 'name email')
      .populate('menuItemIds');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('menuItemIds');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate('menuItemIds');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createOrder = async (req, res) => {
  const { menuItemIds } = req.body;
  try {
    const menuItems = await MenuItem.find({ _id: { $in: menuItemIds } });
    const total = menuItems.reduce((sum, item) => sum + item.price, 0);

    const newOrder = new Order({ menuItemIds, total, userId: req.user._id });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true }).populate('userId', 'name email');
    
    const notification = new Notification({
      userId: updatedOrder.userId._id,
      message: `Order #${updatedOrder._id} status updated to ${status}`,
    });
    await notification.save();

    emitOrderStatusUpdate({
      message: notification.message,
      userId: notification.userId,
    });

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