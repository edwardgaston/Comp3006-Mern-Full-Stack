import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

function EditMenuItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/menu/${id}`);
        const { name, description, price, category } = response.data;
        console.log('Fetched data:', response.data); // Debugging log
        setName(name);
        setDescription(description);
        setPrice(price);
        setCategory(category);
      } catch (error) {
        console.error('Error fetching menu item:', error);
      }
    };

    fetchMenuItem();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      await axios.put(`http://localhost:5000/api/menu/${id}`, 
        { name, description, price, category },
        { headers: { Authorization: `Bearer ${token}` } } // Include the token in the headers
      );
      alert('Menu item updated successfully');
      navigate('/menu');
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      await axios.delete(`http://localhost:5000/api/menu/${id}`, 
        { headers: { Authorization: `Bearer ${token}` } } // Include the token in the headers
      );
      alert('Menu item deleted successfully');
      navigate('/menu');
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Menu Item
      </Typography>
      <form onSubmit={handleUpdate}>
        <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Description" fullWidth margin="normal" value={description} onChange={(e) => setDescription(e.target.value)} />
        <TextField label="Price" type="number" fullWidth margin="normal" value={price} onChange={(e) => setPrice(e.target.value)} />
        <TextField label="Category" fullWidth margin="normal" value={category} onChange={(e) => setCategory(e.target.value)} />
        <Button variant="contained" color="primary" type="submit">
          Update Item
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete} style={{ marginLeft: '10px' }}>
          Delete Item
        </Button>
      </form>
    </Container>
  );
}

export default EditMenuItem;