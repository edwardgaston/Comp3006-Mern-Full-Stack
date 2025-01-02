import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Orders
      </Typography>
      <List>
        {orders.map((order) => (
          <ListItem key={order._id}>
            <ListItemText
              primary={`Order #${order._id}`}
              secondary={`Total: $${order.total.toFixed(2)} - Status: ${order.status}`}
            />
            <List>
              {order.menuItemIds.map((menuItem) => (
                <ListItem key={menuItem._id}>
                  <ListItemText primary={menuItem.name} secondary={`$${menuItem.price}`} />
                </ListItem>
              ))}
            </List>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default OrderList;