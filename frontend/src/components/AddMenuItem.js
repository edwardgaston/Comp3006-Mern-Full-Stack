import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AddMenuItem() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const response = await axios.post('http://localhost:5000/api/menu', 
        { name, description, price, category },
        { headers: { Authorization: `Bearer ${token}` } } // Include the token in the headers
      );
      console.log('Created item:', response.data); // Debugging log
      alert('Menu item added successfully');
      navigate('/menu');
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Menu Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Description" fullWidth margin="normal" value={description} onChange={(e) => setDescription(e.target.value)} />
        <TextField label="Price" type="number" fullWidth margin="normal" value={price} onChange={(e) => setPrice(e.target.value)} />
        <TextField label="Category" fullWidth margin="normal" value={category} onChange={(e) => setCategory(e.target.value)} />
        <Button variant="contained" color="primary" type="submit">
          Add Item
        </Button>
      </form>
    </Container>
  );
}

export default AddMenuItem;