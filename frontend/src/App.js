import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Avatar, Badge, Popover, List, ListItem, ListItemText } from '@mui/material';
import Home from './components/Home';
import Menu from './components/Menu';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import Profile from './components/Profile';
import AddMenuItem from './components/AddMenuItem';
import EditMenuItem from './components/EditMenuItem';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import AllOrders from './components/AllOrders'; 
import { UserContext } from './context/UserContext';
import { NotificationContext } from './context/NotificationContext';
import CartIcon from './components/CartIcon';
import NotificationsIcon from '@mui/icons-material/Notifications';

function App() {
  const { user, logout } = useContext(UserContext);
  const { notifications } = useContext(NotificationContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
  };

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
            <Button color="inherit" component={Link} to="/menu">
              Menu
            </Button>
            <Button color="inherit" component={Link} to="/orders">
              Orders
            </Button>
            {user && user.role === 'staff' && (
              <Button color="inherit" component={Link} to="/all-orders">
                All Orders
              </Button>
            )}
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
            <IconButton color="inherit" onClick={handleNotificationClick}>
              <Badge badgeContent={notifications.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleNotificationClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <List>
                {notifications.map((notification, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={notification.message} />
                  </ListItem>
                ))}
              </List>
            </Popover>
            <CartIcon />
            {user && (
              <>
                <IconButton color="inherit" component={Link} to="/profile">
                  <Avatar>{user.name.charAt(0)}</Avatar>
                </IconButton>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
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
            <Route path="/order" element={<OrderForm />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/all-orders" element={<AllOrders />} /> {/* Add the new route */}
            {user && user.role === 'admin' && (
              <>
                <Route path="/add-menu-item" element={<AddMenuItem />} />
                <Route path="/edit-menu-item/:id" element={<EditMenuItem />} />
              </>
            )}
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;