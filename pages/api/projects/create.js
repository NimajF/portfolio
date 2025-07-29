import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { adminToken } = req.cookies;

  if (!adminToken) {
    return res.status(401).json({ message: 'Token no encontrado' });
  }

  try {
    jwt.verify(adminToken, JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }

  const { title, description, technologies, liveUrl, githubUrl, image } = req.body;

  if (!title || !description || !technologies) {
    return res.status(400).json({ message: 'Campos requeridos: título, descripción y tecnologías' });
  }

  const newProject = {
    id: Date.now(),
    title,
    description,
    technologies: technologies.split(',').map(tech => tech.trim()),
    liveUrl: liveUrl || '',
    githubUrl: githubUrl || '',
    image: image || '/images/project-placeholder.jpg',
    createdAt: new Date().toISOString()
  };

  // Save to JSON 
  const projectsPath = path.join(process.cwd(), 'data', 'projects.json');
  
  try {
    // Create directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    let projects = [];
    if (fs.existsSync(projectsPath)) {
      const data = fs.readFileSync(projectsPath, 'utf8');
      projects = JSON.parse(data);
    }
    projects.push(newProject);

    fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));

    res.status(201).json({ 
      success: true, 
      message: 'Proyecto creado exitosamente',
      project: newProject 
    });
  } catch (error) {
    console.error('Error guardando proyecto:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al guardar proyecto' 
    });
  }
}