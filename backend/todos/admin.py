"""
Django Admin Configuration
--------------------------
Register models here to manage them through Django's admin interface.
Access at: http://localhost:8000/admin/

To create an admin user, run: python manage.py createsuperuser
"""

from django.contrib import admin
from .models import Todo


@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    """
    Customize how Todos appear in the admin interface
    """
    # Which fields to display in the list view
    list_display = ['id', 'title', 'completed', 'created_at']

    # Which fields can be edited directly in the list view
    list_editable = ['completed']

    # Add filters in the sidebar
    list_filter = ['completed', 'created_at']

    # Add search functionality
    search_fields = ['title']

    # Read-only fields (can't be edited)
    readonly_fields = ['created_at', 'updated_at']
