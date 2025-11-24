/**
 * TodoItem Component
 * ------------------
 * Displays a single todo item with checkbox and delete button
 *
 * Props:
 * - todo: The todo object to display
 * - onToggle: Function to call when checkbox is clicked
 * - onDelete: Function to call when delete button is clicked
 */

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Checkbox to toggle completion */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, todo.completed)}
        className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />

      {/* Todo title - strike through if completed */}
      <span
        className={`flex-1 text-lg ${
          todo.completed
            ? 'line-through text-gray-400'
            : 'text-gray-800'
        }`}
      >
        {todo.title}
      </span>

      {/* Delete button */}
      <button
        onClick={() => onDelete(todo.id)}
        className="px-3 py-1 text-red-500 hover:bg-red-50 rounded transition-colors duration-200"
        aria-label="Delete todo"
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
