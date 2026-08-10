import { query } from '../config/database.js';

export const getSocials = async (req, res) => {
  const result = await query('SELECT * FROM social_links ORDER BY sort_order, id');
  res.json(result.rows);
};

export const createSocial = async (req, res) => {
  const data = req.body;
  const result = await query(
    'INSERT INTO social_links (platform, url, icon, sort_order) VALUES ($1, $2, $3, $4) RETURNING *',
    [data.platform, data.url, data.icon, data.sort_order || 0]
  );
  res.status(201).json(result.rows[0]);
};

export const updateSocial = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await query(
    'UPDATE social_links SET platform = $1, url = $2, icon = $3, sort_order = $4 WHERE id = $5 RETURNING *',
    [data.platform, data.url, data.icon, data.sort_order, id]
  );
  res.json(result.rows[0]);
};

export const deleteSocial = async (req, res) => {
  const { id } = req.params;
  await query('DELETE FROM social_links WHERE id = $1', [id]);
  res.json({ message: 'Social link deleted' });
};
