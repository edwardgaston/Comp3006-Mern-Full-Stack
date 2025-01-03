import React, { useContext, useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const { user, logout } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/users/me', { name, email, password }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSnackbarMessage('Profile updated successfully');
      setSnackbarSeverity('success');
      setOpen(true);
      console.log(response.data);
    } catch (error) {
      setSnackbarMessage('Error updating profile');
      setSnackbarSeverity('error');
      setOpen(true);
      console.error('Error updating profile:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:5000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      logout();
      navigate('/register');
    } catch (error) {
      setSnackbarMessage('Error deleting account');
      setSnackbarSeverity('error');
      setOpen(true);
      console.error('Error deleting account:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          You are not logged in.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
          Go to Login
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Profile Settings
      </Typography>
      <form onSubmit={handleUpdate}>
        <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Email" type="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" type="submit">
          Update Profile
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete} style={{ marginLeft: '10px' }}>
          Delete Account
        </Button>
      </form>
      <Button variant="contained" color="secondary" onClick={handleLogout} style={{ marginTop: '10px' }}>
        Logout
      </Button>
      <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Profile;