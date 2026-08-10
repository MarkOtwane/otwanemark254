import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { ENV } from './config/env.js';
import { query } from './config/database.js';
import adminRoutes from './routes/adminRoutes.js';
import heroRoutes from './routes/heroRoutes.js';
import aboutRoutes from './routes/aboutRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import socialRoutes from './routes/socialRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Public API routes
app.use('/api/hero', heroRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/social', socialRoutes);

// Admin routes
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Verify token
app.post('/api/admin/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token required' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    res.json({ valid: true, user: { id: decoded.id, email: decoded.email, name: decoded.name } });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Initialize database tables
app.post('/api/init-db', async (req, res) => {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS hero (
        id SERIAL PRIMARY KEY,
        greeting VARCHAR(255),
        name VARCHAR(255),
        title VARCHAR(255),
        subtitle VARCHAR(255),
        description TEXT,
        available BOOLEAN DEFAULT true,
        availability_text VARCHAR(255),
        tagline VARCHAR(255),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS about (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS quick_facts (
        id SERIAL PRIMARY KEY,
        label VARCHAR(255),
        value VARCHAR(255),
        icon VARCHAR(255),
        section_id INTEGER REFERENCES about(id) ON DELETE CASCADE
      );
      CREATE TABLE IF NOT EXISTS skills (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        icon VARCHAR(255) DEFAULT 'star',
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        image_url VARCHAR(500),
        live_url VARCHAR(500),
        github_url VARCHAR(500),
        sort_order INTEGER DEFAULT 0,
        featured BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS project_tags (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
        name VARCHAR(255),
        color VARCHAR(50)
      );
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        quote TEXT,
        client_name VARCHAR(255),
        company VARCHAR(255),
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS contact (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255),
        phone VARCHAR(255),
        location VARCHAR(255),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS social_links (
        id SERIAL PRIMARY KEY,
        platform VARCHAR(50),
        url VARCHAR(500),
        icon VARCHAR(255),
        sort_order INTEGER DEFAULT 0
      );
    `);

    // Create default admin if none exists
    const bcrypt = await import('bcryptjs');
    const hash = await bcrypt.default.hash('admin123', 10);
    await query(
      'INSERT INTO admins (email, password_hash, name) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING',
      ['admin@portfolio.com', hash, 'Admin']
    );

    res.json({ message: 'Database initialized successfully' });
  } catch (err) {
    console.error('Init DB error:', err);
    res.status(500).json({ error: 'Failed to initialize database' });
  }
});

const PORT = ENV.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
