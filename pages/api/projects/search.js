import { supabase } from "../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.status(200).json({ success: true, projects: data });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching projects" });
  }
}
