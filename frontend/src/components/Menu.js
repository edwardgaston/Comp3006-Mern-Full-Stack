import React, { useEffect, useState, useContext } from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { getMenuItems } from '../services/api';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

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
    <div>
      {user && user.role === 'admin' && (
        <Button variant="contained" color="primary" component={Link} to="/add-menu-item">
          Add Menu Item
        </Button>
      )}
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
                {user && user.role === 'admin' && (
                  <Button variant="contained" color="secondary" component={Link} to={`/edit-menu-item/${item._id}`}>
                    Edit
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Menu;