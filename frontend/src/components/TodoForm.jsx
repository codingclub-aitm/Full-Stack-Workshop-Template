/**
 * TodoForm Component
 * ------------------
 * A form for adding new todos
 *
 * Props:
 * - onAddTodo: Function to call when form is submitted
 */

import { useState } from 'react';

function TodoForm({ onAddTodo }) {
  // Local state for the input field
  const [title, setTitle] = useState('');

  /**
   * Handle form submission
   * Prevents default form behavior and calls parent's onAddTodo
   */
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent page reload

    // Don't submit if title is empty or just whitespace
    if (!title.trim()) {
      return;
    }

    // Call the parent's function
    onAddTodo(title);

    // Clear the input field
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        {/* Input field */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
