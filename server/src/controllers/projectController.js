import { query } from '../config/database.js';

export const getProjects = async (req, res) => {
  const result = await query('SELECT * FROM projects ORDER BY sort_order, id');
  const projects = result.rows;

  const projectsWithTags = await Promise.all(
    projects.map(async (project) => {
      const tagsResult = await query('SELECT name, color FROM project_tags WHERE project_id = $1', [project.id]);
      return { ...project, tags: tagsResult.rows };
    })
  );

  res.json(projectsWithTags);
};

export const getProject = async (req, res) => {
  const { id } = req.params;
  const result = await query('SELECT * FROM projects WHERE id = $1', [id]);
  if (!result.rows[0]) return res.status(404).json({ error: 'Project not found' });

  const tagsResult = await query('SELECT name, color FROM project_tags WHERE project_id = $1', [id]);
  res.json({ ...result.rows[0], tags: tagsResult.rows });
};

export const createProject = async (req, res) => {
  const data = req.body;
  const result = await query(
    `INSERT INTO projects (title, description, image_url, live_url, github_url, sort_order, featured)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [data.title, data.description, data.image_url, data.live_url, data.github_url, data.sort_order || 0, data.featured ?? true]
  );
  const project = result.rows[0];

  if (data.tags?.length) {
    await query(
      'INSERT INTO project_tags (project_id, name, color) VALUES ' +
      data.tags.map((_, i) => `($${i + 1}, $${i + 2}, $${i + 3})`).join(', '),
      data.tags.flatMap((t, i) => [project.id, t.name, t.color || ''])
    );
  }

  res.status(201).json(project);
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await query(
    `UPDATE projects SET title = $1, description = $2, image_url = $3, live_url = $4, github_url = $5, sort_order = $6, featured = $7, updated_at = CURRENT_TIMESTAMP
     WHERE id = $8 RETURNING *`,
    [data.title, data.description, data.image_url, data.live_url, data.github_url, data.sort_order, data.featured, id]
  );

  if (data.tags) {
    await query('DELETE FROM project_tags WHERE project_id = $1', [id]);
    if (data.tags.length) {
      await query(
        'INSERT INTO project_tags (project_id, name, color) VALUES ' +
        data.tags.map((_, i) => `($${i + 1}, $${i + 2}, $${i + 3})`).join(', '),
        data.tags.flatMap((t, i) => [id, t.name, t.color || ''])
      );
    }
  }

  res.json(result.rows[0]);
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  await query('DELETE FROM projects WHERE id = $1', [id]);
  res.json({ message: 'Project deleted' });
};
