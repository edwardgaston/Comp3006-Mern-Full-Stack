// filepath: /d:/Coding Projects/Comp3006 Full Stack Development/Comp3006-Mern-Full-Stack/frontend/src/components/Home.js
import React from 'react';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to the Restaurant Ordering System
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/menu">
        View Menu
      </Button>
    </div>
  );
}

export default Home;