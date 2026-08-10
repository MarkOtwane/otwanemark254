import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/database.js';
import { ENV } from '../config/env.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await query('SELECT id, email, password_hash, name FROM admins WHERE email = $1', [email]);
  const admin = result.rows[0];

  if (!admin) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, admin.password_hash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: admin.id, email: admin.email, name: admin.name }, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES,
  });

  res.json({ token, user: { id: admin.id, email: admin.email, name: admin.name } });
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const adminId = req.user.id;

  const result = await query('SELECT password_hash FROM admins WHERE id = $1', [adminId]);
  const admin = result.rows[0];

  const valid = await bcrypt.compare(currentPassword, admin.password_hash);
  if (!valid) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }

  const hash = await bcrypt.hash(newPassword, 10);
  await query('UPDATE admins SET password_hash = $1 WHERE id = $2', [hash, adminId]);

  res.json({ message: 'Password changed successfully' });
};
