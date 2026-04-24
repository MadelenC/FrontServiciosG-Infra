import React from "react";

export default function SearchBar({
  search,
  setSearch,
  taller,
  setTaller,
  institution,
  setInstitution,
  listaTalleres = [],
  listaInstituciones = [],
}) {
  return (
    <div className="flex flex-col md:flex-row gap-2 mb-4 items-center">

      {/* SEARCH GLOBAL */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Nombre N°..."
        className="
          w-full md:w-1/3
          px-4 py-1.5
          border border-gray-300
          rounded-md
          text-sm
          shadow-sm
          focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400
          transition
        "
      />

      {/* TALLER */}
      <select
        value={taller}
        onChange={(e) => setTaller(e.target.value)}
        className="
          w-full md:w-1/3
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
        <option value="">Seleccione taller</option>

        {listaTalleres.map((t) => (
          <option key={t.id} value={t.nombre}>
            {t.nombre}
          </option>
        ))}
      </select>

      {/* INSTITUCIÓN */}
      <select
        value={institution}
        onChange={(e) => setInstitution(e.target.value)}
        className="
          w-full md:w-1/3
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
        <option value="">Seleccione institución</option>

        {listaInstituciones.map((inst) => (
          <option key={inst.id} value={inst.id}>
            {inst.nombre}
          </option>
        ))}
      </select>

    </div>
  );
}