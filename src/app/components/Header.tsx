"use client";
import { Moon, Sun, CheckSquare } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { useTheme } from "../hooks/useTheme";
import Link from "next/link";

const Header = ({ search, onSearchChange, showSearch = true }: HeaderProps) => {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-gray-100">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:gap-6 sm:px-6">
        <Link href="/tasks" className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white">
            <CheckSquare className="h-4 w-4" />
          </div>
          <span className="hidden text-base font-semibold tracking-tight sm:inline text-gray-900">
            Task Manager
          </span>
        </Link>

        <div className="flex-1">
          {showSearch && onSearchChange && (
            <SearchBar value={search ?? ""} onChange={onSearchChange} />
          )}
        </div>

        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="flex h-9 w-9 items-center justify-center rounded-lg border bg-white border-gray-200 text-gray-600 hover:bg-gray-200 cursor-pointer"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
