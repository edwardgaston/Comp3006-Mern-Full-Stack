import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import CartIcon from './CartIcon';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My Store
        </Typography>
        <CartIcon />
      </Toolbar>
    </AppBar>
  );
};

export default Header;