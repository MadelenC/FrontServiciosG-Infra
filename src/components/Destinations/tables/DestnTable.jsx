import { useState, useEffect } from "react";
import SearchBar from "../search/SerachBar";
import TableDest from "./TableDestn";
import Pagination from "./Paginations";
import { useDestinoStore } from "../../../zustand/useDestinationsStore";
import { FaPlus, FaPrint } from "react-icons/fa";

export default function DestTable() {
  const { destinos = [], fetchDestinos, loading, error } = useDestinoStore();
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;

  const departments = [
    "Chuquisaca",
    "La_Paz",
    "Cochabamba",
    "Oruro",
    "Potosí",
    "Tarija",
    "Santa_Cruz",
    "Beni",
    "Pando",
  ];

  useEffect(() => {
    fetchDestinos();
  }, []);

  // Resetear página al cambiar búsqueda o filtro
  useEffect(() => {
    setPage(1);
  }, [search, departmentFilter]);

  // Función para normalizar strings (quitar acentos y pasar a minúsculas)
  const normalize = (str) =>
    str
      ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
      : "";

  // Filtrado robusto por búsqueda y departamento
  const filtered = destinos.filter((d) => {
    const searchMatch = Object.values(d).some(
      (v) => v !== undefined && normalize(String(v)).includes(normalize(search))
    );

    const departmentNormalized = normalize(departmentFilter);
    const departmentMatch =
      departmentFilter === "" ||
      normalize(d.departamentoInicio).includes(departmentNormalized) ||
      normalize(d.departamentoFinal).includes(departmentNormalized);

    return searchMatch && departmentMatch;
  });

  const totalPages = Math.ceil(filtered.length / limit);
  const currentData = filtered.slice((page - 1) * limit, page * limit);

  if (loading)
    return (
      <div className="p-4 text-center text-gray-500 animate-pulse">
        Cargando destinos...
      </div>
    );
  if (error)
    return (
      <div className="p-4 text-center text-red-500 font-semibold">{error}</div>
    );

  return (
    <div className="bg-white rounded-xl shadow-md p-4 transition-all">
      {/* Barra superior */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          {/* Search */}
          <div className="h-10 w-full sm:w-64">
            <SearchBar search={search} setSearch={setSearch} />
          </div>

          {/* Select */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="h-10 border border-gray-300 text-gray-700 px-3 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          >
            <option value="">Todos los Departamentos</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Botón de imprimir */}
        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 flex items-center gap-2">
          <FaPrint size={14} /> Imprimir
        </button>
      </div>

      {/* Tabla de destinos */}
      <TableDest data={currentData} />

      {/* Mensaje si no hay resultados */}
      {currentData.length === 0 && (
        <div className="p-4 text-center text-gray-500 col-span-full">
          No hay resultados para los filtros seleccionados.
        </div>
      )}

      {/* Paginación */}
      {currentData.length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      )}
    </div>
  );
}




