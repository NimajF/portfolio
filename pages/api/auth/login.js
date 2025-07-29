import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const JWT_SECRET = process.env.JWT_SECRET;

  // Si es GET, verificar token existente
  if (req.method === 'GET') {
    const { adminToken } = req.cookies;

    if (!adminToken) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token no encontrado' 
      });
    }

    try {
      const decoded = jwt.verify(adminToken, JWT_SECRET);
      
      return res.status(200).json({ 
        success: true, 
        user: { 
          username: decoded.username, 
          role: decoded.role 
        }
      });
    } catch (error) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token inválido o expirado' 
      });
    }
  }

  // Si es POST, hacer login
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // Debug logs
  console.log('Login attempt:', { username, password });
  console.log('Expected:', { 
    username: process.env.ADMIN_USERNAME, 
    password: process.env.ADMIN_PASSWORD 
  });

  const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Crear JWT token
    const token = jwt.sign(
      { 
        username: username,
        role: 'admin',
        iat: Math.floor(Date.now() / 1000)
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Configurar cookie con el token
    res.setHeader('Set-Cookie', [
      `adminToken=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
    ]);

    return res.status(200).json({ 
      success: true, 
      message: 'Login exitoso',
      user: { username, role: 'admin' }
    });
  } else {
    return res.status(401).json({ 
      success: false, 
      message: 'Credenciales incorrectas' 
    });
  }
}