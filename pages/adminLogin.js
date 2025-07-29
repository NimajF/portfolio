import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../components/Layout';
import styles from '../styles/admin.module.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/login', {
          credentials: 'include'
        });
        
        if (response.ok) {
          router.push('/');
        }
      } catch (error) {
        // Usuario no autenticado, continuar en login
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Incluir cookies
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/');
      } else {
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Admin Login - Benjamin</title>
      </Head>
      
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <div className={styles.loginIcon}>🔐</div>
          <h1>Admin Access</h1>
          
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                required
              />
            </div>
            
            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
              />
            </div>

            {error && <div className={styles.error}>{error}</div>}
            
            <button 
              type="submit" 
              disabled={loading}
              className={styles.loginButton}
            >
              {loading ? '🔄 Verificando...' : '🚀 Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLogin;