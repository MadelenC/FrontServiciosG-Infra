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

import { toast } from "react-toastify";

export default function TripsTable({ externalTripId = null }) {

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

    const matchesId = externalTripId
      ? Number(t.id) === Number(externalTripId)
      : true;

    return matchesSearch && matchesTipo && matchesId;
  });

  const totalPages = Math.ceil(filteredTrips.length / limit);

  const currentTrips = filteredTrips.slice(
    (page - 1) * limit,
    page * limit
  );

  const SimpleModal = ({ title, children }) => (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-[420px] p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          {title}
        </h2>

        <div className="text-sm text-gray-600 dark:text-gray-300">
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
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">

        <div className="flex items-center gap-2 h-10">
          <SearchBarTrips search={search} setSearch={setSearch} />

          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="h-full px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            <option value="">Todos</option>
            <option value="Viaje de Práctica">Viaje de Práctica</option>
            <option value="Viaje de Inspección">Viaje de Inspección</option>
            <option value="Viaje Académico">Viaje Académico</option>
            <option value="Viaje de Cultura">Viaje de Cultura</option>
          </select>
        </div>

        <div className="flex gap-2 flex-wrap">

          <button
            onClick={() => handleOpenModal("declaratoria")}
            className="flex items-center gap-3 bg-gradient-to-r from-gray-700 to-gray-500
             hover:from-gray-700 hover:to-gray-600 text-white px-5 py-3 rounded-lg shadow-lg"
          >
            <FiFileText />
            Declaratorias
          </button>

          <button
            onClick={() => handleOpenModal("informe")}
            className="flex items-center gap-3 bg-blue-800 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-lg"
          >
            <FiBarChart2 />
            Informe
          </button>

          {!externalTripId && (
            <button
              onClick={() => handleOpenModal("add")}
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-lg shadow-lg"
            >
              <FiPlus />
              Agregar Viaje
            </button>
          )}

        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-xl">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <tr>
              {["#", "Entidad", "Tipo", "Objetivo", "Días", "Pasajeros", "Inicio", "Fin", "Estado", "Acciones"].map(h => (
                <th key={h} className="px-3 py-2 border border-gray-200 dark:border-gray-700">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-gray-700 dark:text-gray-200">
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
                <td colSpan={10} className="text-center py-4 text-gray-500 dark:text-gray-400">
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

      {/* MODALS */}
      {modalType === "add" && (
        <AddTripsFrom
          isOpen={true}
          initialData={null}
          choferes={choferes}
          encargados={encargados}
          vehiculos={vehicles}
          destinos={destinos}
          onClose={handleCloseModal}
          onSave={async (data) => {
            try {
              const res = await fetch("http://localhost:3000/api/viajes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });

              const text = await res.text();

              let result;
              try {
                result = JSON.parse(text);
              } catch (e) {
                throw new Error("Backend no devolvió JSON válido");
              }

              if (!res.ok) throw new Error(result?.message);

              toast.success("Viaje registrado correctamente!");
              await fetchTrips();
              handleCloseModal();

            } catch (error) {
              toast.error(error.message);
            }
          }}
        />
      )}

      {modalType === "caja" && (
        <TripsCajaForm viajeData={selectedTrip} onClose={handleCloseModal} />
      )}

      {modalType === "cheque" && (
        <CheckTripForm data={selectedTrip} onClose={handleCloseModal} />
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