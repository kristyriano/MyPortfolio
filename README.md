# MyPortfolio – COMP229 Assignment 2

**Kristy Riano – 301557855**
Centennial College – COMP229 Web Application Development

Backend for my portfolio application: Node.js, Express REST APIs and MongoDB (Mongoose), with JWT authentication.
The React frontend from Assignment 1 is in the `client` folder.

## Project structure

```
MyPortfolio/
├── server.js                 # Entry point: connects to MongoDB and starts Express
├── config/config.js          # Port, MongoDB URI and JWT secret (read from .env)
├── server/
│   ├── express.js            # Express app, middleware and routes
│   ├── models/               # Mongoose models: contact, project, qualification, user
│   ├── controllers/          # CRUD logic + auth (signin, signout, protected routes)
│   ├── routes/               # REST API routes
│   └── helpers/              # MongoDB error messages
├── client/                   # React (Vite) frontend from Assignment 1
└── postman/                  # Postman collection to test every endpoint
```

## Setup

1. Install the backend packages (project root): `npm install`
2. Install the frontend packages: `cd client` then `npm install`
3. Copy `.env.example`, rename the copy to `.env` and add your MongoDB connection string.
4. Run frontend and backend at the same time: `cd client` then `npm run dev`
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

To run only the backend: `node server.js` (from the root).

## REST APIs

| Resource | Methods and URLs |
|---|---|
| contacts | `GET /api/contacts`, `GET /api/contacts/:id`, `POST /api/contacts`, `PUT /api/contacts/:id`, `DELETE /api/contacts/:id`, `DELETE /api/contacts` |
| projects | `GET /api/projects`, `GET /api/projects/:id`, `POST /api/projects`, `PUT /api/projects/:id`, `DELETE /api/projects/:id`, `DELETE /api/projects` |
| qualifications | `GET /api/qualifications`, `GET /api/qualifications/:id`, `POST /api/qualifications`, `PUT /api/qualifications/:id`, `DELETE /api/qualifications/:id`, `DELETE /api/qualifications` |
| users | `GET /api/users`, `GET /api/users/:id`, `POST /api/users`, `PUT /api/users/:id`, `DELETE /api/users/:id`, `DELETE /api/users` |
| auth | `POST /auth/signin`, `GET /auth/signout` |

### Protected routes (JWT)

`GET`, `PUT` and `DELETE /api/users/:id` and `DELETE /api/users` need the header
`Authorization: Bearer <token>`. The token comes from `POST /auth/signin`.
A user can only read, update or delete their own account.

The Contact page form in the frontend saves each message in the `contacts` collection through `POST /api/contacts`.
