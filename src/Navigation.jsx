import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import ThemeToggle from "./components/ThemeToggle";
import { ChevronDown } from "lucide-react";

const Navigation = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between my-1 shadow px-2 items-center">
      {/* Brand Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-2 text-3xl sm:text-5xl font-bold focus:outline-none">
          Postiq-Author
          <ChevronDown className="w-6 h-6 mt-1" />
        </button>

        <div className="absolute left-0 mt-2 w-56 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <span className="block px-4 py-2 text-gray-400 cursor-default">
            Postiq – Author
          </span>

          <a
            href="https://blogpublictop.netlify.app"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            Postiq – Public
          </a>
        </div>
      </div>

      {/* Nav Links */}
      <div className="flex gap-4 mr-1 items-center">
        <Link
          to="/"
          className="text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          Home
        </Link>

        <div className="ms-3">
          <ThemeToggle />
        </div>

        {user ? (
          <>
            <Link
              to="/create"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Create Post
            </Link>

            <Link
              to="/myposts"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              My Posts
            </Link>

            <span className="text-sm text-gray-600">
              {user?.name ? `Hi, ${user.name}` : `Hi`}
            </span>

            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Register
            </Link>

            <Link
              to="/login"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
