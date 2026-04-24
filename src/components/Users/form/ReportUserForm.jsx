import React, { useState } from "react";

export default function ReportUserForm({ onPrint }) {
  const [tipoUsuario, setTipoUsuario] = useState("");

  const handlePrint = () => {
    if (onPrint) {
      onPrint(tipoUsuario);
    } else {
      console.log("Imprimir reporte de:", tipoUsuario);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-5 rounded-lg shadow-md border border-gray-200">

      {/* TITULO */}
      <h2 className="text-center text-gray-700 font-semibold mb-4">
        Reporte de Usuarios
      </h2>

      {/* SELECT */}
      <div className="flex flex-col gap-1 mb-4">
        <label className="text-sm text-gray-600">
          Tipo de usuario
        </label>

        <select
          value={tipoUsuario}
          onChange={(e) => setTipoUsuario(e.target.value)}
          className="
            px-4 py-2
            border border-gray-300
            rounded-md
            text-sm
            bg-white
            focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400
            transition
          "
        >
          <option value="">Todos</option>
          <option value="administrador">Administrador</option>
           <option value="encargados">Encargados</option>
           <option value="mensajero">Mensajero</option>
            <option value="electricista">Electricista</option>
           <option value="m. general">m. general</option>
           <option value="mantenimiento">mantenimiento</option>
           <option value="carpintero">carpintero</option>
           <option value="albañil">albañil</option>
          <option value="plomero">plomero</option>
          <option value="ser. general">ser. general</option>
           <option value="jardineria">jardineria</option>
          <option value="supervisor">Supervisor</option>
          <option value="chofer">Chofer</option>
        
          
        </select>
      </div>

      {/* BOTÓN IMPRIMIR */}
      <button
        onClick={handlePrint}
        className="
          w-full
          flex items-center justify-center gap-2
          bg-gray-800 hover:bg-gray-900
          text-white
          py-2
          rounded-md
          text-sm
          shadow-sm
          transition
          hover:scale-[1.02] active:scale-95
          focus:outline-none focus:ring-2 focus:ring-gray-400
        "
      >
        🖨 Imprimir
      </button>

    </div>
  );
}