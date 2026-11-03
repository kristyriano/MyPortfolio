# MyPortfolio – COMP229 Assignment 3

**Kristy Riano – 301557855**
Centennial College – COMP229 Web Application Development

Full stack portfolio application: React (Vite) frontend with Material UI and React Hook Form,
Node.js + Express REST APIs, MongoDB (Mongoose), JWT authentication and user roles (admin and user).

## Project structure

```
MyPortfolio/
├── server.js                 # Entry point: connects to MongoDB and starts Express
├── config/config.js          # Port, MongoDB URI and JWT secret (read from .env)
├── server/
│   ├── express.js            # Express app, middleware and routes
│   ├── models/               # Mongoose models: contact, project, qualification, user (with role)
│   ├── controllers/          # CRUD logic + auth (signin, signout, requireSignin, isAdmin)
│   ├── routes/               # REST API routes, protected by role
│   ├── seed/                 # createAdmin.js (hardcodes the admin) and seedPortfolio.js
│   └── helpers/              # MongoDB error messages
├── client/                   # React (Vite) frontend
│   └── src/
│       ├── auth/             # AuthContext (state), auth-helper, api-auth, PrivateRoute
│       ├── contact/ project/ qualification/ user/   # api-*.js: calls to the backend
│       ├── components/forms/ # Contact, Project, Qualification forms (MUI + react-hook-form)
│       └── pages/            # Signin, Signup, Contact, Contacts, Projects, Education, Users...
└── postman/                  # Postman collection (includes the Assignment 3 role tests)
```

## Setup

1. Install the backend packages (project root): `npm install`
2. Install the frontend packages: `cd client` then `npm install`
3. Copy `.env.example`, rename the copy to `.env` and add your MongoDB connection string,
   the JWT secret and the admin credentials.
4. Create the admin account in MongoDB (once): `npm run create-admin`
5. Optional, load my Assignment 1 projects and education into MongoDB: `npm run seed-portfolio`
6. Run frontend and backend at the same time: `cd client` then `npm run dev`
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

## User roles

| Role | How it is created | What it can do |
|---|---|---|
| admin | Hardcoded in MongoDB with `npm run create-admin` | Create, read, update and delete contacts, projects, qualifications and users |
| user | Sign Up page (`POST /api/users`) | View/read the records only |

Visitors without an account can view the projects and the education, and send the Contact form.

## REST APIs

| Resource | Public | Signed in (user or admin) | Admin only |
|---|---|---|---|
| contacts | `POST /api/contacts` (Contact form) | `GET /api/contacts`, `GET /api/contacts/:id` | `PUT`, `DELETE /api/contacts/:id`, `DELETE /api/contacts` |
| projects | `GET /api/projects`, `GET /api/projects/:id` | | `POST`, `PUT`, `DELETE /api/projects/:id`, `DELETE /api/projects` |
| qualifications | `GET /api/qualifications`, `GET /api/qualifications/:id` | | `POST`, `PUT`, `DELETE /api/qualifications/:id`, `DELETE /api/qualifications` |
| users | `POST /api/users` (sign up) | `GET`, `PUT`, `DELETE /api/users/:id` (own account) | `GET /api/users`, `DELETE /api/users` |
| auth | `POST /auth/signin`, `GET /auth/signout` | | |

Protected routes need the header `Authorization: Bearer <token>`. The token comes from `POST /auth/signin`
and carries the user id and role. Without a token the API answers 401; with a "user" token on an
admin route it answers 403.

## Frontend

- **Sign Up / Sign In** forms: controlled React Hook Form + Material UI, with validation.
- **Contact** form: saves first name, last name, contact number, email and message in MongoDB.
- **Projects** and **Education** pages read from MongoDB. The admin sees Add, Edit, Delete and Delete all.
- **Project** and **Qualification** forms (admin): create and update records.
- **Contacts** page (signed in): users view the messages, the admin can edit and delete them.
- **Users** page (admin): accounts and roles.
- State management: `useState`, a custom `useRecords` hook, React Hook Form state and an `AuthContext`
  for the signed-in user (saved in sessionStorage).
