import dotenv from 'dotenv';
dotenv.config();

import { ENV } from '../src/config/env.js';
import { query } from '../src/config/database.js';

async function init() {
  console.log('Initializing database...');
  
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

  const bcrypt = await import('bcryptjs');
  const hash = await bcrypt.default.hash('admin123', 10);
  await query(
    'INSERT INTO admins (email, password_hash, name) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING',
    ['admin@portfolio.com', hash, 'Admin']
  );

  console.log('Database initialized successfully!');
  console.log('Default admin: admin@portfolio.com / admin123');
  process.exit(0);
}

init().catch(err => {
  console.error('Init failed:', err);
  process.exit(1);
});
