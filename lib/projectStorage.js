const BUCKET = "projects";
const PUBLIC_PREFIX = `/storage/v1/object/public/${BUCKET}/`;

// Extracts the file path inside the "projects" bucket from its public URL.
// Returns null for anything else (e.g. "/coinfolio.PNG" or external URLs).
export function getStoragePath(url) {
  if (!url) return null;
  const idx = url.indexOf(PUBLIC_PREFIX);
  if (idx === -1) return null;
  return decodeURIComponent(url.slice(idx + PUBLIC_PREFIX.length));
}

// Removes the given image URLs from the bucket. Errors are logged, not thrown:
// an orphan file is better than failing the whole request.
export async function removeProjectImages(client, urls) {
  const paths = urls.map(getStoragePath).filter(Boolean);
  if (paths.length === 0) return;

  const { error } = await client.storage.from(BUCKET).remove(paths);
  if (error)
    console.error(
      "Error removing project images from Supabase storage:",
      error,
    );
}
