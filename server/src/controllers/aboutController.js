import { query } from '../config/database.js';

export const getAbout = async (req, res) => {
  const result = await query('SELECT * FROM about LIMIT 1');
  if (!result.rows[0]) {
    return res.json({
      title: 'About Me',
      description: 'Highly motivated software engineer with 2+ years of experience in creating impactful digital solutions.',
    });
  }
  res.json(result.rows[0]);
};

export const updateAbout = async (req, res) => {
  const data = req.body;
  const result = await query(
    `INSERT INTO about (title, description) VALUES ($1, $2)
     ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, updated_at = CURRENT_TIMESTAMP
     RETURNING *`,
    [data.title, data.description]
  );
  res.json(result.rows[0]);
};

export const getQuickFacts = async (req, res) => {
  const result = await query('SELECT * FROM quick_facts ORDER BY id');
  res.json(result.rows);
};

export const upsertQuickFact = async (req, res) => {
  const data = req.body;
  const result = await query(
    `INSERT INTO quick_facts (label, value, icon) VALUES ($1, $2, $3)
     ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, value = EXCLUDED.value, icon = EXCLUDED.icon
     RETURNING *`,
    [data.label, data.value, data.icon]
  );
  res.json(result.rows[0]);
};

export const deleteQuickFact = async (req, res) => {
  const { id } = req.params;
  await query('DELETE FROM quick_facts WHERE id = $1', [id]);
  res.json({ message: 'Quick fact deleted' });
};
