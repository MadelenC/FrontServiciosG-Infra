import React from "react";

export default function SearchBarEntitie({ search, setSearch }) {
  return (
    <div className="flex justify-start mb-4">
      <input
        type="text"
        placeholder="Buscar por origen o destino"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full 
          md:max-w-xs 
          px-3 
          py-2 
          border 
          border-gray-300 
          rounded-lg 
          shadow-sm 
          text-sm
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-400 
          focus:border-blue-400 
          transition
        "
      />
    </div>
  );
}