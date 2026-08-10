import { query } from '../config/database.js';

export const getContact = async (req, res) => {
  const result = await query('SELECT * FROM contact LIMIT 1');
  if (!result.rows[0]) {
    return res.json({ email: 'mark@example.com', phone: '', location: '' });
  }
  res.json(result.rows[0]);
};

export const updateContact = async (req, res) => {
  const data = req.body;
  const result = await query(
    `INSERT INTO contact (email, phone, location) VALUES ($1, $2, $3)
     ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, phone = EXCLUDED.phone, location = EXCLUDED.location, updated_at = CURRENT_TIMESTAMP
     RETURNING *`,
    [data.email, data.phone, data.location]
  );
  res.json(result.rows[0]);
};
