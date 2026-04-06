import React, { useState, useEffect } from "react";
import { useRolTravelStore } from "../../../zustand/useRolTravelStore";
import { useUserStore } from "../../../zustand/userStore";
import TravelRow from "./TravelRow";
import Pagination from "./Pagination";
import SearchBar from "../search/SearchBar";
import AddDriverForm from "../form/AddDriverForm";
import PrintTravel from "../tables/TableTravelPrint";
import { FaPlus, FaPrint } from "react-icons/fa";

export default function TableTravel() {
  const { rolTravels = [], loading, error, fetchRolTravels } = useRolTravelStore();
  const { fetchUsers, getDrivers, loading: loadingUsers } = useUserStore();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [openPanel, setOpenPanel] = useState(false);

  const drivers = getDrivers();

  // Filtrado de búsqueda
  const filteredTravels = rolTravels.filter((v) => {
    const term = search.toLowerCase();
    return (
      v?.chofer?.toLowerCase().includes(term) ||
      v?.tipoA?.toLowerCase().includes(term) ||
      v?.tipoB?.toLowerCase().includes(term) ||
      v?.tipoC?.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredTravels.length / limit);
  const currentTravels = filteredTravels.slice((page - 1) * limit, page * limit);

  useEffect(() => {
    fetchRolTravels();
    fetchUsers();
  }, [fetchRolTravels, fetchUsers]);

  // Función para registrar un chofer en el backend usando VITE_API_URL
  const handleAddDriver = async (data) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL; 
      const response = await fetch(`${API_URL}/rolTravel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al registrar chofer");
      }

      const result = await response.json();
      console.log("Chofer registrado:", result);

      // Refrescar la tabla para mostrar el nuevo registro
      fetchRolTravels();

      setOpenPanel(false);
    } catch (err) {
      console.error(err);
      alert("Error al registrar chofer: " + err.message);
    }
  };

  if (loading) return <div className="p-6 text-center">Cargando viajes...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md p-4">

      
      <div className="print:hidden">

        {/* BOTONES */}
        <div className="flex justify-end mb-4 gap-2">
          <button
            onClick={() => setOpenPanel(true)}
            className="flex items-center gap-3
             bg-gradient-to-r from-blue-600 to-blue-500
             hover:from-blue-700 hover:to-blue-600
             text-white px-5 py-3 rounded-lg shadow-lg font-medium
             focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2
             transition-all duration-300
             hover:scale-105 active:scale-95
             mb-4"   >
            <FaPlus size={14} /> Agregar Chofer
          </button>

          <button
            onClick={() => window.print()}
           className="flex items-center gap-3
             bg-gradient-to-r from-orange-600 to-orange-500
             hover:from-orange-700 hover:to-orange-600
             text-white px-5 py-3 rounded-lg shadow-lg font-medium
             focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-offset-2
             transition-all duration-300
             hover:scale-105 active:scale-95
             mb-4"   >
            <FaPrint size={14} /> Imprimir
          </button>
        </div>

        {/* BUSCADOR */}
        <SearchBar search={search} setSearch={setSearch} />

        {/* TABLA NORMAL */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-blue-50">
              <tr>
                {[
                  "ID",
                  "Chofer",
                  "TipoA",
                  "TipoB",
                  "TipoC",
                  "Cantidad",
                  "Excepciones",
                  "Fecha",
                  "Operaciones",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-4 py-3 text-left font-medium text-gray-700"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentTravels.length > 0 ? (
                currentTravels.map((travel) => (
                  <TravelRow key={travel.id} entitie={travel} />
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-gray-500">
                    No hay registros
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINACIÓN */}
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />

        {/* MODAL DE REGISTRO */}
        {openPanel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpenPanel(false)}
            />
            <div className="relative z-10 w-[420px] animate-fadeIn">
              {loadingUsers ? (
                <div className="p-4 text-center">Cargando choferes...</div>
              ) : (
                <AddDriverForm
                  choferes={drivers}
                  onSubmit={handleAddDriver} // ✅ Enviar al backend
                  onClose={() => setOpenPanel(false)}
                />
              )}
            </div>
          </div>
        )}

      </div>

      
      <div className="hidden print:block">
        <PrintTravel travels={filteredTravels} />
      </div>

    </div>
  );
}