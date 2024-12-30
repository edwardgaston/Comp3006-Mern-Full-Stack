// filepath: /d:/Coding Projects/Comp3006 Full Stack Development/Comp3006-Mern-Full-Stack/frontend/src/components/Login.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField label="Email" type="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </Container>
  );
}

export default Login;