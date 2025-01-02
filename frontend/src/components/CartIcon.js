import React, { useContext } from 'react';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartIcon = () => {
  const { cart } = useContext(CartContext);

  return (
    <IconButton component={Link} to="/cart" color="inherit">
      <Badge badgeContent={cart.length} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default CartIcon;