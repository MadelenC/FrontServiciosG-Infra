import React from "react";

export default function SearchBarApplication({
  institution,
  setInstitution,
  listaInstituciones = [],
}) {
  return (
    <div className="flex flex-col md:flex-row justify-start mb-4 gap-2 items-center">

      {/* Select Institución */}
      <select
        value={institution}
        onChange={(e) => setInstitution(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Seleccione una institución</option>

        {listaInstituciones?.map((inst) => (
          <option key={inst.id} value={inst.id}>
            {inst.nombre}
          </option>
        ))}
      </select>

    </div>
  );
}