/**
 * API Service
 * -----------
 * This file centralizes all communication with the backend API.
 * Instead of making fetch/axios calls directly in components,
 * we create reusable functions here.
 *
 * Benefits:
 * - Single place to manage API URL
 * - Easy to add error handling
 * - Reusable across components
 */

import axios from 'axios';

// Base URL for all API requests
// Change this if your backend runs on a different port
const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Create an axios instance with default configuration
 * This sets the base URL for all requests made through this instance
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Get all todos from the backend
 *
 * @returns {Promise<Array>} Array of todo objects
 *
 * Example usage:
 * const todos = await getAllTodos();
 *
 * Response format:
 * [
 *   { id: 1, title: "Learn React", completed: false, ... },
 *   { id: 2, title: "Build app", completed: true, ... }
 * ]
 */
export const getAllTodos = async () => {
  try {
    const response = await api.get('/get_todos/');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;  // Re-throw so component can handle it
  }
};

/**
 * Create a new todo
 *
 * @param {Object} todoData - The data for the new todo
 * @param {string} todoData.title - The title of the todo
 * @param {boolean} [todoData.completed=false] - Whether todo is completed
 * @returns {Promise<Object>} The created todo object
 *
 * Example usage:
 * const newTodo = await createTodo({ title: "Learn Django", completed: false });
 */
export const createTodo = async (todoData) => {
  try {
    const response = await api.post('/create_todo/', todoData);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

/**
 * Update an existing todo
 *
 * @param {number} id - The ID of the todo to update
 * @param {Object} todoData - The updated data
 * @returns {Promise<Object>} The updated todo object
 *
 * Example usage:
 * const updated = await updateTodo(1, { title: "Updated title", completed: true });
 */
export const updateTodo = async (id, todoData) => {
  try {
    const response = await api.put(`/update_todo/${id}/`, todoData);
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

/**
 * Toggle the completed status of a todo
 * This is a convenience function that only updates the completed field
 *
 * @param {number} id - The ID of the todo
 * @param {boolean} completed - The new completed status
 * @returns {Promise<Object>} The updated todo object
 *
 * Example usage:
 * await toggleTodo(1, true);  // Mark todo #1 as completed
 */
export const toggleTodo = async (id, completed) => {
  try {
    // PATCH only updates the specified fields (not the entire object)
    const response = await api.patch(`/partial_update_todo/${id}/`, { completed });
    return response.data;
  } catch (error) {
    console.error('Error toggling todo:', error);
    throw error;
  }
};

/**
 * Delete a todo
 *
 * @param {number} id - The ID of the todo to delete
 * @returns {Promise<void>}
 *
 * Example usage:
 * await deleteTodo(1);  // Delete todo with ID 1
 */
export const deleteTodo = async (id) => {
  try {
    await api.delete(`/delete_todo/${id}/`);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

// Export the axios instance if components need to make custom requests
export default api;
