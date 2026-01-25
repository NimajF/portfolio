import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/authContext';
import { supabase } from '../lib/supabase';
import Head from 'next/head';
import Layout from '../components/Layout';
import styles from '../styles/admin.module.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setIsLogged, setUser } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/login', {
          credentials: 'include'
        });

        if (response.ok) {
          setIsLogged(true);
          router.push('/dashboard');
        }
      } catch (error) {
        // 
      }
    };

    checkAuth();
  }, [router, setIsLogged]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.username,
      password: credentials.password
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setIsLogged(true);
      setUser(data.user);
      router.push('/dashboard');
    }
  };

  return (
    <Layout>
      <Head>
        <title>Admin Login - Benjamin</title>
      </Head>

      <div className={styles.loginContainer}>
        <div className={styles.loginBackground}>
          <div className={styles.floatingShapes}>
            <div className={styles.shape1}></div>
            <div className={styles.shape2}></div>
            <div className={styles.shape3}></div>
          </div>
        </div>

        <div className={styles.loginBox}>
          <div className={styles.loginHeader}>
            <div className={styles.loginIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="currentColor" />
              </svg>
            </div>
            <h1>Admin Access</h1>
            <p>Portfolio Management System</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="username">Username</label>
              <div className={styles.inputWrapper}>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                  autoComplete="username"
                  style={{ fontSize: '12px' }}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.inputWrapper}>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                  autoComplete="current-password"
                  style={{ fontSize: '12px' }}
                />
              </div>
            </div>

            {error && (
              <div className={styles.errorContainer}>
                <svg className={styles.errorIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
                </svg>
                <span className={styles.error}>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={styles.loginButton}
            >
              <span className={styles.buttonContent}>
                {loading ? (
                  <>
                    <svg className={styles.spinner} width="20" height="20" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="3" fill="currentColor">
                        <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
                      </circle>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
                    </svg>
                    Access
                  </>
                )}
              </span>
            </button>
          </form>

          <div className={styles.loginFooter}>
            <div className={styles.credentialsHint}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor" />
              </svg>
              <span>Admin access only</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLogin;