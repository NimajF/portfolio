import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { adminToken } = req.cookies;
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!adminToken) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    jwt.verify(adminToken, JWT_SECRET);
    return res.status(200).json({ authenticated: true });
  } catch (error) {
    return res.status(401).json({ authenticated: false });
  }
}