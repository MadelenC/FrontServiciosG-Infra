import React, { useState } from "react";

import UsersReportButton
from "../../pdf-buttons/UsersReportButton";
export default function ReportUserForm( onClose ) {

  const [tipoUsuario, setTipoUsuario] = useState("");

  return (

    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
     
    <div className=" relative w-full max-w-md mx-auto bg-white p-5 rounded-lg shadow-md border border-gray-200 dark:bg-gray-700">
      <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-300"
        >
          X
        </button>
      <h2 className="text-center text-gray-700 font mb-4  dark:text-gray-200">
        Reporte de Usuarios
      </h2>

      <div className="flex flex-col gap-1 mb-4 ">

        <label className="text-sm text-gray-600 dark:text-gray-200">
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
            focus:outline-none
            focus:ring-1
            focus:ring-blue-400
            focus:border-blue-400
            transition
            dark:bg-gray-400
          "
        >

          <option value=""> Todos</option>

          <option value="administradorserv">
            Administrador
          </option>

          <option value="encargadoserv">
            Encargado
          </option>

          <option value="mensajeroserv">
            Mensajero
          </option>

          <option value="electricista">
            Electricista
          </option>

          <option value="sergeneral">
            Servicios generales
          </option>

          <option value="supervisor">
            Supervisor
          </option>

          <option value="mantenimiento">
            Mantenimiento
          </option>

          <option value="carpintero">
            Carpintero
          </option>

          <option value="albañil">
            Albañil
          </option>

          <option value="plomero">
            Plomero
          </option>

          <option value="seguridad">
            Seguridad
          </option>

        </select>

      </div>

      <UsersReportButton
        tipo={tipoUsuario}
        title={
          tipoUsuario === ""
            ? "Imprimir Reporte de usuarios"
            : `Reporte de ${tipoUsuario}`
        }
      />

    </div>
</div>
  );

}