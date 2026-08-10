import { query } from '../config/database.js';

export const getHero = async (req, res) => {
  const result = await query('SELECT * FROM hero LIMIT 1');
  if (!result.rows[0]) {
    return res.json({
      greeting: 'Hi, I am',
      name: 'Mark Otwane',
      title: 'Software Engineer',
      subtitle: 'Python Expert | React | Node JS | React Native',
      description: 'I create beautiful, functional and user-centered digital experiences that solve real-world problems.',
      available: true,
      availability_text: 'AVAILABLE FOR OPPORTUNITIES',
      tagline: 'A man of Limitless Possibilities. #give_it_all',
    });
  }
  res.json(result.rows[0]);
};

export const updateHero = async (req, res) => {
  const data = req.body;
  const result = await query(
    `INSERT INTO hero (greeting, name, title, subtitle, description, available, availability_text, tagline)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     ON CONFLICT (id) DO UPDATE SET
       greeting = EXCLUDED.greeting,
       name = EXCLUDED.name,
       title = EXCLUDED.title,
       subtitle = EXCLUDED.subtitle,
       description = EXCLUDED.description,
       available = EXCLUDED.available,
       availability_text = EXCLUDED.availability_text,
       tagline = EXCLUDED.tagline,
       updated_at = CURRENT_TIMESTAMP
     RETURNING *`,
    [data.greeting, data.name, data.title, data.subtitle, data.description, data.available, data.availability_text, data.tagline]
  );
  res.json(result.rows[0]);
};

export const deleteHero = async (req, res) => {
  await query('DELETE FROM hero');
  res.json({ message: 'Hero data deleted' });
};
