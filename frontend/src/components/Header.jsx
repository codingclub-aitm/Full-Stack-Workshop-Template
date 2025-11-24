/**
 * Header Component
 * ----------------
 * Simple header for the todo app
 */

function Header() {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Todo App
      </h1>
      <p className="text-gray-600">
        Stay organized and get things done!
      </p>
    </header>
  );
}

export default Header;
