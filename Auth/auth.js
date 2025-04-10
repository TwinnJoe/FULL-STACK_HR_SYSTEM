import jwt from 'jsonwebtoken';
const JWT_SECRET = 'yourSecretKey'; // same as above

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // expects 'Bearer <token>'

  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });

    req.user = user;
    next();
  });
};
