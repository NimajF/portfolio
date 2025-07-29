export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Limpiar la cookie
  res.setHeader('Set-Cookie', [
    'adminToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict'
  ]);

  res.status(200).json({ 
    success: true, 
    message: 'Logout exitoso' 
  });
}