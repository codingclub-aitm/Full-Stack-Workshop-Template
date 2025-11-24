"""
Todo Views
----------
Views handle HTTP requests and return responses.
They're the "controllers" in the MVC pattern.

For this API, we use Function-Based Views (FBVs) for each CRUD operation.
Each function handles one specific operation, making the code easy to understand.
"""

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Todo
from .serializers import TodoSerializer


@api_view(['GET'])
def get_todos(request):
    """
    Get all todos

    Endpoint: GET /api/get_todos/

    What this does:
    ---------------
    1. Fetches all Todo objects from the database
    2. Converts them to JSON using the serializer
    3. Returns the JSON array

    Response Example:
    [
        {"id": 1, "title": "Learn Django", "completed": false, ...},
        {"id": 2, "title": "Build API", "completed": true, ...}
    ]
    """
    # Get all todos from database (sorted by newest first from model's Meta.ordering)
    todos = Todo.objects.all()

    # Convert Python objects to JSON (many=True means it's a list)
    serializer = TodoSerializer(todos, many=True)

    # Return JSON response
    return Response(serializer.data)


@api_view(['POST'])
def create_todo(request):
    """
    Create a new todo

    Endpoint: POST /api/create_todo/

    Request Body:
    {
        "title": "New task",
        "completed": false
    }

    What this does:
    ---------------
    1. Takes JSON data from request
    2. Validates it using the serializer
    3. Saves to database if valid
    4. Returns the created todo
    """
    # Create serializer with data from request
    serializer = TodoSerializer(data=request.data)

    # Check if data is valid (title not empty, etc.)
    if serializer.is_valid():
        # Save to database
        serializer.save()
        # Return created object with 201 status
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # If validation failed, return errors with 400 status
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_todo(request, pk):
    """
    Get a specific todo by ID

    Endpoint: GET /api/get_todo/{id}/

    Parameters:
    -----------
    pk : int
        Primary key (ID) of the todo to retrieve

    Response Example:
    {"id": 1, "title": "Learn Django", "completed": false, ...}
    """
    try:
        # Try to get the todo with this ID
        todo = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        # If not found, return 404 error
        return Response(
            {"error": "Todo not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # Convert to JSON and return
    serializer = TodoSerializer(todo)
    return Response(serializer.data)


@api_view(['PUT'])
def update_todo(request, pk):
    """
    Update entire todo (all fields required)

    Endpoint: PUT /api/update_todo/{id}/

    Request Body:
    {
        "title": "Updated title",
        "completed": true
    }

    Note: PUT requires ALL fields, even if unchanged
    Use PATCH for partial updates
    """
    try:
        todo = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return Response(
            {"error": "Todo not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # Update the todo with new data
    serializer = TodoSerializer(todo, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
def partial_update_todo(request, pk):
    """
    Partially update todo (only send fields you want to change)

    Endpoint: PATCH /api/partial_update_todo/{id}/

    Request Body Examples:
    {"completed": true}  # Only update completed status
    {"title": "New title"}  # Only update title

    Note: PATCH allows partial updates (only changed fields)
    """
    try:
        todo = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return Response(
            {"error": "Todo not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # partial=True allows updating only some fields
    serializer = TodoSerializer(todo, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_todo(request, pk):
    """
    Delete a todo

    Endpoint: DELETE /api/delete_todo/{id}/

    What this does:
    ---------------
    1. Finds the todo by ID
    2. Deletes it from database
    3. Returns 204 No Content (successful deletion)
    """
    try:
        todo = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return Response(
            {"error": "Todo not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # Delete from database
    todo.delete()

    # Return 204 No Content (successful deletion, no body needed)
    return Response(status=status.HTTP_204_NO_CONTENT)
