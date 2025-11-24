/**
 * App Component
 * -------------
 * The main component that manages the entire todo application.
 *
 * This component:
 * - Maintains the list of todos in state
 * - Fetches todos from the backend when the app loads
 * - Handles all CRUD operations (create, read, update, delete)
 * - Passes data and functions down to child components
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { getAllTodos, createTodo, toggleTodo, deleteTodo } from './services/api';

function App() {
  // State to store all todos
  const [todos, setTodos] = useState([]);

  // State to track loading status
  const [loading, setLoading] = useState(true);

  // State to store any error messages
  const [error, setError] = useState(null);

  /**
   * useEffect Hook
   * --------------
   * Runs when the component first loads (mounts)
   * We use it to fetch todos from the backend
   *
   * The empty array [] means this only runs once when component mounts
   */
  useEffect(() => {
    fetchTodos();
  }, []);  // Empty dependency array = run once on mount

  /**
   * Fetch all todos from the backend
   * This function is called when the app first loads
   */
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call the API service function
      const todosData = await getAllTodos();

      // Update state with the fetched todos
      setTodos(todosData);
    } catch (err) {
      setError('Failed to load todos. Please refresh the page.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add a new todo
   * Called when user submits the TodoForm
   *
   * @param {string} title - The title of the new todo
   */
  const handleAddTodo = async (title) => {
    try {
      // Create todo on the backend
      const newTodo = await createTodo({
        title,
        completed: false
      });

      // Add the new todo to our local state
      // This updates the UI immediately without refetching all todos
      setTodos([newTodo, ...todos]);  // Add to beginning of array
    } catch (err) {
      setError('Failed to create todo. Please try again.');
      console.error('Error creating todo:', err);
    }
  };

  /**
   * Toggle a todo's completed status
   * Called when user clicks the checkbox on a todo
   *
   * @param {number} id - The ID of the todo to toggle
   * @param {boolean} currentStatus - The current completed status
   */
  const handleToggleTodo = async (id, currentStatus) => {
    try {
      // Update on backend
      const updatedTodo = await toggleTodo(id, !currentStatus);

      // Update in local state
      // map() creates a new array with the updated todo
      setTodos(todos.map(todo =>
        todo.id === id ? updatedTodo : todo
      ));
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error toggling todo:', err);
    }
  };

  /**
   * Delete a todo
   * Called when user clicks the delete button
   *
   * @param {number} id - The ID of the todo to delete
   */
  const handleDeleteTodo = async (id) => {
    try {
      // Delete from backend
      await deleteTodo(id);

      // Remove from local state
      // filter() creates a new array without the deleted todo
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Container with max width and padding */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">

        {/* Header component */}
        <Header />

        {/* Error message (only shows if there's an error) */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Form to add new todos */}
        <TodoForm onAddTodo={handleAddTodo} />

        {/* Loading state */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading todos...</p>
          </div>
        ) : (
          /* List of todos */
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        )}

        {/* Stats footer */}
        <div className="mt-6 text-center text-gray-600">
          <p>
            {todos.filter(t => !t.completed).length} of {todos.length} todos remaining
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
