import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const projectsPath = path.join(process.cwd(), 'data', 'projects.json');
  
  try {
    if (!fs.existsSync(projectsPath)) {
      return res.status(200).json({ success: true, projects: [] });
    }

    const data = fs.readFileSync(projectsPath, 'utf8');
    const projects = JSON.parse(data);
    
    res.status(200).json({ 
      success: true, 
      projects: projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    });
  } catch (error) {
    console.error('Error leyendo proyectos:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener proyectos' 
    });
  }
}