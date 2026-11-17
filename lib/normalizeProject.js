// Maps a Supabase `projects` row to the shape used by FeaturedProject / Project
export function normalizeProject(row) {
  const project = {
    name: row.title,
    briefDescription: row.brief_description || "",
    description: row.description || "",
    skillsNames: row.technologies || [],
    repositoryURL: row.github_url,
    site: row.live_url,
    completed: row.completed,
    screenshot: row.image,
  };

  // RepositoryList detects featured projects by the presence of this key,
  // so it must only exist when there is a mobile screenshot
  if (row.featured && row.image_mobile) {
    project.responsiveScreenshot = row.image_mobile;
  }

  return project;
}

// Maps a static project (constants/projectsData.js) to the Supabase row shape
// used by the dashboard. Static projects are read-only in the dashboard.
export function staticToDbShape(project, idx) {
  return {
    id: `static-${idx}`,
    title: project.name,
    brief_description: project.briefDescription || "",
    description: project.description || "",
    technologies: project.skillsNames || [],
    github_url: project.repositoryURL || "",
    live_url: project.site || "",
    image: project.screenshot || "",
    image_mobile: project.responsiveScreenshot || null,
    featured: "responsiveScreenshot" in project,
    completed: project.completed,
    isStatic: true,
  };
}

// Returns an error message if the dashboard form body is missing required fields
export function validateProjectForm(body) {
  const { title, briefDescription, technologies } = body;
  if (!title || !briefDescription || !technologies) {
    return "Required fields: title, brief description and technologies";
  }
  return null;
}

// Maps the dashboard form body (camelCase) to a Supabase `projects` row (snake_case).
// Shared by the create and update endpoints.
export function formToDbRow(body) {
  const {
    title,
    description,
    briefDescription,
    technologies,
    liveUrl,
    githubUrl,
    image,
    imageMobile,
    featured,
    completed,
  } = body;

  // The form sends technologies as "react, nextjs"; the column is text[]
  const techArray =
    typeof technologies === "string"
      ? technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : technologies;

  return {
    title,
    description,
    brief_description: briefDescription || null,
    technologies: techArray,
    live_url: liveUrl || "",
    github_url: githubUrl || "",
    image: image || "",
    // Non-featured projects don't keep a mobile screenshot
    image_mobile: featured ? imageMobile || null : null,
    featured: featured || false,
    completed: completed !== undefined ? completed : true,
  };
}
