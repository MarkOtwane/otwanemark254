import { query } from '../config/database.js';

export const getTestimonials = async (req, res) => {
  const result = await query('SELECT * FROM testimonials ORDER BY sort_order, id');
  res.json(result.rows);
};

export const createTestimonial = async (req, res) => {
  const data = req.body;
  const result = await query(
    'INSERT INTO testimonials (quote, client_name, company, sort_order) VALUES ($1, $2, $3, $4) RETURNING *',
    [data.quote, data.client_name, data.company, data.sort_order || 0]
  );
  res.status(201).json(result.rows[0]);
};

export const updateTestimonial = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await query(
    'UPDATE testimonials SET quote = $1, client_name = $2, company = $3, sort_order = $4 WHERE id = $5 RETURNING *',
    [data.quote, data.client_name, data.company, data.sort_order, id]
  );
  res.json(result.rows[0]);
};

export const deleteTestimonial = async (req, res) => {
  const { id } = req.params;
  await query('DELETE FROM testimonials WHERE id = $1', [id]);
  res.json({ message: 'Testimonial deleted' });
};
