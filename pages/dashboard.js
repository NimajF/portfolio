import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import styles from '../styles/admin.module.css';

const AdminDashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({
    title: '',
    description: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    image: ''
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'GET',
          credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.success) {
          setUser(data.user);
          await loadProjects();
        } else {
          router.push('/adminLogin');
        }
      } catch (error) {
        router.push('/adminLogin');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/projects/get');
      const data = await response.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error('Error cargando proyectos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/projects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(project),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('¡Proyecto creado exitosamente! 🎉');
        setProject({
          title: '',
          description: '',
          technologies: '',
          liveUrl: '',
          githubUrl: '',
          image: ''
        });
        await loadProjects(); // Recargar la lista
      } else {
        setMessage(data.message || 'Error al crear proyecto');
      }
    } catch (error) {
      setMessage('Error de conexión');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      router.push('/adminLogin');
    } catch (error) {
      router.push('/adminLogin');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          color: '#fff',
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div>
            <div style={{ marginBottom: '1rem' }}>🔄</div>
            <div>Cargando dashboard...</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Admin Dashboard - Benjamin</title>
      </Head>
      
      <div className={styles.dashboard}>
        <div className={styles.dashboardHeader}>
          <div>
            <h1>🚀 Admin Dashboard</h1>
            {user && (
              <p className={styles.welcomeText}>
                Bienvenido, <strong>{user.username}</strong>
              </p>
            )}
          </div>
          <button onClick={handleLogout} className={styles.logoutButton}>
            🚪 Cerrar Sesión
          </button>
        </div>

        <div className={styles.dashboardGrid}>
          {/* Formulario para crear proyecto */}
          <div className={styles.projectForm}>
            <h2>📝 Crear Nuevo Proyecto</h2>
            
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label>🏷️ Título del Proyecto</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => setProject({...project, title: e.target.value})}
                  placeholder="Mi increíble proyecto..."
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>📄 Descripción</label>
                <textarea
                  value={project.description}
                  onChange={(e) => setProject({...project, description: e.target.value})}
                  rows="4"
                  placeholder="Describe tu proyecto en detalle..."
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>🛠️ Tecnologías (separadas por coma)</label>
                <input
                  type="text"
                  value={project.technologies}
                  onChange={(e) => setProject({...project, technologies: e.target.value})}
                  placeholder="React, Node.js, MongoDB, Tailwind CSS"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>🌐 URL del Proyecto (opcional)</label>
                <input
                  type="url"
                  value={project.liveUrl}
                  onChange={(e) => setProject({...project, liveUrl: e.target.value})}
                  placeholder="https://mi-proyecto.com"
                />
              </div>

              <div className={styles.inputGroup}>
                <label>🐙 URL de GitHub (opcional)</label>
                <input
                  type="url"
                  value={project.githubUrl}
                  onChange={(e) => setProject({...project, githubUrl: e.target.value})}
                  placeholder="https://github.com/usuario/proyecto"
                />
              </div>

              <div className={styles.inputGroup}>
                <label>🖼️ URL de Imagen (opcional)</label>
                <input
                  type="url"
                  value={project.image}
                  onChange={(e) => setProject({...project, image: e.target.value})}
                  placeholder="https://imagen.com/preview.jpg"
                />
              </div>

              {message && (
                <div className={`${styles.message} ${message.includes('exitosamente') ? styles.success : styles.error}`}>
                  {message}
                </div>
              )}

              <button 
                type="submit" 
                disabled={submitLoading}
                className={styles.submitButton}
              >
                {submitLoading ? '⏳ Creando...' : '✨ Crear Proyecto'}
              </button>
            </form>
          </div>

          {/* Lista de proyectos creados */}
          <div className={styles.projectsList}>
            <h2>📋 Proyectos Creados ({projects.length})</h2>
            {projects.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', padding: '2rem' }}>
                No hay proyectos creados aún
              </p>
            ) : (
              <div className={styles.projectsGrid}>
                {projects.map((proj) => (
                  <div key={proj.id} className={styles.projectCard}>
                    {proj.image && (
                      <img 
                        src={proj.image} 
                        alt={proj.title}
                        className={styles.projectImage}
                      />
                    )}
                    <div className={styles.projectInfo}>
                      <h3>{proj.title}</h3>
                      <p>{proj.description.substring(0, 100)}...</p>
                      <div className={styles.projectTech}>
                        {proj.technologies.map((tech, idx) => (
                          <span key={idx} className={styles.techTag}>{tech}</span>
                        ))}
                      </div>
                      <div className={styles.projectLinks}>
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer">
                            🌐 Ver Proyecto
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer">
                            🐙 GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;