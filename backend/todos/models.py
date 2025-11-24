"""
Todo Model
----------
This file defines the structure of our Todo items in the database.
Think of it as a blueprint for what information each todo will store.
"""

from django.db import models


class Todo(models.Model):

    # The main text of the todo - required field
    title = models.CharField(
        max_length=200,
    )

    # Whether the todo is completed - defaults to False
    completed = models.BooleanField(
        default=False,
    )

    # Automatically set when todo is created
    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    # Automatically updated whenever todo is saved
    updated_at = models.DateTimeField(
        auto_now=True,
    )
