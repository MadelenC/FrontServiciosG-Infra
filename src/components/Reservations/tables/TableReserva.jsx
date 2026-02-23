import { useState, useEffect } from "react";
import SearchBar from "../search/SearchBar";
import ReservaTable from "./ReservaTable";
import Pagination from "./Paginations";
import { useReservaStore } from "../../../zustand/useReservationsStore";

export default function TableReserva() {
  const { reservas, fetchReservas, loading, error } = useReservaStore();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    fetchReservas();
  }, []);

  useEffect(() => {
    setPage(1); // Reset página al cambiar búsqueda
  }, [search]);

  const filtered = reservas.filter((r) =>
    r.entidad.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / limit);
  const currentData = filtered.slice((page - 1) * limit, page * limit);

  if (loading) return <div className="p-4 text-center">Cargando reservas...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      {/* Buscador */}
      <div className="flex justify-between items-center mb-4 gap-4">
        <SearchBar search={search} setSearch={setSearch} />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
          Imprimir
        </button>
      </div>

      {/* Tabla */}
      <ReservaTable reservas={currentData} />

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
}