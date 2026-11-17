import { createClient } from "@supabase/supabase-js";
import { validateProjectForm, formToDbRow } from "../../../lib/normalizeProject";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASESUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASESUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASESUPABASE_ANON_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") {
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

  const validationError = validateProjectForm(req.body);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const { data, error } = await userSupabase
    .from("projects")
    .insert(formToDbRow(req.body))
    .select()
    .single();

  if (error) {
    console.error("Error creating project in Supabase:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error creating project" });
  }

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    project: data,
  });
}
