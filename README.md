# TaskFlow — Full-Stack Task Manager

A clean, production-grade Task Manager built with the modern JS stack.

## Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 18 + Vite + Tailwind CSS    |
| Backend   | Node.js + Express                 |
| Database  | MongoDB + Mongoose                |
| Dev Tools | concurrently, nodemon             |

---

## Project Structure

```
task-manager/
├── backend/
│   ├── controllers/
│   │   └── taskController.js   # CRUD logic
│   ├── models/
│   │   └── Task.js             # Mongoose schema
│   ├── routes/
│   │   └── tasks.js            # Express routes
│   ├── .env.example
│   ├── package.json
│   └── server.js               # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── tasks.js        # Fetch helpers
│   │   ├── components/
│   │   │   ├── FilterTabs.jsx
│   │   │   ├── StatsBar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskForm.jsx
│   │   ├── App.jsx             # Root component
│   │   ├── index.css           # Tailwind + custom styles
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js          # Proxies /api → :5000
│
├── package.json                # Root scripts with concurrently
└── README.md
```

---

## Quick Start

### 1. Prerequisites

- Node.js 18+
- MongoDB running locally **or** a MongoDB Atlas connection string

### 2. Clone & install

```bash
git clone <your-repo>
cd task-manager
npm run install:all
```

### 3. Configure backend environment

```bash
cd backend
cp .env.example .env
# Edit .env and set your MONGODB_URI
```

### 4. Run both servers (from root)

```bash
npm run dev
```

- **Frontend** → http://localhost:5173  
- **Backend API** → http://localhost:5000/api/tasks  

Vite proxies `/api/*` requests to the Express server, so no CORS issues in dev.

---

## API Endpoints

| Method | Endpoint            | Description        |
|--------|---------------------|--------------------|
| GET    | `/api/tasks`        | Get all tasks      |
| GET    | `/api/tasks/:id`    | Get single task    |
| POST   | `/api/tasks`        | Create task        |
| PATCH  | `/api/tasks/:id`    | Update / complete  |
| DELETE | `/api/tasks/:id`    | Delete task        |

### Task Schema

```json
{
  "_id": "mongo ObjectId",
  "title": "string (required)",
  "description": "string",
  "completed": false,
  "priority": "low | medium | high",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

---

## Features

- ✅ Create tasks with title, description & priority (low / medium / high)
- ✅ Mark tasks complete / incomplete
- ✅ Delete tasks with hover-reveal button
- ✅ Filter: All / Active / Done
- ✅ Live progress bar & stats (total, done, urgent)
- ✅ Animated UI with Tailwind custom keyframes
- ✅ Full error handling & loading states
- ✅ Responsive design

---

## Production Build

```bash
# Build the frontend
npm run build
# frontend/dist is ready to serve

# Run the backend in production
cd backend && npm start
```
