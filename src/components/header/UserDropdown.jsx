import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../zustand/AuthUsers";

import {
  SlLogin,
  SlUser,
} from "react-icons/sl";

export default function UserDropdown() {

  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const userInitial =
    user?.nombres?.[0]?.toUpperCase() || "U";

  return (

    <div className="relative inline-block">

     
      <button
        onClick={toggleDropdown}
        className="
          flex items-center gap-3
          px-3 py-2
          rounded-xl
          transition-all duration-200
          hover:bg-white/10
          dark:hover:bg-white/5
        "
      >

       
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover shadow-md  border border-white/20" 
          />
            ) : (
          <div
            className="  w-10 h-10 rounded-full bg-gradient-to-br  from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm  shadow-md  border border-white/20  "> {userInitial}
          </div>
        )}

    
        <div className="flex flex-col items-start">

          <span
            className="
              text-sm font-semibold
              text-white dark:text-white
              leading-none
            "
          >
            {user
              ? `${user.nombres || "Usuario"} ${user.apellidos || ""}`
              : "Usuario"}
          </span>

          <span
            className="
              text-[11px]
              text-gray-300
            "
          >
            Usuario activo
          </span>

        </div>

      </button>

      
      {isOpen && (

        <div
          className="
            absolute right-0 mt-3
            w-56
            rounded-2xl
            overflow-hidden
            border border-gray-200
            dark:border-[#2A2D4A]
            bg-white
            dark:bg-[#151627]
            shadow-2xl
            z-50
            animate-in fade-in zoom-in-95
          "
        >

          <div
            className="
              px-4 py-3
              border-b border-gray-200
              dark:border-[#2A2D4A]
            "
          >

            <p
              className="
                text-sm font-semibold
                text-gray-800 dark:text-white
              "
            >
              {user?.nombres} {user?.apellidos}
            </p>

            <p
              className="
                text-xs text-gray-500
                dark:text-gray-400
              "
            >
              {user?.email || "Sin correo"}
            </p>

          </div>

         
          <button
            className="
              w-full
              flex items-center gap-3
              px-4 py-3
              text-sm
              text-gray-700
              dark:text-gray-200
              hover:bg-gray-100
              dark:hover:bg-[#1D203D]
              transition-colors
            "
            onClick={() => {
              setIsOpen(false);
              navigate("/profile");
            }}
          >

            <SlUser className="w-4 h-4" />

            Ver perfil

          </button>

         
          <button
            className="
              w-full
              flex items-center gap-3
              px-4 py-3
              text-sm
              text-red-600
              hover:bg-red-50
              dark:hover:bg-red-900/20
              transition-colors
            "
            onClick={() => {
              logout();
              setIsOpen(false);
              navigate("/home");
            }}
          >

            <SlLogin className="w-4 h-4" />

            Cerrar sesión

          </button>

        </div>

      )}

    </div>
  );
}
