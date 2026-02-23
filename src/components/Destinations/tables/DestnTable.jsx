import { useState, useEffect } from "react";
import SearchBar from "../search/SerachBar";
import TableDest from "./TableDestn";
import Pagination from "./Paginations";
import { useDestinoStore } from "../../../zustand/useDestinationsStore";

export default function DestTable() {
  const { destinos = [], fetchDestinos, loading, error } = useDestinoStore();
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  const departments = [
    "Chuquisaca",
    "La Paz",
    "Cochabamba",
    "Oruro",
    "Potosí",
    "Tarija",
    "Santa Cruz",
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

  const normalize = (str) =>
    str
      ? str
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
      : "";

  const filtered = destinos.filter((d) => {
    const searchMatch = Object.values(d).some(
      (v) => v !== undefined && String(v).toLowerCase().includes(search.toLowerCase())
    );

    const departmentMatch =
      departmentFilter === "" ||
      normalize(d.departamentoInicio) === normalize(departmentFilter) ||
      normalize(d.departamentoFinal) === normalize(departmentFilter);

    return searchMatch && departmentMatch;
  });

  const totalPages = Math.ceil(filtered.length / limit);
  const currentData = filtered.slice((page - 1) * limit, page * limit);

  if (loading) return <div className="p-4 text-center">Cargando destinos...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (!loading && filtered.length === 0)
    return <div className="p-4 text-center text-gray-500">No hay resultados para los filtros seleccionados.</div>;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      {/* Barra superior */}
      <div className="flex justify-between items-center mb-4 gap-4">
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="h-10 w-64">
            <SearchBar search={search} setSearch={setSearch} />
          </div>

          {/* Select */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="h-10 border border-gray-300 text-gray-700 px-3 rounded-md hover:bg-gray-50"
          >
            <option value="">Todos los Departamentos</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
+
        <button className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm">
          Imprimir
        </button>
      </div>


      <TableDest data={currentData} />

    
      <div className="flex justify-center mt-4">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
}




