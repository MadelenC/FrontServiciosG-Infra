import React from "react";

export default function SearchBarEntitie({ search, setSearch }) {
  return (
    <div className="flex flex-col md:flex-row justify-start mb-4 gap-2 items-center">
      <input
        type="text"
        placeholder="Buscar por facultad"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-30 md:w-1/1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
      />
    </div>
  );
}
