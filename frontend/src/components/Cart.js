// filepath: /d:/Coding Projects/Comp3006 Full Stack Development/Comp3006-Mern-Full-Stack/frontend/src/components/Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>
      <List>
        {cart.map((item, index) => (
          <ListItem key={index}>
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
      <Button variant="contained" color="primary">
        Checkout
      </Button>
    </Container>
  );
}

export default Cart;