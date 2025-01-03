import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { Container, Typography, List, ListItem, ListItemText, Select, MenuItem } from '@mui/material';
import socket from '../services/socket';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/orders/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();

    socket.on('orderStatusUpdate', (updatedOrder) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === updatedOrder._id ? updatedOrder : order))
      );
    });

    return () => {
      socket.off('orderStatusUpdate');
    };
  }, [user]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/orders/${orderId}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Order status updated:', response.data);
      setOrders(orders.map(order => order._id === orderId ? response.data : order));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        All Orders
      </Typography>
      <List>
        {orders.map((order) => (
          <ListItem key={order._id}>
            <ListItemText
              primary={`Order #${order._id} by ${order.userId.name} (${order.userId.email})`}
              secondary={`Total: $${order.total.toFixed(2)} - Status: ${order.status}`}
            />
            <List>
              {order.menuItemIds.map((menuItem) => (
                <ListItem key={menuItem._id}>
                  <ListItemText primary={menuItem.name} secondary={`$${menuItem.price}`} />
                </ListItem>
              ))}
            </List>
            <Select
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Preparing">Preparing</MenuItem>
              <MenuItem value="Out for Delivery">Out for Delivery</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
            </Select>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AllOrders;