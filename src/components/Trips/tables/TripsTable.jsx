import { useState, useEffect } from "react";
import SearchBarTrips from "../search/SearchBar";
import TripsRow from "./TripsRow";
import Pagination from "./Paginations";
import AddTripsFrom from "../form/AddTripsFrom";
import CheckTripForm from "../form/TripsCheckForm";
import TripsCajaForm from "../form/TripsCajaForm";

import { useTripsStore } from "../../../zustand/useTripsStore";
import { useUserStore } from "../../../zustand/userStore";
import { useVehicleStore } from "../../../zustand/useVehicleStore";
import { useDestinoStore } from "../../../zustand/useDestinationsStore";

export default function TripsTable() {
  const { trips, fetchTrips } = useTripsStore();

  const { users, fetchUsers } = useUserStore();
  const { vehicles, fetchVehicles } = useVehicleStore();
  const { destinos, fetchDestinos } = useDestinoStore();

  const choferes = users.filter(u => u.tipo === "chofer");
  const encargados = users.filter(u => u.tipo === "encargado");

  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("");
  const [page, setPage] = useState(1);

  // 🔥 MODALES CENTRALIZADOS
  const [modalType, setModalType] = useState(null); // "caja" | "cheque" | "add"
  const [selectedTrip, setSelectedTrip] = useState(null);

  const limit = 8;

  useEffect(() => {
    fetchTrips();
    fetchUsers();
    fetchVehicles();
    fetchDestinos();
  }, []);

  useEffect(() => setPage(1), [search, tipo]);

  // 🔥 CONTROL DE MODALES
  const handleOpenModal = (type, trip = null) => {
    setModalType(type);
    setSelectedTrip(trip);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedTrip(null);
  };

  // 🔍 FILTRO
  const filteredTrips = trips.filter(t => {
    const matchesSearch =
      t.entidad?.toLowerCase().includes(search.toLowerCase()) ||
      t.objetivo?.toLowerCase().includes(search.toLowerCase());

    const matchesTipo = tipo ? t.tipo === tipo : true;

    return matchesSearch && matchesTipo;
  });

  const totalPages = Math.ceil(filteredTrips.length / limit);
  const currentTrips = filteredTrips.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-md p-4">

      {/* 🔝 HEADER */}
      <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">
        <div className="flex gap-2 items-center">
          <SearchBarTrips search={search} setSearch={setSearch} />

          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="h-10 px-3 rounded-lg border"
          >
            <option value="">Todos</option>
            <option value="Viaje de Práctica">Viaje de Práctica</option>
            <option value="Viaje de Inspección">Viaje de Inspección</option>
            <option value="Viaje Académico">Viaje Académico</option>
            <option value="Viaje de Cultura">Viaje de Cultura</option>
          </select>
        </div>

        <button
          onClick={() => handleOpenModal("add")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Agregar Viaje
        </button>
      </div>

      {/* 📊 TABLA */}
      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              {[
                "#",
                "Entidad",
                "Tipo",
                "Objetivo",
                "Días",
                "Pasajeros",
                "Inicio",
                "Fin",
                "Estado",
                "Acciones",
              ].map(h => (
                <th key={h} className="px-3 py-2 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentTrips.length > 0 ? (
              currentTrips.map(trip => (
                <TripsRow
                  key={trip.id}
                  trip={trip}
                  onOpenModal={handleOpenModal}
                />
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center py-4">
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📄 PAGINACIÓN */}
      <div className="flex justify-center mt-4">
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>

      {/* ================= MODALES ================= */}

      {/* ➕ AGREGAR */}
      {modalType === "add" && (
        <AddTripsFrom
          isOpen={true}
          initialData={null}
          choferes={choferes}
          encargados={encargados}
          vehiculos={vehicles}
          destinos={destinos}
          onClose={handleCloseModal}
          onSave={(data) => {
            console.log("Nuevo viaje:", data);
            handleCloseModal();
          }}
        />
      )}

      {/* 💰 CAJA */}
      {modalType === "caja" && (
        <TripsCajaForm
          viajeData={selectedTrip}
          choferes={choferes}
          encargados={encargados}
          vehiculos={vehicles}
          onClose={handleCloseModal}
          onSubmit={(data) => {
            console.log("Caja:", data);
            handleCloseModal();
          }}
        />
      )}

      {/* 🧾 CHEQUE */}
      {modalType === "cheque" && (
        <CheckTripForm
          data={selectedTrip}
          onClose={handleCloseModal}
          choferes={choferes}
          encargados={encargados}
          vehiculos={vehicles}
        />
      )}
    </div>
  );
}