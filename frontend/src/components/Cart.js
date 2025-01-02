import React, { useContext } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>
      <List>
        {cart.map((item, index) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={`$${item.price}`} />
            <Button variant="contained" color="secondary" onClick={() => removeFromCart(item)}>
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" component="div">
        Total: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/order')}>
        Checkout
      </Button>
    </Container>
  );
}

export default Cart;