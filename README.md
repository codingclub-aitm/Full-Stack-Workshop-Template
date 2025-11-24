# Full Stack Todo App Workshop

> Build a complete web application from scratch in 2-3 hours!

## Table of Contents
1. [Workshop Overview](#workshop-overview)
2. [What You'll Build](#what-youll-build)
3. [Prerequisites](#prerequisites)
4. [Repository Structure](#repository-structure)
5. [Initial Setup](#initial-setup)
6. [Architecture Overview](#architecture-overview)
7. [Backend Development (Django + DRF)](#backend-development-django--drf)
8. [Frontend Development (React + Tailwind)](#frontend-development-react--tailwind)
9. [Testing Your Application](#testing-your-application)
10. [Workshop Checkpoints](#workshop-checkpoints)
11. [API Reference](#api-reference)
12. [Troubleshooting](#troubleshooting)
13. [Next Steps & Enhancements](#next-steps--enhancements)
14. [Resources](#resources)

---

## Workshop Overview

**Duration:** 2-3 hours
**Level:** Complete beginners welcome
**Goal:** Build a functional todo list application with Create, Read, Update, Delete operations

**What You'll Learn:**
- Building REST APIs with Django REST Framework
- Creating React components and managing state
- Connecting frontend and backend
- Styling with Tailwind CSS
- Working with databases (SQLite)

---

## What You'll Build

A full-stack todo list application with:
- **Backend:** Django REST API with CRUD operations
- **Frontend:** React app with modern UI
- **Styling:** Tailwind CSS for beautiful, responsive design
- **Database:** SQLite (no configuration needed!)

**Features:**
- ✅ Add new todos
- ✅ View all todos
- ✅ Mark todos as complete/incomplete
- ✅ Delete todos
- ✅ Clean, responsive UI

---

## Prerequisites

### Required Software
- **Python 3.8+** ([Download](https://python.org))
- **Node.js 16+** ([Download](https://nodejs.org))
- **Code Editor** (VS Code recommended)
- **Git** (optional but recommended)

### Verification Commands
```bash
python --version    # Should show 3.8+
node --version      # Should show 16+
npm --version       # Should show 8+
```

### Helpful to Know (Not Required)
- Basic HTML/CSS
- Basic Python syntax
- JavaScript basics
- Command line familiarity

---

## Repository Structure

```
TodoApp/
├── README.md                          # This comprehensive guide
├── .gitignore                         # Ignore unnecessary files
│
├── backend/                           # Django REST API
│   ├── requirements.txt               # Python dependencies
│   ├── manage.py                      # Django management script
│   ├── db.sqlite3                     # Database (auto-generated)
│   │
│   ├── todo_project/                  # Django project folder
│   │   ├── settings.py                # Project settings with CORS
│   │   ├── urls.py                    # Main URL routing
│   │   └── ...
│   │
│   └── todos/                         # Django app for todo functionality
│       ├── models.py                  # Todo model definition
│       ├── serializers.py             # DRF serializers
│       ├── views.py                   # API views/viewsets
│       ├── urls.py                    # App-specific URLs
│       ├── admin.py                   # Admin configuration
│       └── migrations/
│
└── frontend/                          # React application
    ├── package.json                   # Node dependencies
    ├── tailwind.config.js             # Tailwind configuration
    ├── vite.config.js                 # Vite bundler config
    │
    ├── public/                        # Static assets
    │
    └── src/
        ├── main.jsx                   # App entry point
        ├── App.jsx                    # Main App component
        ├── index.css                  # Tailwind directives
        │
        ├── components/                # React components
        │   ├── Header.jsx
        │   ├── TodoForm.jsx
        │   ├── TodoItem.jsx
        │   └── TodoList.jsx
        │
        └── services/                  # API integration
            └── api.js                 # Axios wrapper for backend
```

---

## Initial Setup

### Step 1: Clone/Download Repository
```bash
# If using Git
git clone <repository-url>
cd TodoApp

# Or download ZIP and extract
```

### Step 2: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Create virtual environment (isolates Python packages)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Create database tables
python manage.py makemigrations
python manage.py migrate

# Start Django server
python manage.py runserver
```

**✅ Success Check:** Backend running at `http://localhost:8000`

### Step 3: Frontend Setup (New Terminal Window)

```bash
# Navigate to frontend folder
cd frontend

# Install Node dependencies
npm install

# Start development server
npm run dev
```

**✅ Success Check:** Frontend running at `http://localhost:5173`

---

## Architecture Overview

### System Diagram

```
┌─────────────┐         ┌─────────────┐         ┌──────────┐
│   React     │ ◄─────► │   Django    │ ◄─────► │  SQLite  │
│  Frontend   │  HTTP   │   Backend   │         │ Database │
│  :5173      │  JSON   │   :8000     │         │          │
└─────────────┘         └─────────────┘         └──────────┘
```

### How It Works

1. **User interacts with React frontend** (clicks button, types text)
2. **Frontend sends HTTP requests to Django API** (GET, POST, PUT, DELETE)
3. **Django processes requests and talks to database** (SQLite)
4. **Response sent back to frontend as JSON**
5. **Frontend updates the UI** (displays todos)

### Data Flow Example (Creating a Todo)

```
User clicks "Add"
  → React sends POST request with todo data
  → Django creates new Todo in database
  → Returns new todo as JSON
  → React updates list
  → User sees new item
```

---

## Backend Development (Django + DRF)

The backend code is already written with extensive comments! Let's understand what each file does:

### 6.1 Todo Model (`backend/todos/models.py`)

**What it does:** Defines the structure of a Todo item in the database

**Key fields:**
- `title` - The text of the todo (max 200 characters)
- `completed` - Boolean, whether todo is done
- `created_at` - Automatically set when created
- `updated_at` - Automatically updated when modified

### 6.2 Serializer (`backend/todos/serializers.py`)

**What it does:** Converts between Python objects and JSON

```python
Python Todo object ←→ JSON (for API)
```

**Key features:**
- Automatic validation
- Read-only fields (id, timestamps)
- Custom validation for title

### 6.3 Views (`backend/todos/views.py`)

**What it does:** Handles HTTP requests and returns responses

**TodoViewSet provides:**
- `GET /api/todos/` - List all todos
- `POST /api/todos/` - Create new todo
- `GET /api/todos/1/` - Get specific todo
- `PUT /api/todos/1/` - Update todo
- `PATCH /api/todos/1/` - Partial update
- `DELETE /api/todos/1/` - Delete todo

### 6.4 URLs (`backend/todos/urls.py` & `backend/todo_project/urls.py`)

**What it does:** Maps URLs to views

The router automatically creates all CRUD endpoints!

### 6.5 Settings (`backend/todo_project/settings.py`)

**Key configurations:**
- `INSTALLED_APPS` - Includes `rest_framework`, `corsheaders`, `todos`
- `CORS_ALLOWED_ORIGINS` - Allows React (localhost:5173) to access API
- `REST_FRAMEWORK` - API configuration

### 6.6 Admin (`backend/todos/admin.py`)

**What it does:** Configures Django admin interface

**Access at:** `http://localhost:8000/admin/`

**To create admin user:**
```bash
python manage.py createsuperuser
```

---

## Frontend Development (React + Tailwind)

The frontend code is already written with extensive comments! Let's understand the structure:

### 7.1 API Service (`frontend/src/services/api.js`)

**What it does:** Centralizes all backend API calls

**Functions:**
- `getAllTodos()` - Fetch all todos
- `createTodo(data)` - Create new todo
- `updateTodo(id, data)` - Update todo
- `toggleTodo(id, completed)` - Toggle completion
- `deleteTodo(id)` - Delete todo

### 7.2 Components

#### Header (`frontend/src/components/Header.jsx`)
Simple header with title and subtitle

#### TodoForm (`frontend/src/components/TodoForm.jsx`)
- Input field for new todo
- Submit button
- Handles form submission

#### TodoItem (`frontend/src/components/TodoItem.jsx`)
- Displays a single todo
- Checkbox for completion
- Delete button

#### TodoList (`frontend/src/components/TodoList.jsx`)
- Maps over todos array
- Renders TodoItem for each
- Shows message if no todos

### 7.3 Main App (`frontend/src/App.jsx`)

**What it does:** Manages application state and logic

**State:**
- `todos` - Array of all todos
- `loading` - Loading status
- `error` - Error messages

**Key functions:**
- `fetchTodos()` - Loads todos from backend
- `handleAddTodo()` - Creates new todo
- `handleToggleTodo()` - Toggles completion
- `handleDeleteTodo()` - Deletes todo

### 7.4 Styling (`frontend/src/index.css` & Tailwind)

Tailwind CSS provides utility classes for styling:
- `bg-blue-500` - Blue background
- `text-white` - White text
- `rounded-lg` - Rounded corners
- `px-4 py-3` - Padding
- `hover:bg-blue-600` - Hover effects

---

## Testing Your Application

### Manual Testing Checklist

1. **Start both servers**
   - Backend: `python manage.py runserver`
   - Frontend: `npm run dev`

2. **Open browser**
   - Go to `http://localhost:5173`

3. **Test CRUD operations**
   - [ ] Can add a new todo
   - [ ] Todo appears in list immediately
   - [ ] Can toggle complete/incomplete
   - [ ] Can delete a todo
   - [ ] Page refresh preserves todos (data in database)

### Using Browser DevTools

**Open DevTools:** Press `F12` or `Right-click → Inspect`

**Network Tab:**
- See all API requests
- Check request/response data
- Verify status codes (200, 201, 204)

**Console Tab:**
- See any JavaScript errors
- View console.log messages

---

## Workshop Checkpoints

| # | Checkpoint | What You Should See | Files Modified |
|---|------------|---------------------|----------------|
| 1 | Backend setup complete | `python manage.py runserver` works | N/A |
| 2 | Migrations run | No errors from migrate command | `db.sqlite3` created |
| 3 | API accessible | Visit `http://localhost:8000/api/todos/` | N/A |
| 4 | Frontend setup complete | `npm run dev` works | N/A |
| 5 | Tailwind working | See styled components | `index.css` |
| 6 | API connected | Todos load from backend (empty list) | N/A |
| 7 | CRUD complete | All operations work | N/A |

---

## API Reference

### Base URL
```
http://localhost:8000/api
```

### Endpoints

#### 1. List All Todos
```http
GET /api/todos/
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Learn Django",
    "completed": false,
    "created_at": "2025-11-23T10:30:00Z",
    "updated_at": "2025-11-23T10:30:00Z"
  },
  {
    "id": 2,
    "title": "Build Todo App",
    "completed": true,
    "created_at": "2025-11-23T09:15:00Z",
    "updated_at": "2025-11-23T11:00:00Z"
  }
]
```

#### 2. Create Todo
```http
POST /api/todos/
Content-Type: application/json

{
  "title": "New task",
  "completed": false
}
```

**Response (201 Created):**
```json
{
  "id": 3,
  "title": "New task",
  "completed": false,
  "created_at": "2025-11-23T12:00:00Z",
  "updated_at": "2025-11-23T12:00:00Z"
}
```

#### 3. Get Single Todo
```http
GET /api/todos/1/
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Learn Django",
  "completed": false,
  "created_at": "2025-11-23T10:30:00Z",
  "updated_at": "2025-11-23T10:30:00Z"
}
```

#### 4. Update Todo (Full Update)
```http
PUT /api/todos/1/
Content-Type: application/json

{
  "title": "Learn Django REST Framework",
  "completed": true
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Learn Django REST Framework",
  "completed": true,
  "created_at": "2025-11-23T10:30:00Z",
  "updated_at": "2025-11-23T12:30:00Z"
}
```

#### 5. Partial Update Todo
```http
PATCH /api/todos/1/
Content-Type: application/json

{
  "completed": true
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Learn Django",
  "completed": true,
  "created_at": "2025-11-23T10:30:00Z",
  "updated_at": "2025-11-23T12:35:00Z"
}
```

#### 6. Delete Todo
```http
DELETE /api/todos/1/
```

**Response (204 No Content):**
```
[Empty body - successful deletion]
```

---

## Troubleshooting

### Backend Issues

#### Problem: `ModuleNotFoundError: No module named 'rest_framework'`
**Solution:** Ensure virtual environment is activated and run:
```bash
pip install -r requirements.txt
```

#### Problem: Port 8000 already in use
**Solution:** Run on different port:
```bash
python manage.py runserver 8001
```
Update frontend API URL to `http://localhost:8001/api`

#### Problem: CORS errors in browser console
**Solution:**
1. Verify `django-cors-headers` is installed
2. Check `settings.py` has correct CORS configuration
3. Ensure `corsheaders.middleware.CorsMiddleware` is in MIDDLEWARE

#### Problem: Database is locked
**Solution:**
1. Close all connections to db.sqlite3
2. Restart Django server

### Frontend Issues

#### Problem: `npm install` fails
**Solution:**
```bash
npm cache clean --force
npm install
```

#### Problem: Tailwind classes not working
**Solution:**
1. Verify `tailwind.config.js` exists
2. Check `index.css` has Tailwind directives
3. Restart dev server

#### Problem: Can't connect to backend
**Solution:**
1. Verify backend is running (`http://localhost:8000/api/todos/`)
2. Check browser console for errors
3. Verify API URL in `api.js` matches backend port

#### Problem: "Loading todos..." never finishes
**Solution:**
1. Open browser DevTools → Network tab
2. Check if request to `/api/todos/` failed
3. Verify backend is running and accessible

---

## Next Steps & Enhancements

### Level 1 (Easy)
- [ ] Add due dates to todos
- [ ] Add filter buttons (All/Active/Completed)
- [ ] Add "Clear Completed" button
- [ ] Add todo count statistics
- [ ] Add edit functionality for todo titles

### Level 2 (Intermediate)
- [ ] Add user authentication (login/signup)
- [ ] Add categories/tags for todos
- [ ] Add search functionality
- [ ] Add priority levels (high/medium/low)
- [ ] Add dark mode toggle

### Level 3 (Advanced)
- [ ] Deploy backend to Heroku/Railway
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Add real-time updates (WebSockets)
- [ ] Convert to Progressive Web App (PWA)
- [ ] Add drag-and-drop reordering
- [ ] Add recurring todos

---

## Resources

### Django & Django REST Framework
- [Django Documentation](https://docs.djangoproject.com)
- [Django Tutorial](https://docs.djangoproject.com/en/4.2/intro/tutorial01/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [DRF Tutorial](https://www.django-rest-framework.org/tutorial/quickstart/)

### React
- [React Documentation](https://react.dev)
- [React Tutorial](https://react.dev/learn)
- [Vite Documentation](https://vitejs.dev)

### Tailwind CSS
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)

### General Web Development
- [MDN Web Docs](https://developer.mozilla.org)
- [freeCodeCamp](https://www.freecodecamp.org)
- [JavaScript.info](https://javascript.info)

### HTTP & APIs
- [HTTP Status Codes](https://httpstatuses.com/)
- [REST API Tutorial](https://restfulapi.net/)

---

## Workshop Tips

### For Facilitators

1. **Pre-workshop**
   - Test the entire setup on different OS
   - Prepare backup solutions for common issues
   - Have a complete working version ready

2. **During workshop**
   - Use checkpoints to keep everyone synchronized
   - Encourage pair programming
   - Walk around and help individuals

3. **Common pain points**
   - Virtual environment activation (different per OS)
   - Port conflicts
   - CORS issues
   - Case sensitivity in imports

### For Participants

1. **If you get stuck**
   - Check the Troubleshooting section
   - Review the checkpoint for your current step
   - Ask the facilitator
   - Check browser console for error messages

2. **Best practices**
   - Read the code comments - they explain everything!
   - Take breaks every 45-60 minutes
   - Experiment and break things (that's how you learn!)
   - Ask questions - there are no dumb questions!

---

## Questions or Issues?

If you encounter any problems:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review the checkpoint for your current step
3. Check browser console for error messages
4. Ask the workshop facilitator
5. Review the code comments in the relevant files

---

**Happy Coding! 🎉**

Made with ❤️ for beginner developers
