import React, { useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Typography, List, ListItem, ListItemText } from '@mui/material';

const OrderForm = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const menuItemIds = cart.map(item => item._id);
      const response = await axios.post('http://localhost:5000/api/orders', 
        { menuItemIds },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Order created:', response.data);
      setCart([]); // Clear the cart after order is created
      navigate('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const calculateTotal = () => {
    const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    console.log('Cart items:', cart); // Debugging log
    console.log('Total:', total); // Debugging log
    return total.toFixed(2);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Review Your Order
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="h6" component="div">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <List>
            {cart.map((item, index) => (
              <ListItem key={`${item._id}-${index}`}>
                <ListItemText primary={item.name} secondary={`$${item.price} x ${item.quantity || 1}`} />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" component="div">
            Total: ${calculateTotal()}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Place Order
          </Button>
        </>
      )}
    </Container>
  );
};

export default OrderForm;