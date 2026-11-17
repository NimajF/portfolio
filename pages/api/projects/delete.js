import { createClient } from "@supabase/supabase-js";
import { removeProjectImages } from "../../../lib/projectStorage";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASESUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASESUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASESUPABASE_ANON_KEY;

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token not found" });
  }

  const token = authHeader.split(" ")[1];

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

  const { data: deletedProject, error } = await userSupabase
    .from("projects")
    .delete()
    .eq("id", id)
    .select("image, image_mobile")
    .single();

  if (error) {
    console.error("Error deleting project:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error deleting project" });
  }

  await removeProjectImages(userSupabase, [
    deletedProject.image,
    deletedProject.image_mobile,
  ]);

  return res
    .status(200)
    .json({ success: true, message: "Project deleted successfully" });
}
