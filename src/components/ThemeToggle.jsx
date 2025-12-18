import React from "react";
import { useTheme } from "../ThemeProvider";

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full border transition-colors"
    >
      {theme === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.293 13.293A8 8 0 116.707 2.707a6 6 0 0010.586 10.586z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 3a1 1 0 011 1v1a1 1 0 11-2 0V4a1 1 0 011-1zm0 12a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4.22 5.22a1 1 0 011.42 0L6.64 6.24a1 1 0 11-1.42 1.42L4.22 6.64a1 1 0 010-1.42zM14.36 15.36a1 1 0 011.42 0l1 1a1 1 0 11-1.42 1.42l-1-1a1 1 0 010-1.42zM3 10a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zm12 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM4.22 14.78a1 1 0 010-1.42l1-1a1 1 0 111.42 1.42l-1 1a1 1 0 01-1.42 0zM14.36 4.64a1 1 0 010-1.42l1-1A1 1 0 1116.78 3.64l-1 1a1 1 0 01-1.42 0zM10 6a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
