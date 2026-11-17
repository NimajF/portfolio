import { supabase } from "../../lib/supabase";

// Ping triggered by Vercel Cron to keep the Supabase free project from pausing
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const secret = process.env.CRON_SECRET;
  // Vercel sends CRON_SECRET as a Bearer token; reject any other caller
  if (!secret || req.headers.authorization !== `Bearer ${secret}`) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { error } = await supabase.from("projects").select("id").limit(1);
  if (error) {
    console.error("Keep-alive query failed:", error);
    return res.status(500).json({ success: false });
  }
  res.status(200).json({ success: true, pingedAt: new Date().toISOString() });
}
