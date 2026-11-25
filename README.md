# Mark Otwane - Portfolio Website

A modern, responsive portfolio website showcasing my skills as a Software Engineer specializing in Python, React, and Node JS.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Modern Animations**: Smooth scroll reveals and micro-interactions
- **Admin Dashboard**: Full CRUD interface to manage all portfolio content
- **Backend API**: Node.js + Express REST API with PostgreSQL database
- **Dynamic Content**: Frontend fetches data from backend API
- **Clean Code**: Well-structured HTML, CSS, and JavaScript

## 🛠 Tech Stack

### Frontend
- **HTML5, CSS3, JavaScript** (vanilla)
- **Icons**: Material Symbols Outlined
- **Fonts**: Inter (Google Fonts)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing

## Project Structure

```
portfolio-website/
├── index.html              # Main portfolio page
├── style.css               # Main stylesheet
├── app.js                  # Frontend API integration
├── mark.png                # Profile image
├── package.json            # Root project metadata
├── .gitignore              # Git ignore rules
├── admin/
│   └── index.html          # Admin dashboard (CRUD interface)
├── server/
│   ├── package.json        # Server dependencies
│   ├── .env                # Server environment variables (not in git)
│   ├── .gitignore          # Server git ignore
│   ├── init-db.js          # Database initialization script
│   ├── seed.js             # Database seeding script
│   └── src/
│       ├── index.js        # Express server entry point
│       ├── config/
│       │   ├── env.js      # Environment configuration
│       │   └── database.js # PostgreSQL connection pool
│       ├── controllers/    # Route handlers
│       │   ├── adminController.js
│       │   ├── heroController.js
│       │   ├── aboutController.js
│       │   ├── skillController.js
│       │   ├── projectController.js
│       │   ├── testimonialController.js
│       │   ├── contactController.js
│       │   └── socialController.js
│       ├── middleware/
│       │   └── auth.js     # JWT authentication middleware
│       └── routes/         # API route definitions
│           ├── adminRoutes.js
│           ├── heroRoutes.js
│           ├── aboutRoutes.js
│           ├── skillRoutes.js
│           ├── projectRoutes.js
│           ├── testimonialRoutes.js
│           ├── contactRoutes.js
│           └── socialRoutes.js
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL (v14+)
- npm or yarn

### 1. Clone the Repository

```bash
git clone YOUR_REPO_URL
cd portfolio-website
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..
```

### 3. Configure Environment

```bash
cd server
cp .env .env.local  # if .env doesn't exist
```

Edit `server/.env` with your database credentials:

```env
PORT=5000
DATABASE_URL=postgres://your_user:your_password@localhost:5432/portfolio
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

### 4. Start PostgreSQL

Make sure PostgreSQL is running locally:

```bash
# Check if PostgreSQL is running
pg_isready

# Start PostgreSQL (Ubuntu/Debian)
sudo systemctl start postgresql

# Or using Docker
docker start postgres-container
```

### 5. Create Database

```bash
# Create the portfolio database
createdb portfolio

# Or using psql
psql -c "CREATE DATABASE portfolio;"
```

### 6. Initialize Database Schema

```bash
cd server
npm run init-db
```

This creates all required tables: `admins`, `hero`, `about`, `quick_facts`, `skills`, `projects`, `project_tags`, `testimonials`, `contact`, `social_links`.

### 7. Seed Database with Initial Data

```bash
npm run seed
```

This populates the database with default skills, projects, testimonials, and contact info.

### 8. Start the Backend Server

```bash
cd server
npm run dev
```

The API will run on `http://localhost:5000`

### 9. View the Frontend

Open `index.html` in your browser, or serve via local server:

```bash
# From the root directory
python -m http.server 8000
# Then open http://localhost:8000
```

### 10. Access Admin Dashboard

Open `admin/index.html` in your browser.

**Default admin credentials:**
- Email: `admin@portfolio.com`
- Password: `admin123`

## API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/hero` | Get hero section data |
| GET | `/api/about` | Get about section data |
| GET | `/api/about/quick-facts` | Get quick facts list |
| GET | `/api/skills` | Get all skills |
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get single project |
| GET | `/api/testimonials` | Get all testimonials |
| GET | `/api/contact` | Get contact information |
| GET | `/api/social` | Get social media links |
| GET | `/api/health` | Health check |

### Admin Endpoints (require JWT token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin login |
| POST | `/api/admin/verify` | Verify JWT token |
| POST | `/api/admin/change-password` | Change admin password |
| POST | `/api/hero` | Update hero section |
| DELETE | `/api/hero` | Delete hero data |
| POST | `/api/about` | Update about section |
| POST | `/api/about/quick-facts` | Create/update quick fact |
| DELETE | `/api/about/quick-facts/:id` | Delete quick fact |
| POST | `/api/skills` | Create skill |
| PUT | `/api/skills/:id` | Update skill |
| DELETE | `/api/skills/:id` | Delete skill |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| POST | `/api/testimonials` | Create testimonial |
| PUT | `/api/testimonials/:id` | Update testimonial |
| DELETE | `/api/testimonials/:id` | Delete testimonial |
| POST | `/api/contact` | Update contact info |
| POST | `/api/social` | Create social link |
| PUT | `/api/social/:id` | Update social link |
| DELETE | `/api/social/:id` | Delete social link |

## Customization

### Frontend

1. **Personal Information**: Edit `index.html` to update static content
2. **Styling**: Modify `style.css` to change colors, fonts, layout
3. **Profile Image**: Replace `mark.png` with your own image
4. **Resume**: Replace `MARK OTWANE-1.pdf` with your CV

### Dynamic Content

Use the **Admin Dashboard** (`admin/index.html`) to manage:
- Hero section (greeting, name, title, subtitle, description, availability)
- About section (title, description, quick facts)
- Skills (name, icon, sort order)
- Projects (title, description, image, tags, live/demo links)
- Testimonials (quote, client name, company)
- Contact information (email, phone, location)
- Social media links (platform, URL, icon)

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Troubleshooting

### Backend won't start

- Ensure PostgreSQL is running: `pg_isready`
- Check `server/.env` has correct `DATABASE_URL`
- Verify the database exists: `psql -l | grep portfolio`
- Check port 5000 is not in use: `lsof -i :5000`

### Admin login fails

- Ensure backend server is running
- Check database was initialized: `npm run init-db`
- Verify default admin was seeded: `npm run seed`
- Check browser console for CORS errors

### Frontend not loading dynamic content

- The frontend gracefully falls back to static HTML if the API is unavailable
- Ensure backend is running on `http://localhost:5000`
- Check browser console for API errors

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- **Email**: otwanemark003@gmail.com
- **LinkedIn**: [Mark Otwane](https://www.linkedin.com/in/mark-otwane-800871349)
- **GitHub**: [@MarkOtwane](https://github.com/MarkOtwane)

---

Built by Mark Otwane
