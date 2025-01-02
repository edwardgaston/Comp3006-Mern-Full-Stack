import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Typography, List, ListItem, ListItemText } from '@mui/material';

function DeleteMenuItem() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menu');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      setMenuItems(menuItems.filter((item) => item._id !== id));
      alert('Menu item deleted successfully');
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Delete Menu Item
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item._id}>
            <ListItemText primary={item.name} secondary={`$${item.price}`} />
            <Button variant="contained" color="secondary" onClick={() => handleDelete(item._id)}>
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default DeleteMenuItem;