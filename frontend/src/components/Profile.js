// filepath: /d:/Coding Projects/Comp3006 Full Stack Development/Comp3006-Mern-Full-Stack/frontend/src/components/Profile.js
import React, { useContext } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { UserContext } from '../context/UserContext';

function Profile() {
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
  };

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