import { useState, useEffect } from "react";
import SearchBarTrips from "../search/SearchBar";
import TripsRow from "./TripsRow";
import Pagination from "./Paginations";
import AddTripsFrom from "../form/AddTripsFrom";
import CheckTripForm from "../form/TripsCheckForm";
import TripsCajaForm from "../form/TripsCajaForm";
import TripDeclarationForm from "../form/TripDeclarationForm";

import { FiFileText, FiBarChart2, FiPlus } from "react-icons/fi";

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

  const [modalType, setModalType] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const limit = 8;

  useEffect(() => {
    fetchTrips();
    fetchUsers();
    fetchVehicles();
    fetchDestinos();
  }, []);

  useEffect(() => setPage(1), [search, tipo]);

  const handleOpenModal = (type, trip = null) => {
    setModalType(type);
    setSelectedTrip(trip);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedTrip(null);
  };

  const handleCancelTrip = (id) => {
    const updated = trips.map(t =>
      t.id === id ? { ...t, estado: "Cancelado" } : t
    );

    useTripsStore.setState({ trips: updated });
  };

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

  const SimpleModal = ({ title, children }) => (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[420px] p-6">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        <div className="text-sm text-gray-600">
          {children}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleCloseModal}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">

        {/* SEARCH + FILTER */}
        <div className="flex items-center gap-2 h-10">
          <SearchBarTrips search={search} setSearch={setSearch} />

          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="h-full px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Todos</option>
            <option value="Viaje de Práctica">Viaje de Práctica</option>
            <option value="Viaje de Inspección">Viaje de Inspección</option>
            <option value="Viaje Académico">Viaje Académico</option>
            <option value="Viaje de Cultura">Viaje de Cultura</option>
          </select>
        </div>

        {/* BOTONES */}
        <div className="flex gap-2 flex-wrap">

          <button
            onClick={() => handleOpenModal("declaratoria")}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg"
          >
            <FiFileText size={18} />
            Declaratorias
          </button>

          <button
            onClick={() => handleOpenModal("informe")}
            className="flex items-center gap-2 bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-lg"
          >
            <FiBarChart2 size={18} />
            Informe
          </button>

          {/* 🔥 ESTE ES EL QUE SE ROMPIA */}
          <button
            onClick={() => handleOpenModal("add")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <FiPlus size={18} />
            Agregar Viaje
          </button>

        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">

        <table className="w-full text-sm bg-white border-collapse">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
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
                <th
                  key={h}
                  className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700"
                >
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
                  onCancelTrip={handleCancelTrip}
                />
              ))
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

      {/* PAGINATION */}
      <div className="flex justify-center mt-4">
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>

      {/* MODALES */}
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

      {modalType === "caja" && (
        <TripsCajaForm
          viajeData={selectedTrip}
          onClose={handleCloseModal}
        />
      )}

      {modalType === "cheque" && (
        <CheckTripForm
          data={selectedTrip}
          onClose={handleCloseModal}
        />
      )}

      {modalType === "declaratoria" && (
        <TripDeclarationForm
          onClose={handleCloseModal}
          onSubmit={(data) => {
            console.log("Declaratoria:", data);
            handleCloseModal();
          }}
        />
      )}

      {modalType === "informe" && (
        <SimpleModal title="Informe de Viajes">
          Aquí podrás generar reportes de viajes.
        </SimpleModal>
      )}

    </div>
  );
}