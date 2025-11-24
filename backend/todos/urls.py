"""
Todo App URLs
-------------
This file defines the URL patterns for the todos app.
It maps URLs to views (which handle the requests).

Each URL pattern explicitly connects:
- HTTP Method → URL Path → View Function
"""

from django.urls import path
from . import views

"""
URL Patterns Mapping
--------------------
Below are all the API endpoints with their corresponding views.
Each path() explicitly shows what function handles each URL.
"""

urlpatterns = [
    # Get all todos
    # GET /api/get_todos/
    path('get_todos/', views.get_todos, name='get-todos'),

    # Create a new todo
    # POST /api/create_todo/
    path('create_todo/', views.create_todo, name='create-todo'),

    # Get a specific todo by ID
    # GET /api/get_todo/1/
    path('get_todo/<int:pk>/', views.get_todo, name='get-todo'),

    # Update entire todo (requires all fields)
    # PUT /api/update_todo/1/
    path('update_todo/<int:pk>/', views.update_todo, name='update-todo'),

    # Partially update todo (only changed fields)
    # PATCH /api/partial_update_todo/1/
    path('partial_update_todo/<int:pk>/', views.partial_update_todo, name='partial-update-todo'),

    # Delete a todo
    # DELETE /api/delete_todo/1/
    path('delete_todo/<int:pk>/', views.delete_todo, name='delete-todo'),
]

"""
Understanding the URL Patterns
-------------------------------
<int:pk> - Captures an integer from the URL and passes it as 'pk' parameter

Example:
  URL: /api/update_todo/5/
  → Calls: views.update_todo(request, pk=5)

name='get-todos' - Gives this URL a name for reverse lookups
  (useful for generating URLs in templates or redirects)
"""
