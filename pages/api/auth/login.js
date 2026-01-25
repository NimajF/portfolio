import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Solo POST' });

  const { email, password } = req.body;

  // Loguear directamente en Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    return res.status(401).json({ success: false, message: error.message });
  }

  return res.status(200).json({
    success: true,
    session: data.session,
    user: data.user
  });
}