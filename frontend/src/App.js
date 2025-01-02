// filepath: /d:/Coding Projects/Comp3006 Full Stack Development/Comp3006-Mern-Full-Stack/frontend/src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Avatar } from '@mui/material';
import Menu from './components/Menu';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import Profile from './components/Profile';
import { UserContext } from './context/UserContext';

function App() {
  const { user } = useContext(UserContext);

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Restaurant Ordering System
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            {!user && (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
              </>
            )}
            <Button color="inherit" component={Link} to="/cart">
              Cart
            </Button>
            {user && (
              <IconButton color="inherit" component={Link} to="/profile">
                <Avatar>{user.name.charAt(0)}</Avatar>
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;