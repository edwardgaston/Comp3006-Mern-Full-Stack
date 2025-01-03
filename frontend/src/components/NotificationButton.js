import React, { useContext, useState } from 'react';
import { IconButton, Badge, Modal, Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NotificationContext } from '../context/NotificationContext';
import axios from 'axios';

const NotificationButton = () => {
  const { notifications, setNotifications } = useContext(NotificationContext);
  const [open, setOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      console.log('Fetching notifications...'); // Debugging log
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Debugging log
      const response = await axios.get('http://localhost:5000/api/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Fetched notifications:', response.data); // Debugging log
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleOpen = async () => {
    console.log('Button clicked'); // Debugging log
    setOpen(true);
    await fetchNotifications(); // Fetch notifications when the button is clicked
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.map(notification =>
        notification._id === id ? { ...notification, read: true } : notification
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={notifications.filter(notification => !notification.read).length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="notification-modal-title"
        aria-describedby="notification-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="notification-modal-title" variant="h6" component="h2">
            Notifications
          </Typography>
          <List>
            {notifications.map((notification) => (
              <ListItem key={notification._id}>
                <ListItemText primary={notification.message} />
                {!notification.read && (
                  <Button onClick={() => handleMarkAsRead(notification._id)}>Mark as read</Button>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </>
  );
};

export default NotificationButton;