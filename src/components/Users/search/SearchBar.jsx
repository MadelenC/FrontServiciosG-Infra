import React, { useRef, useEffect, useState } from "react";
import { useRoleStore } from "../../../zustand/rolesStore";
import { SlArrowDown } from "react-icons/sl";

export default function SearchBar({ search, setSearch, roleFilter, setRoleFilter }) {
  const { roles } = useRoleStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar dropdown si se hace click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center gap-2">

      {/* DROPDOWN ROLES */}
      <div className="relative w-full md:w-1/4" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="
            w-full flex items-center justify-between
            px-3 py-1.5
            border border-gray-300
            rounded-md
            bg-white
            text-sm text-gray-700
            focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400
            transition
          "
        >
          <span>
            {roleFilter
              ? roleFilter.charAt(0).toUpperCase() + roleFilter.slice(1)
              : "Filtrar por rol"}
          </span>
          <SlArrowDown className="text-xs opacity-70" />
        </button>

        {dropdownOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-sm max-h-60 overflow-auto text-sm">
            <li
              className={`px-3 py-1.5 cursor-pointer hover:bg-blue-50 ${
                roleFilter === "" ? "bg-blue-50" : ""
              }`}
              onClick={() => {
                setRoleFilter("");
                setDropdownOpen(false);
              }}
            >
              Todos
            </li>

            {roles.map((role) => (
              <li
                key={role}
                className={`px-3 py-1.5 cursor-pointer hover:bg-blue-50 ${
                  roleFilter === role ? "bg-blue-50" : ""
                }`}
                onClick={() => {
                  setRoleFilter(role);
                  setDropdownOpen(false);
                }}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* INPUT BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar usuario..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full md:w-1/2
          px-3 py-1.5
          border border-gray-300
          rounded-md
          text-sm
          focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400
          transition
        "
      />
    </div>
  );
}
