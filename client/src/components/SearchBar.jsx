import React from 'react';

export default function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search menu items..."
        className="p-2 border rounded w-full"
      />
    </div>
  );
}