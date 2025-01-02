// filepath: /d:/Coding Projects/Comp3006 Full Stack Development/Comp3006-Mern-Full-Stack/frontend/src/components/Profile.js
import React, { useContext } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

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
      <TextField label="Name" fullWidth margin="normal" value={user.name} disabled />
      <TextField label="Email" fullWidth margin="normal" value={user.email} disabled />
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}

export default Profile;