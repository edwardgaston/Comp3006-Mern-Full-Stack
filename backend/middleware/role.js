// filepath: /d:/Coding Projects/Comp3006 Full Stack Development/Comp3006-Mern-Full-Stack/backend/middleware/role.js
export const requireRole = (role) => {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    };
  };