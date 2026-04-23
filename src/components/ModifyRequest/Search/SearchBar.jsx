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
        placeholder="Buscar..."
        className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
      />

      {/* TALLER */}
      <select
        value={taller}
        onChange={(e) => setTaller(e.target.value)}
        className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
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
        className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
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