export default function handler(req, res) {
  res.setHeader('Set-Cookie', [
    'adminToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict'
  ]);

  return res.status(200).json({ success: true, message: 'Logged out' });
}