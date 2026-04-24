import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../zustand/AuthUsers";
import { SlLogin } from "react-icons/sl";

export default function UserDropdown() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore(); 
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Tomar la primera letra del nombre
  const userInitial = user?.nombres?.[0]?.toUpperCase() || "U";

  return (
    <div className="relative inline-block">
      {/* Botón del usuario sin fondo */}
      <button
        onClick={toggleDropdown}
        className="px-0 py-0 cursor-pointer flex items-center gap-2 transition-colors"
      >
        {/* Círculo con inicial */}
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
          {userInitial}
        </div>
        {/* Nombre completo */}
        <span className="text-white dark:text-white">
          {user ? `${user.nombres || "Usuario"} ${user.apellidos}` : "Usuario"}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-1 min-w-[150px] rounded-lg shadow-md border border-gray-300 bg-white dark:border-[#151735] dark:bg-[#151627] dark:text-white z-50"
        >
          <p
            className="px-3 py-2 m-0 cursor-pointer text-red-600 dark:text-white hover:bg-gray-100 dark:hover:bg-[#151735] transition-colors flex items-center gap-2"
            onClick={() => {
              logout(); // limpiar sesión
              setIsOpen(false); // cerrar dropdown
              navigate("/signin"); // redirigir a signin
            }}
          >
            <SlLogin className="w-5 h-5" />
            Cerrar sesión
          </p>
        </div>
      )}
    </div>
  );
}
