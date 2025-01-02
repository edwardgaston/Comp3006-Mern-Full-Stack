import jwt from 'jsonwebtoken';
import User from '../models/userModels.js'; // Ensure the correct file path

const auth = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Debugging log

    // Ensure the correct field is used for the query
    const user = await User.findOne({ _id: decoded.id });
    console.log('User found:', user); // Debugging log

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    console.error('Error verifying token:', err); // Debugging log
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default auth;