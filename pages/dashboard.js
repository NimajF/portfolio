import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../context/authContext';
import { supabase } from '../lib/supabase';
import CVManager from '../components/Admin/CVManager';
import Layout from '../components/Layout';
import styles from '../styles/admin.module.css';
import {
  FaProjectDiagram,
  FaEye,
  FaPen,
  FaGithub,
  FaGlobe,
  FaSignOutAlt,
  FaPlus,
  FaSpinner
} from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const AdminDashboard = () => {
  const router = useRouter();
  const { isLogged, loading } = useAuth();
  const [user, setUser] = useState(null);
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
    if (loading) return;
    if (!isLogged) router.push('/adminLogin');
    else loadProjects();
  }, [isLogged, loading, router])


  const loadProjects = async () => {
    try {
      const response = await fetch('/api/projects/search');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setProjects(data.projects);
      } else {
        throw new Error(data.message || 'Error loading projects');
      }
    } catch (error) {
      setMessage('Error loading projects: ' + error.message);
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
        setMessage('Project created successfully! 🎉');
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
        setMessage(data.message || 'Error creating project');
      }
    } catch (error) {
      setMessage('Connection error');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      await fetch('/api/auth/logout', { method: 'POST' });

      router.push('/adminLogin');
    } catch (error) {
      console.error('Error logging out:', error.message);
      router.push('/adminLogin');
    }
  };


  const handleProjectClick = (project) => {
    console.log("Editing project:", project);
  };

  if (loading) {
    return (
      <Layout>
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          color: '#fff',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div>
            <div style={{ marginBottom: '1rem', fontSize: '2rem' }}><FaSpinner className={styles.spinner} /></div>
            <div>Loading dashboard...</div>
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
        {/* Header */}
        <div className={styles.dashboardHeader}>
          <div className={styles.welcomeSection}>
            <h1>Admin Dashboard</h1>
            {user && (
              <p className={styles.welcomeText}>
                Welcome, <strong>{user.username}</strong> 👋
              </p>
            )}
          </div>
          <div className={styles.headerActions}>
            <button onClick={handleLogout} className={styles.logoutButton}>
              <FaSignOutAlt style={{ marginRight: '8px' }} /> Logout
            </button>
          </div>
        </div>

        {/* Stats & Quick Actions Row */}
        <div className={styles.statsRow}>
          {/* Stat 1: Projects */}
          <div className={styles.statCard}>
            <div className={styles.statIcon}><FaProjectDiagram /></div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{projects.length}</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
          </div>

          {/* Stat 2: Views (Placeholder) */}
          <div className={styles.statCard}>
            <div className={styles.statIcon}><FaEye /></div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>0</span>
              <span className={styles.statLabel}>Total Views</span>
            </div>
          </div>

          {/* Stat 3: Spanish CV */}
          <CVManager lang="es" />
          {/* <div className={styles.statCard}>
            <div className={styles.statIcon}><FaFilePdf /></div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Spanish CV</span>
              <div className={styles.resumeActions}>
                <button
                  className={styles.miniBtn}
                  onClick={() => handleViewResume('es')}
                  disabled={!getCvData('es').exists}
                  title="View CV"
                >
                  <FaEye />
                </button>
                <button
                  className={styles.miniBtn}
                  onClick={() => handleEditResume('es')}
                  title="Update CV"
                >
                  <FaPen />
                </button>
                <input
                  type="file"
                  id="resume-upload-es"
                  style={{ display: 'none' }}
                  accept=".pdf"
                />
              </div>
            </div>
          </div> */}

          {/* Stat 4: English CV */}
          <CVManager lang="en" />
          {/* <div className={styles.statCard}>
            <div className={styles.statIcon}><FaFilePdf /></div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>English CV</span>
              <div className={styles.resumeActions}>
                <button
                  className={styles.miniBtn}
                  onClick={() => handleViewResume('en')}
                  disabled={!getCvData('en').exists}
                  title="View CV"
                >
                  <FaEye />
                </button>
                <button
                  className={styles.miniBtn}
                  onClick={() => handleEditResume('en')}
                  title="Update CV"
                >
                  <FaPen />
                </button>
                <input
                  type="file"
                  id="resume-upload-en"
                  style={{ display: 'none' }}
                  accept=".pdf"
                  onChange={(e) => onFileChange(e, 'en')}
                />
              </div>
            </div>
          </div> */}
        </div>

        {/* Main Content Grid */}
        <div className={styles.dashboardContent}>
          <div className={styles.projectForm}>
            <h2><FaPlus style={{ marginRight: '10px', fontSize: '0.9em' }} /> New Project</h2>

            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label>Project Name</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => setProject({ ...project, title: e.target.value })}
                  placeholder="Ex: Portfolio 2026"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Description</label>
                <textarea
                  value={project.description}
                  onChange={(e) => setProject({ ...project, description: e.target.value })}
                  placeholder="Brief description..."
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Technologies</label>
                <input
                  type="text"
                  value={project.technologies}
                  onChange={(e) => setProject({ ...project, technologies: e.target.value })}
                  placeholder="React, Next.js, etc..."
                  required
                />
              </div>

              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label>Website URL</label>
                  <input
                    type="url"
                    value={project.liveUrl}
                    onChange={(e) => setProject({ ...project, liveUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>GitHub URL</label>
                  <input
                    type="url"
                    value={project.githubUrl}
                    onChange={(e) => setProject({ ...project, githubUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Image URL</label>
                <input
                  type="url"
                  value={project.image}
                  onChange={(e) => setProject({ ...project, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              {message && (
                <div className={`${styles.message} ${message.includes('successfully') ? styles.success : styles.error}`}>
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={submitLoading}
                className={styles.submitButton}
              >
                {submitLoading ? 'Syncing...' : (
                  <>
                    <FaPlus /> Publish Project
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Lista de proyectos Grid */}
          <div className={styles.projectsListSection}>
            <h2><MdDashboard style={{ marginRight: '10px', fontSize: '1.1em' }} /> Your Projects</h2>
            {projects.length === 0 ? (
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.5)',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div style={{ fontSize: '3rem' }}><FaProjectDiagram /></div>
                <p>No projects yet</p>
              </div>
            ) : (
              <div className={styles.projectsGrid}>
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className={styles.projectCard}
                    onClick={() => handleProjectClick(proj)}
                  >
                    <div className={styles.projectOverlay}>
                      <div className={styles.editIconContainer}>
                        <FaPen />
                      </div>
                    </div>
                    {proj.image ? (
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        className={styles.projectImage}
                        width={640}
                        height={360}
                        unoptimized
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '6px',
                        marginBottom: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        color: 'rgba(255,255,255,0.2)'
                      }}><FaProjectDiagram /></div>
                    )}
                    <div className={styles.projectInfo}>
                      <h3 title={proj.title}>{proj.title}</h3>
                      <p>{proj.description}</p>
                      <div className={styles.projectTech}>
                        {(Array.isArray(proj.technologies) ? proj.technologies : proj.technologies.split(',')).map((tech, idx) => (
                          <span key={idx} className={styles.techTag}>{typeof tech === 'string' ? tech.trim() : tech}</span>
                        ))}
                      </div>
                      <div className={styles.projectLinks}>
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                            <FaGlobe style={{ marginRight: '5px' }} /> Web
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                            <FaGithub style={{ marginRight: '5px' }} /> Code
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