/**
 * TodoList Component
 * ------------------
 * Displays a list of all todos
 *
 * Props:
 * - todos: Array of todo objects
 * - onToggle: Function to toggle todo completion
 * - onDelete: Function to delete a todo
 */

import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete }) {
  // If there are no todos, show a friendly message
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No todos yet. Add one above to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Map over todos array and render a TodoItem for each */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}  // Important: unique key for React's rendering
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;
