# Quick Start Guide

## Start the Application

### Terminal 1 - Backend
```bash
cd backend
python manage.py migrate
python manage.py runserver
```
**Should see:** `Starting development server at http://127.0.0.1:8000/`

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```
**Should see:** `Local: http://localhost:5173/`

### Open Browser
Navigate to: `http://localhost:5173/`

---

## First Time Setup

### Backend Setup (One Time)
```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup database
python manage.py makemigrations
python manage.py migrate
```

### Frontend Setup (One Time)
```bash
cd frontend
npm install
```

---

## Common Issues

### Issue: `ModuleNotFoundError: No module named 'rest_framework'`
**Solution:** Activate virtual environment first
```bash
cd backend
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

### Issue: Frontend shows blank page
**Solution:**
1. Check browser console for errors
2. Verify backend is running at http://localhost:8000
3. Try: `npm install` then `npm run dev`

### Issue: CORS errors in browser
**Solution:**
1. Verify backend settings.py has CORS configuration
2. Restart backend server

---

## Verify Everything Works

1. Open http://localhost:5173/
2. Try adding a todo - type "Test todo" and click Add
3. Click checkbox to mark complete
4. Click Delete to remove
5. Refresh page - data should persist (stored in database)

✅ If all 5 steps work, you're ready for the workshop!
