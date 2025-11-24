"""
Main Project URLs
-----------------
This is the root URL configuration for the entire Django project.
All app URLs are included here.
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Django admin interface (for managing data through a web UI)
    # Access at: http://localhost:8000/admin/
    path('admin/', admin.site.urls),

    # API endpoints for todos
    # Access at: http://localhost:8000/api/
    # This includes all URLs from todos/urls.py
    path('api/', include('todos.urls')),
]
