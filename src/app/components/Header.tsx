"use client";
import { CheckSquare } from "lucide-react";
import Link from "next/link";
import SearchBar from "./SearchBar";

const Header = ({ search, onSearchChange, showSearch = true }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:gap-6 sm:px-6">
        <Link href="/tasks" className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-text-on-primary">
            <CheckSquare className="h-4 w-4" />
          </div>
          <span className="hidden text-base font-semibold tracking-tight sm:inline text-text-main">
            Task Manager
          </span>
        </Link>

        <div className="flex-1">
          {showSearch && onSearchChange && (
            <SearchBar value={search ?? ""} onChange={onSearchChange} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
