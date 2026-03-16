import { useState, useEffect } from "react";
import SearchBarTrips from "../search/SearchBar";
import TripsRow from "./TripsRow";
import Pagination from "./Paginations";
import AddTripsFrom from "../form/AddTripsFrom";
import { useTripsStore } from "../../../zustand/useTripsStore";
import { useUserStore } from "../../../zustand/userStore";
import { useVehicleStore } from "../../../zustand/useVehicleStore";
import { useDestinoStore } from "../../../zustand/useDestinationsStore";

export default function TripsTable() {
  const { trips, fetchTrips, loading, error } = useTripsStore();

  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const limit = 8;

  // Stores para modal
  const { users, fetchUsers } = useUserStore();
  const choferes = users.filter(u => u.tipo === "chofer");
  const encargados = users.filter(u => u.tipo === "encargado");

  const { vehicles, fetchVehicles } = useVehicleStore();
  const { destinos, fetchDestinos } = useDestinoStore();

  useEffect(() => {
    fetchTrips();
    fetchUsers();
    fetchVehicles();
    fetchDestinos();
  }, []);

  // Reiniciar página si cambia búsqueda o tipo
  useEffect(() => setPage(1), [search, tipo]);

  const filteredTrips = trips.filter(t => {
    const matchesSearch =
      t.entidad?.toLowerCase().includes(search.toLowerCase()) ||
      t.objetivo?.toLowerCase().includes(search.toLowerCase());
    const matchesTipo = tipo ? t.tipo === tipo : true;
    return matchesSearch && matchesTipo;
  });

  const totalPages = Math.ceil(filteredTrips.length / limit);
  const currentTrips = filteredTrips.slice((page - 1) * limit, page * limit);

  const handleSaveTrip = (data) => {
    console.log("Viaje guardado:", data);
    setIsModalOpen(false);
    // Aquí podrías llamar a tu store para guardar el viaje
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all p-4">
      {/* Barra superior: Buscador + select + agregar */}
      <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">
        <div className="flex gap-2 items-center">
          <SearchBarTrips search={search} setSearch={setSearch} />
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="h-10 px-3 rounded-lg border border-gray-300 text-gray-700"
          >
            <option value="">Todos los tipos</option>
            <option value="Viaje de Práctica">Viaje de Práctica</option>
            <option value="Viaje de Inspección">Viaje de Inspección</option>
            <option value="Viaje Académico">Viaje Académico</option>
            <option value="Viaje de Cultura">Viaje de Cultura</option>
          </select>
        </div>

        <button
          onClick={() => { setSelectedTrip(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-lg font-medium transition"
        >
          <span className="text-lg font-bold text-white">＋</span> Agregar Viaje
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto w-full rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full border-collapse text-sm bg-white">
          <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
            <tr>
              {[
                "#",
                "Entidad",
                "Tipo",
                "Objetivo",
                "Días",
                "Pasajeros",
                "Fecha Inicial",
                "Fecha Final",
                "Estado",
                "Operaciones",
              ].map(h => (
                <th key={h} className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentTrips.length > 0 ? (
              currentTrips.map(trip => <TripsRow key={trip.id} trip={trip} />)
            ) : (
              <tr>
                <td colSpan={10} className="text-center py-4 text-gray-500">
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <AddTripsFrom
          isOpen={true}
          initialData={selectedTrip}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTrip}
          choferes={choferes}
          encargados={encargados}
          vehiculos={vehicles}
          destinos={destinos}
        />
      )}
    </div>
  );
}