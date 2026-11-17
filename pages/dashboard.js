import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../context/authContext";
import { supabase } from "../lib/supabase";
import staticProjects from "../constants/projectsData";
import { staticToDbShape } from "../lib/normalizeProject";
import { removeProjectImages } from "../lib/projectStorage";
import CVManager from "../components/Admin/CVManager";
import Layout from "../components/Layout";
import styles from "../styles/admin.module.css";
import {
  FaProjectDiagram,
  FaEye,
  FaPen,
  FaGlobe,
  FaSignOutAlt,
  FaPlus,
  FaSpinner,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

const AdminDashboard = () => {
  const router = useRouter();
  const { isLogged, loading } = useAuth();
  const [project, setProject] = useState({
    title: "",
    description: "",
    briefDescription: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    image: "",
    imageMobile: "",
    featured: false,
    completed: true,
  });

  // Files selected in the form, uploaded only when the form is submitted
  const [pendingFiles, setPendingFiles] = useState({
    image: null,
    imageMobile: null,
  });
  // Local blob: URLs to preview the selected files before uploading
  const [previews, setPreviews] = useState({ image: "", imageMobile: "" });

  const [submitLoading, setSubmitLoading] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [message, setMessage] = useState("");
  const [projects, setProjects] = useState([]);
  // Supabase projects (editable) + static projects (read-only)
  const allProjects = [...projects, ...staticProjects.map(staticToDbShape)];

  useEffect(() => {
    if (loading) return;
    if (!isLogged) router.push("/adminLogin");
    else loadProjects();
  }, [isLogged, loading, router]);

  const loadProjects = async () => {
    setLoadingProjects(true);
    try {
      const response = await fetch("/api/projects/search");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setProjects(data.projects);
      } else {
        throw new Error(data.message || "Error loading projects");
      }
    } catch (error) {
      setMessage("Error loading projects: " + error.message);
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setMessage("");

    // Track files uploaded in this submit so they can be removed if saving fails
    const uploadedUrls = [];

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Upload selected screenshots now that the form is being saved
      const finalProject = { ...project };
      if (pendingFiles.image) {
        finalProject.image = await uploadScreenshot(pendingFiles.image);
        uploadedUrls.push(finalProject.image);
      }

      if (project.featured && pendingFiles.imageMobile) {
        finalProject.imageMobile = await uploadScreenshot(
          pendingFiles.imageMobile,
          true,
        );
        uploadedUrls.push(finalProject.imageMobile);
      }

      const isEditing = !!editingProject;
      const url = isEditing ? "/api/projects/update" : "/api/projects/create";
      const method = isEditing ? "PUT" : "POST";
      const body = isEditing
        ? JSON.stringify({ id: editingProject.id, ...project })
        : JSON.stringify(project);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          isEditing
            ? "Project updated successfully!"
            : "Project created successfully!",
        );
        handleCancelEdit();
        await loadProjects();
      } else {
        // If saving fails, remove the files uploaded in this submit
        await removeProjectImages(supabase, uploadedUrls);
        setMessage(
          data.message ||
            (isEditing ? "Error updating project" : "Error creating project"),
        );
      }
    } catch (error) {
      await removeProjectImages(supabase, uploadedUrls);
      setMessage("Error: " + error.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const uploadScreenshot = async (file, isMobile = false) => {
    const extension = file.name.split(".").pop().toLowerCase();
    const fileName = `${isMobile ? "mobile" : "desktop"}-${Date.now()}.${extension}`;

    const { error } = await supabase.storage
      .from("projects")
      .upload(fileName, file);
    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("projects").getPublicUrl(fileName);

    return publicUrl;
  };

  const handleImageChange = (e, isMobile = false) => {
    const file = e.target.files[0];
    if (!file) return;

    const field = isMobile ? "imageMobile" : "image";

    // Free the previous preview URL before creating a new one
    if (previews[field]) URL.revokeObjectURL(previews[field]);

    setPendingFiles((prev) => ({ ...prev, [field]: file }));
    setPreviews((prev) => ({ ...prev, [field]: URL.createObjectURL(file) }));
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      await fetch("/api/auth/logout", { method: "POST" });

      router.push("/adminLogin");
    } catch (error) {
      console.error("Error logging out:", error.message);
      router.push("/adminLogin");
    }
  };

  const emptyProject = {
    title: "",
    description: "",
    briefDescription: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    image: "",
    imageMobile: "",
    featured: false,
    completed: true,
  };

  // Discards selected files and frees their preview URLs
  const clearPendingFiles = () => {
    Object.values(previews).forEach((url) => url && URL.revokeObjectURL(url));
    setPendingFiles({ image: null, imageMobile: null });
    setPreviews({ image: "", imageMobile: "" });
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setProject(emptyProject);
    setMessage("");
    clearPendingFiles();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project? This cannot be undone.")) return;

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await fetch("/api/projects/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (response.ok) {
        if (editingProject?.id === id) handleCancelEdit();
        await loadProjects();
      } else {
        setMessage(data.message || "Error deleting project");
      }
    } catch (error) {
      setMessage("Connection error");
    }
  };

  const handleProjectClick = (proj) => {
    setEditingProject(proj);
    setProject({
      title: proj.title,
      description: proj.description || "",
      briefDescription: proj.brief_description || "",
      technologies: Array.isArray(proj.technologies)
        ? proj.technologies.join(", ")
        : proj.technologies,
      liveUrl: proj.live_url || "",
      githubUrl: proj.github_url || "",
      image: proj.image || "",
      imageMobile: proj.image_mobile || "",
      featured: proj.featured || false,
      completed: proj.completed !== undefined ? proj.completed : true,
    });
  };

  if (loading) {
    return (
      <Layout>
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            color: "#fff",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <div style={{ marginBottom: "1rem", fontSize: "2rem" }}>
              <FaSpinner className={styles.spinner} />
            </div>
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
            <span className={styles.adminBadge}>ADMIN</span>
            <h1>Dashboard</h1>
          </div>
          <div className={styles.headerActions}>
            <button onClick={handleLogout} className={styles.logoutButton}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          <div className={`${styles.statCard} ${styles.statBlue}`}>
            <div className={styles.statIcon}>
              <FaProjectDiagram />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{allProjects.length}</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.statPurple}`}>
            <div className={styles.statIcon}>
              <FaEye />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>0</span>
              <span className={styles.statLabel}>Total Views</span>
            </div>
          </div>

          <CVManager lang="es" color="teal" />
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
          <CVManager lang="en" color="amber" />
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
            <h2>
              <span
                className={styles.sectionDot}
                style={{ background: "var(--db-accent)" }}
              />
              {editingProject ? "Edit Project" : "Add New Project"}
              {editingProject && (
                <button
                  type="button"
                  className={styles.cancelEditBtn}
                  onClick={handleCancelEdit}
                  title="Cancel editing"
                >
                  <FaTimes />
                </button>
              )}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label>Project Name</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) =>
                    setProject({ ...project, title: e.target.value })
                  }
                  placeholder="Ex: Portfolio 2026"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Brief Description</label>
                <input
                  type="text"
                  value={project.briefDescription}
                  onChange={(e) =>
                    setProject({ ...project, briefDescription: e.target.value })
                  }
                  placeholder="Short tagline shown on every card..."
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Technologies</label>
                <input
                  type="text"
                  value={project.technologies}
                  onChange={(e) =>
                    setProject({ ...project, technologies: e.target.value })
                  }
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
                    onChange={(e) =>
                      setProject({ ...project, liveUrl: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>GitHub URL</label>
                  <input
                    type="url"
                    value={project.githubUrl}
                    onChange={(e) =>
                      setProject({ ...project, githubUrl: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Desktop Screenshot</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e)}
                />
                {(previews.image || project.image) && (
                  <Image
                    className={styles.uploadPreview}
                    src={previews.image || project.image}
                    alt="Desktop screenshot preview"
                    width={240}
                    height={135}
                    unoptimized={true}
                  />
                )}
              </div>

              <div className={styles.inputGroup}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={project.featured}
                    onChange={(e) =>
                      setProject({
                        ...project,
                        featured: e.target.checked,
                        imageMobile: "",
                      })
                    }
                    style={{ width: "auto", accentColor: "var(--db-accent)" }}
                  />
                  Featured project (shows desktop + mobile screenshot)
                </label>
              </div>

              {project.featured && (
                <>
                  <div className={styles.inputGroup}>
                    <label>Full Description</label>
                    <textarea
                      value={project.description}
                      onChange={(e) =>
                        setProject({ ...project, description: e.target.value })
                      }
                      placeholder="Extended description shown on the featured card..."
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Mobile Screenshot (393×852)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, true)}
                    />

                    {(previews.imageMobile || project.imageMobile) && (
                      <Image
                        className={styles.uploadPreview}
                        src={previews.imageMobile || project.imageMobile}
                        alt="Mobile screenshot preview"
                        width={93}
                        height={200}
                        unoptimized={true}
                      />
                    )}
                  </div>
                </>
              )}

              <div className={styles.inputGroup}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={project.completed}
                    onChange={(e) =>
                      setProject({ ...project, completed: e.target.checked })
                    }
                    style={{ width: "auto", accentColor: "var(--db-accent)" }}
                  />
                  Completed project
                </label>
              </div>

              {message && (
                <div
                  className={`${styles.message} ${message.includes("successfully") ? styles.success : styles.error}`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={submitLoading}
                className={styles.submitButton}
              >
                {submitLoading ? (
                  "Syncing..."
                ) : (
                  <>
                    {editingProject ? "Update Project" : "Add Project"}{" "}
                    <FaPlus />
                  </>
                )}
              </button>

              {editingProject && (
                <button
                  type="button"
                  className={styles.deleteProjectBtn}
                  onClick={() => handleDelete(editingProject.id)}
                >
                  <FaTrash /> Delete project
                </button>
              )}
            </form>
          </div>

          {/* Projects List */}
          <div className={styles.projectsListSection}>
            <h2>
              <span
                className={styles.sectionDot}
                style={{ background: "#a78bfa" }}
              />
              Your Projects
            </h2>
            {loadingProjects ? (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                <FaSpinner
                  className={styles.spinner}
                  style={{ fontSize: "2rem" }}
                />
              </div>
            ) : allProjects.length === 0 ? (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.5)",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div style={{ fontSize: "3rem" }}>
                  <FaProjectDiagram />
                </div>
                <p>No projects yet</p>
              </div>
            ) : (
              <div className={styles.projectsGrid}>
                {allProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className={styles.projectCard}
                    onClick={() => !proj.isStatic && handleProjectClick(proj)}
                  >
                    <div className={styles.projectOverlay}>
                      <div className={styles.cardActions}>
                        {!proj.isStatic && (
                          <>
                            <div
                              className={styles.editIconContainer}
                              title="Edit"
                            >
                              <FaPen />
                            </div>
                            <div
                              className={styles.deleteIconContainer}
                              title="Delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(proj.id);
                              }}
                            >
                              <FaTrash />
                            </div>
                          </>
                        )}
                        {proj.live_url && (
                          <div
                            className={styles.visitIconContainer}
                            title="Visit"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(proj.live_url, "_blank");
                            }}
                          >
                            <FaGlobe />
                          </div>
                        )}
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
                      <div
                        style={{
                          width: "100%",
                          aspectRatio: "16/9",
                          background: "rgba(255,255,255,0.03)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.8rem",
                          color: "rgba(255,255,255,0.1)",
                        }}
                      >
                        <FaProjectDiagram />
                      </div>
                    )}
                    <div className={styles.projectInfo}>
                      <h3 title={proj.title}>{proj.title}</h3>
                      {proj.isStatic && (
                        <span
                          className={styles.staticBadge}
                          title="Defined in constants/projectsData.js"
                        >
                          Static
                        </span>
                      )}
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
