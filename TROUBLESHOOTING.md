# Troubleshooting Guide

Quick solutions to common problems during the workshop.

---

## Backend Issues

### Error: `ModuleNotFoundError: No module named 'rest_framework'`

**Cause:** Virtual environment not activated or packages not installed

**Solution:**
```bash
cd backend

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install packages
pip install -r requirements.txt
```

**Verify:** You should see `(venv)` in your terminal prompt

---

### Error: `Port 8000 is already in use`

**Cause:** Another process using port 8000

**Solution 1:** Use different port
```bash
python manage.py runserver 8001
```
Then update frontend API URL to `http://localhost:8001/api`

**Solution 2:** Kill process on port 8000
```bash
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux:
lsof -i :8000
kill -9 <PID_NUMBER>
```

---

### Error: `django.db.utils.OperationalError: database is locked`

**Cause:** Another process accessing database

**Solution:**
1. Stop Django server (Ctrl+C)
2. Close Django admin in browser
3. Restart server

---

### Error: `CORS policy` errors in browser console

**Symptoms:**
```
Access to XMLHttpRequest at 'http://localhost:8000/api/todos/'
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution:**
1. Check `backend/todo_project/settings.py`:
   - Verify `'corsheaders'` in `INSTALLED_APPS`
   - Verify `'corsheaders.middleware.CorsMiddleware'` in `MIDDLEWARE`
   - Check `CORS_ALLOWED_ORIGINS` includes `"http://localhost:5173"`

2. Restart Django server

---

### Error: `No such table: todos_todo`

**Cause:** Database migrations not run

**Solution:**
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

---

## Frontend Issues

### Error: `npm install` fails

**Symptoms:** Various npm errors

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

### Error: Tailwind classes not working (No styles)

**Symptoms:** Application looks unstyled, plain HTML

**Solution:**
1. Verify `frontend/src/index.css` has:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

2. Verify `tailwind.config.js` exists with correct content paths

3. Restart dev server:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

---

### Error: `[postcss] It looks like you're trying to use tailwindcss directly`

**Cause:** Tailwind CSS v4 installed (incompatible with current setup)

**Solution:**
```bash
cd frontend

# Install Tailwind v3.x
npm install -D tailwindcss@^3.4.1 postcss@^8.4.32 autoprefixer@^10.4.16

# Restart dev server
npm run dev
```

---

### Error: Blank page / Nothing shows

**Symptoms:** Browser shows empty page

**Solution:**
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Common issues:
   - Backend not running → Start backend
   - API URL wrong → Check `src/services/api.js`
   - Import error → Check console message

---

### Error: `Network Error` when trying to fetch todos

**Symptoms:**
- Loading never finishes
- Error in console: "Network Error"

**Solution:**
1. Verify backend is running:
   - Open http://localhost:8000/api/todos/ in browser
   - Should see `[]` or list of todos

2. Check API URL in `frontend/src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:8000/api';
   ```

3. Check browser console for CORS errors (see CORS section above)

---

### Error: `Port 5173 is already in use`

**Cause:** Another Vite server running

**Solution:**
```bash
# Stop all Vite servers (Ctrl+C in terminals)

# Or change port
npm run dev -- --port 5174
```

---

## General Issues

### Virtual Environment Won't Activate (Windows)

**Symptoms:**
```
venv\Scripts\activate : File cannot be loaded because running
scripts is disabled on this system
```

**Solution:**
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then try activating again
venv\Scripts\activate
```

---

### Command Not Found: `python`

**Solution:**
Try `python3` instead:
```bash
python3 --version
python3 manage.py runserver
```

Or `py` on Windows:
```bash
py --version
py manage.py runserver
```

---

### Module Changes Not Reflected

**Symptoms:** Code changes don't appear in browser

**Solution:**
1. **Backend:** Restart Django server (should auto-reload)
2. **Frontend:** Check if Vite HMR working (should auto-update)
3. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
4. Clear browser cache

---

### Can't See My Changes

**Check:**
1. Saved the file? (Check for `*` in editor tab)
2. Right file? (Check file path)
3. Server running? (Check terminal)
4. Cached? (Hard refresh: Ctrl+Shift+R)

---

## Quick Diagnostics

### Is Backend Working?

```bash
# Check Django is running
curl http://localhost:8000/api/todos/

# Or open in browser
# Should see: [] or list of todos
```

### Is Frontend Working?

1. Open http://localhost:5173/
2. Open DevTools (F12)
3. Check Console for errors
4. Check Network tab for failed requests

### Are They Connected?

1. Add a todo in frontend
2. Check Network tab in DevTools
3. Should see POST request to `/api/todos/`
4. Should see 201 status code

---

## Emergency Reset

If everything is broken and you want to start fresh:

### Backend Reset
```bash
cd backend

# Delete database
rm db.sqlite3

# Delete migrations (keep __init__.py)
rm todos/migrations/0*.py

# Recreate everything
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### Frontend Reset
```bash
cd frontend

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
npm run dev
```

---

## Getting Help

### Before Asking for Help

1. **Read the error message** - Often tells you exactly what's wrong
2. **Check this guide** - Common issues are documented
3. **Check browser console** - F12 for detailed errors
4. **Google the error** - Someone likely had this before

### When Asking for Help

Provide:
1. What you were trying to do
2. The exact error message
3. What you've already tried
4. Your operating system
5. Python/Node versions (`python --version`, `node --version`)

### Screenshot the Error

- Include full terminal output
- Include browser console if relevant
- Show code if you made changes

---

## Prevention Tips

1. **Activate virtual environment** before running Django commands
2. **Don't modify** generated files (migrations, etc.)
3. **Follow the guide** step-by-step before experimenting
4. **Commit working code** (if using Git) before big changes
5. **Read error messages** carefully - they usually help!

---

## Still Stuck?

1. Check the main [README.md](README.md) Troubleshooting section
2. Ask the workshop facilitator
3. Check with a neighbor (pair debugging)
4. Take a short break and come back with fresh eyes

---

**Remember:** Debugging is a normal part of development. Every error is a learning opportunity! 🐛✨
