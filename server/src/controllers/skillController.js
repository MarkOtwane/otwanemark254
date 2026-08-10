import { query } from '../config/database.js';

export const getSkills = async (req, res) => {
  const result = await query('SELECT * FROM skills ORDER BY sort_order, id');
  res.json(result.rows);
};

export const createSkill = async (req, res) => {
  const data = req.body;
  const result = await query(
    'INSERT INTO skills (name, icon, sort_order) VALUES ($1, $2, $3) RETURNING *',
    [data.name, data.icon || 'star', data.sort_order || 0]
  );
  res.status(201).json(result.rows[0]);
};

export const updateSkill = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await query(
    'UPDATE skills SET name = $1, icon = $2, sort_order = $3 WHERE id = $4 RETURNING *',
    [data.name, data.icon, data.sort_order, id]
  );
  res.json(result.rows[0]);
};

export const deleteSkill = async (req, res) => {
  const { id } = req.params;
  await query('DELETE FROM skills WHERE id = $1', [id]);
  res.json({ message: 'Skill deleted' });
};
