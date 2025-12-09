# RESUME BUILDER

A full-stack MERN (MongoDB, Express, React, Node) application to create, edit, preview, download, and manage resumes. Built with a React frontend (Vite) and an Express + MongoDB backend. Includes user authentication (JWT), protected routes, toast notifications, and multiple resume templates.

---

## Key Features

- User registration and login with JWT authentication
- Create, read, update, and delete resumes (CRUD)
- Real-time preview while editing resumes
- Download or share resume
- Public/private toggle for resumes
- Toast notifications and user-friendly UI
- Responsive landing page, dashboard, and builder

---

## Functionality / What Works

- Register and login users
- Persist users and resumes in MongoDB
- Create a new resume and navigate to the builder
- Load a resume in the builder and save changes back to DB
- Edit resume title, sections (education, experience, projects, skills, summary, personal info)
- Delete resume with confirmation
- Protected routes (only authorized users can access dashboard/builder)
- Auto-logout on token expiry

---

## Tech Stack

- Frontend: React (Vite), Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- Auth: JWT (JSON Web Tokens)

---

## Folder Structure (important files)

- `client/` — React frontend (Vite)
  - `src/` — React source: components, pages, assets, context
  - `public/` — static assets
- `server/` — Express backend
  - `routes/` — API routes (`UserRoutes.js`, `ResumeRoutes.js`)
  - `controllers/` — request handlers (`UserController.js`, `resumeController.js`)
  - `models/` — Mongoose models (`User.js`, `Resume.js`)
  - `middlewares/` — auth middleware
  - `config/db.js` — MongoDB connection

---

## Environment Variables

Create a `.env` file in `server/` with at least these variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Optionally, if the client expects env variables (Vite): in `client/` create `.env` or `.env.local` with:

```
VITE_API_URL=http://localhost:5000/api
```

---

## Setup & Run (Windows PowerShell)

Open separate terminals for backend and frontend.

Backend (server):

```powershell
cd "c:\Users\Prince\Desktop\mern\projects\ai resume builder\server"
npm install
# If the project has a dev script (recommended):
npm run dev
# Or run directly:
node server.js
```

Frontend (client):

```powershell
cd "c:\Users\Prince\Desktop\mern\projects\ai resume builder\client"
npm install
npm run dev
```

Open the frontend URL printed by Vite (usually `http://localhost:5173`) and the backend on the port set in `.env` (default `5000`).

---

## API Endpoints (available in the backend)

Authentication / Users:

- `POST /api/users/register` — Register a new user
- `POST /api/users/login` — Login and receive JWT
- `GET /api/users/data` — Get authenticated user data
- `GET /api/users/resumes` — Get all resumes for the authenticated user

Resumes:

- `POST /api/resumes/create` — Create a resume
- `GET /api/resumes/get/:resumeId` — Get resume by ID
- `PUT /api/resumes/update/:resumeId` — Update resume
- `DELETE /api/resumes/delete/:resumeId` — Delete resume

Note: All resume routes are protected — provide `Authorization: Bearer <token>` header.

---

## Database Models (summary)

- User: stores name, email, hashed password, and references to resumes
- Resume: title, sections (education, experience, projects, summary, skills, personal info), owner (user), public/private flag, timestamps

---

## UI Overview

- Landing / Home: Hero, Features, Testimonials, Promotional section, Footer
- Dashboard: List and manage user resumes, create new resume, edit title, delete
- Resume Builder: Forms for Personal Info, Experience, Education, Projects, Skills, Summary and live `ResumePreview` component

---

## Notes for Developers

- The app uses JWT for authentication. Tokens are stored client-side (in AuthContext) and included in API calls.
- Protect environment secrets (do not commit `.env` to source control).
- To add templates, check `client/src/assets/resume-builder-assets/templates` and `client/src/components/templates`.

---

## Common Commands

- Install dependencies (server & client):

```powershell
cd "c:\Users\Prince\Desktop\mern\projects\ai resume builder\server"; npm install
cd "c:\Users\Prince\Desktop\mern\projects\ai resume builder\client"; npm install
```

- Start both (run in two terminals):

```powershell
cd "c:\Users\Prince\Desktop\mern\projects\ai resume builder\server"; npm run dev
cd "c:\Users\Prince\Desktop\mern\projects\ai resume builder\client"; npm run dev
```

---

## Deployment Tips

- Build the React app (`cd client && npm run build`) and serve the `dist` with a static server or integrate with Express.
- Use environment variables in your hosting platform to set `MONGO_URI` and `JWT_SECRET`.
- Secure production JWT secrets and enable HTTPS.

---

## Contributing

Contributions are welcome. Typical flow:

1. Fork the repo
2. Create a feature branch
3. Implement changes and test locally
4. Open a pull request with a clear description

---

