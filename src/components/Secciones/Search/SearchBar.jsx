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
        className="
          w-full md:w-1/2
          px-4 py-1.5
          border border-gray-300
          rounded-md
          text-sm
          bg-white
          shadow-sm
          focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400
          transition
        "
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