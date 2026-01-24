import fs from 'fs';
import path from 'path';
import originalProjects from '../../../constants/projectsData';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const projectsPath = path.join(process.cwd(), 'data', 'projects.json');
  
  try {
    let adminProjects = [];
    
    // Leer proyectos del admin si existen
    if (fs.existsSync(projectsPath)) {
      const data = fs.readFileSync(projectsPath, 'utf8');
      adminProjects = JSON.parse(data);
    }

    // Convertir proyectos originales al formato estandar
    const convertedOriginalProjects = originalProjects.map((project, index) => ({
      id: `original-${index}`,
      title: project.name,
      description: project.description || project.briefDescription,
      technologies: project.skillsNames || ['React', 'JavaScript'],
      liveUrl: project.site || '',
      githubUrl: project.repositoryURL || '',
      image: project.screenshot || '/images/project-placeholder.jpg',
      createdAt: new Date('2024-01-01').toISOString(),
      isOriginal: true,
      originalData: project
    }));

    // Combinar ambas fuentes, admin projects primero
    const allProjects = [
      ...adminProjects,
      ...convertedOriginalProjects
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.status(200).json({ 
      success: true, 
      projects: allProjects,
      stats: {
        adminProjects: adminProjects.length,
        originalProjects: convertedOriginalProjects.length,
        total: allProjects.length
      }
    });
  } catch (error) {
    console.error('Error leyendo proyectos:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener proyectos' 
    });
  }
}