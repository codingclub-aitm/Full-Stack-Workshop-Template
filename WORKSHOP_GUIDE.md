# Workshop Facilitator Guide

## Pre-Workshop Checklist

### 1 Week Before
- [ ] Share QUICK_START.md with participants
- [ ] Ask participants to install Python 3.8+ and Node.js 16+
- [ ] Ask participants to clone/download repository
- [ ] Ask participants to run setup steps (backend & frontend)

### 1 Day Before
- [ ] Test complete setup on your machine
- [ ] Prepare backup solution (USB drives with dependencies)
- [ ] Test on Windows, Mac, Linux if possible
- [ ] Prepare slides/presentation (optional)

### Workshop Day - 30 Minutes Before
- [ ] Test projector/screen sharing
- [ ] Have backup WiFi/hotspot ready
- [ ] Open both backend and frontend in separate terminals
- [ ] Test application end-to-end
- [ ] Have browser DevTools open as example

---

## Workshop Timeline (2-3 Hours)

### Part 1: Introduction & Setup (30 minutes)

#### 00:00 - 00:10 | Welcome & Overview
- Introduce yourself and the workshop
- Show the final working application
- Explain what participants will learn
- Quick poll: Who has Python/Node installed?

#### 00:10 - 00:30 | Setup & Verification
- Guide through QUICK_START.md
- Help with common issues:
  - Virtual environment activation
  - Port conflicts
  - npm install errors
- Checkpoint: Everyone has both servers running

**✅ CHECKPOINT 1:** Both servers running, browser shows app

---

### Part 2: Understanding the Backend (45-50 minutes)

#### 00:30 - 00:40 | Django Project Structure
- Show directory structure
- Explain manage.py, settings.py, urls.py
- Quick tour of Django admin (create superuser live)

#### 00:40 - 00:50 | The Todo Model
- Open `backend/todos/models.py`
- Explain each field with comments
- Show database migration process
- Open Django admin to show model

#### 00:50 - 01:00 | Serializers & API
- Open `backend/todos/serializers.py`
- Explain Python ↔ JSON conversion
- Show validation in action

#### 01:00 - 01:10 | ViewSets & URLs
- Open `backend/todos/views.py`
- Explain CRUD operations
- Open `backend/todos/urls.py`
- Show router auto-generation

#### 01:10 - 01:20 | Test the API
- Open browser to http://localhost:8000/api/todos/
- Create todos via DRF browsable API
- Show in Django admin
- Check database with SQLite viewer (optional)

**✅ CHECKPOINT 2:** Can create/read/update/delete via API

**Break Time:** 5-10 minutes

---

### Part 3: Understanding the Frontend (50-55 minutes)

#### 01:30 - 01:40 | React Project Structure
- Show frontend directory
- Explain package.json dependencies
- Show Vite config (briefly)
- Explain Tailwind setup

#### 01:40 - 01:55 | API Service Layer
- Open `frontend/src/services/api.js`
- Explain axios setup
- Show each CRUD function
- Emphasize centralization benefits

#### 01:55 - 02:10 | React Components
- **Header.jsx** (2 min) - Simple stateless component
- **TodoForm.jsx** (5 min) - useState, form handling
- **TodoItem.jsx** (3 min) - Props, conditional rendering
- **TodoList.jsx** (5 min) - map, key prop

#### 02:10 - 02:25 | Main App Component
- Open `frontend/src/App.jsx`
- Explain state management (todos, loading, error)
- Explain useEffect for data fetching
- Show CRUD handler functions
- Explain state updates (immutability)

**✅ CHECKPOINT 3:** Understand component hierarchy and data flow

---

### Part 4: Styling & Testing (20-25 minutes)

#### 02:25 - 02:35 | Tailwind CSS
- Show utility classes in action
- Live edit: Change colors/spacing
- Show responsive design
- Brief mention of customization

#### 02:35 - 02:45 | Testing & DevTools
- Test all CRUD operations
- Open browser DevTools:
  - Network tab (show API calls)
  - Console (show React state)
  - React DevTools (if installed)
- Demonstrate error handling

**✅ CHECKPOINT 4:** Full application working

---

### Part 5: Wrap-up & Next Steps (15-20 minutes)

