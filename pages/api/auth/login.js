import { supabase } from '../../../lib/supabase';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Solo POST' });

  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ success: false, message: error.message });
  }

  const token = jwt.sign(
    { userId: data.user.id, email: data.user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.setHeader(
    'Set-Cookie',
    `adminToken=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}; SameSite=Strict`
  );

  return res.status(200).json({
    success: true,
    session: data.session,
    user: data.user,
  });
}