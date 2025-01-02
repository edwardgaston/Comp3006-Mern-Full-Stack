import React, { useEffect, useState, useContext } from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { getMenuItems } from '../services/api';
import { CartContext } from '../context/CartContext';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await getMenuItems();
        setMenuItems(items);
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
      }
    };
    fetchMenuItems();
  }, []);

  return (
    <Grid container spacing={3}>
      {menuItems.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${item.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={() => addToCart(item)}>
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Menu;