import { createClient } from "@supabase/supabase-js";
import { removeProjectImages } from "../../../lib/projectStorage";
import { validateProjectForm, formToDbRow } from "../../../lib/normalizeProject";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASESUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASESUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASESUPABASE_ANON_KEY;

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token not found" });
  }

  const token = authHeader.split(" ")[1];
  // Authenticated client with user token (respects RLS)
  const userSupabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const {
    data: { user },
    error: authError,
  } = await userSupabase.auth.getUser();

  if (authError || !user) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Project ID required" });
  }

  const validationError = validateProjectForm(req.body);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  // Read current image URLs to detect which ones get replaced
  const { data: oldProject } = await userSupabase
    .from("projects")
    .select("image, image_mobile")
    .eq("id", id)
    .single();

  const { data, error } = await userSupabase
    .from("projects")
    .update(formToDbRow(req.body))
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating project in Supabase:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error updating project" });
  }

  // Remove old screenshots
  const replaced = [oldProject?.image, oldProject?.image_mobile].filter(
    (url) => url && url !== data.image && url !== data.image_mobile,
  );
  await removeProjectImages(userSupabase, replaced);

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    project: data,
  });
}
