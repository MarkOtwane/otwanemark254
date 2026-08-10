import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import { query } from './src/config/database.js';

async function seed() {
  console.log('Seeding database...');

  await query(`DELETE FROM project_tags; DELETE FROM projects; DELETE FROM testimonials; DELETE FROM skills; DELETE FROM quick_facts; DELETE FROM about; DELETE FROM hero; DELETE FROM contact; DELETE FROM social_links;`);

  await query(`INSERT INTO hero (greeting, name, title, subtitle, description, available, availability_text, tagline) VALUES ('Hi, I am', 'Mark Otwane', 'Software Engineer', 'Python Expert | React | Node JS | React Native', 'I create beautiful, functional and user-centered digital experiences that solve real-world problems.', true, 'AVAILABLE FOR OPPORTUNITIES', 'A man of Limitless Possibilities. #give_it_all')`);

  await query(`INSERT INTO about (title, description) VALUES ('About Me', 'Highly motivated software engineer with 2+ years of experience in creating impactful digital solutions.')`);

  const about = await query('SELECT id FROM about LIMIT 1');
  const aboutId = about.rows[0].id;

  await query(`INSERT INTO quick_facts (label, value, icon, section_id) VALUES 
    ('Name', 'Mark Otwane', 'person', ${aboutId}),
    ('Email', 'otwanemark003@gmail.com', 'mail', ${aboutId}),
    ('Location', 'Kenya', 'location_on', ${aboutId}),
    ('Experience', '2+ Years', 'work', ${aboutId})
  `);

  await query(`INSERT INTO skills (name, icon, sort_order) VALUES 
    ('JavaScript', 'javascript', 1),
    ('TypeScript', 'code', 2),
    ('HTML5', 'html', 3),
    ('CSS3', 'css', 4),
    ('React.js', 'deployed_code', 5),
    ('Node.js', 'hub', 6),
    ('Express.js', 'api', 7),
    ('PostgreSQL', 'database', 8),
    ('MongoDB', 'storage', 9),
    ('Angular', 'web', 10),
    ('NestJS', 'dns', 11),
    ('Git', 'commit', 12)
  `);

  await query(`INSERT INTO projects (title, description, image_url, live_url, github_url, sort_order, featured) VALUES 
    ('IM Investment E-commerce', 'E-commerce platform with a modern storefront and intuitive user experience for product browsing and purchases.', 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=80', 'https://im-investments.vercel.app/', 'https://github.com/MarkOtwane', 1, true),
    ('Photography Website', 'Creative photography studio website showcasing visual galleries, services, and elegant content presentation.', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80', 'https://photograph-studio.vercel.app/', 'https://github.com/MarkOtwane', 2, true),
    ('JML E-learning Platform', 'Interactive online learning platform with organized course flows and a user-friendly learning experience.', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80', 'https://jlm-e-learning-platform.vercel.app/', 'https://github.com/MarkOtwane', 3, true)
  `);

  const projects = await query('SELECT id FROM projects');
  await query(`INSERT INTO project_tags (project_id, name, color) VALUES 
    (${projects.rows[0].id}, 'Angular', ''),
    (${projects.rows[0].id}, 'NestJS', ''),
    (${projects.rows[0].id}, 'PostgreSQL', ''),
    (${projects.rows[1].id}, 'Javascript', ''),
    (${projects.rows[1].id}, 'Docker', ''),
    (${projects.rows[2].id}, 'Angular', ''),
    (${projects.rows[2].id}, 'NestJS', ''),
    (${projects.rows[2].id}, 'PostgreSQL', '')
  `);

  await query(`INSERT INTO testimonials (quote, client_name, company, sort_order) VALUES 
    ('Mark delivered an outstanding e-commerce solution on time — highly professional and communicative.', 'Client', 'IM Investment', 1),
    ('Excellent attention to detail and thoughtful UI choices. Increased conversions after launch.', 'Client', 'Photography Studio', 2)
  `);

  await query(`INSERT INTO contact (email, phone, location) VALUES ('otwanemark003@gmail.com', '', 'Kenya')`);

  await query(`INSERT INTO social_links (platform, url, icon, sort_order) VALUES 
    ('github', 'https://github.com/MarkOtwane', 'github', 1),
    ('instagram', 'https://www.instagram.com/otwanemark', 'photo_camera', 2),
    ('linkedin', 'https://www.linkedin.com/in/mark-otwane-800871349', 'work', 3)
  `);

  console.log('Database seeded successfully!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