#### 02:45 - 02:55 | Review & Q&A
- Recap what was built
- Answer questions
- Common gotchas

#### 02:55 - 03:00 | Next Steps
- Share resources from README
- Suggest enhancements to try
- Mention deployment options
- Encourage continued learning

---

## Common Issues & Solutions

### Backend Issues

| Issue | Symptoms | Solution |
|-------|----------|----------|
| Virtual env not activated | ModuleNotFoundError | Show activation command for their OS |
| Port 8000 in use | Address already in use | `python manage.py runserver 8001` |
| Database locked | OperationalError | Restart Django server |
| CORS errors | Network error in browser | Check settings.py CORS config |

### Frontend Issues

| Issue | Symptoms | Solution |
|-------|----------|----------|
| npm install fails | Various errors | `npm cache clean --force` |
| Tailwind not working | No styles applied | Check index.css imports |
| Blank page | Nothing shows | Check console, verify API URL |
| Can't connect to backend | Network errors | Verify backend running |

---

## Teaching Tips

### For Complete Beginners
1. **Don't assume knowledge** - Explain even basic concepts
2. **Use analogies** - "Serializer is like a translator"
3. **Show, don't just tell** - Live code and demonstrate
4. **Encourage questions** - Pause frequently for Q&A
5. **Pair programming** - Have participants help each other

### Keeping Everyone Engaged
1. **Use checkpoints** - Ensure no one falls behind
2. **Show real-world relevance** - "Companies use this exact stack"
3. **Share personal stories** - Your learning journey
4. **Make it interactive** - Ask participants to predict outcomes
5. **Celebrate progress** - Acknowledge when checkpoints are reached

### Time Management
1. **Flexible schedule** - Skip deep-dives if running behind
2. **Backup slides** - For skipped sections
3. **Optional content** - Mark advanced topics as optional
4. **Buffer time** - Always assume 20-30% longer than planned

---

## Post-Workshop

### Immediately After
- [ ] Share slides/resources via email/GitHub
- [ ] Collect feedback (Google Form)
- [ ] Share photos/recordings (if any)
- [ ] Answer follow-up questions

### Follow-up (1 Week Later)
- [ ] Email with next steps
- [ ] Share additional resources
- [ ] Announce next workshop (if applicable)
- [ ] Share participant projects (with permission)

---

## Backup Plans

### No Internet
- [ ] Have dependencies on USB drive
- [ ] Prepared package tarballs (Python & npm)
- [ ] Offline documentation (MDN, Django docs)

### Time Running Short
**Priority Order:**
1. ✅ Get app running (both servers)
2. ✅ Understand backend models & API
3. ✅ Understand React components
4. ⚠️ Skip: Deep dive into serializers
5. ⚠️ Skip: Tailwind customization
6. ⚠️ Skip: Advanced features

### Technical Failures
- [ ] Backup laptop with working setup
- [ ] Cloud IDE ready (Replit/CodeSandbox)
- [ ] Recorded demo video

---

## Resources to Share

### Documentation
- [Django Docs](https://docs.djangoproject.com)
- [DRF Docs](https://www.django-rest-framework.org/)
- [React Docs](https://react.dev)
- [Tailwind Docs](https://tailwindcss.com)

### Learning Paths
- [freeCodeCamp](https://www.freecodecamp.org)
- [MDN Web Docs](https://developer.mozilla.org)
- [Django Tutorial](https://docs.djangoproject.com/en/4.2/intro/tutorial01/)
- [React Tutorial](https://react.dev/learn)

### Community
- Django Discord
- React Discord (Reactiflux)
- Stack Overflow
- Reddit: r/django, r/reactjs

---

## Feedback Collection

### Questions to Ask
1. What worked well?
2. What was confusing?
3. Was the pace too fast/slow?
4. What would you like to see next?
5. Would you recommend this workshop?

### Rating Scale (1-5)
- Workshop content
- Instructor clarity
- Hands-on practice
- Documentation quality
- Overall experience

---

**Good luck with the workshop! 🎉**

Remember: The goal is learning, not perfection. If participants leave with:
- A working application
- Understanding of full-stack concepts
- Confidence to explore further

Then it's a success! 🚀
