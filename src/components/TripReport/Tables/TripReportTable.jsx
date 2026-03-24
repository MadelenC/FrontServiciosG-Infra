import { useState, useEffect, useMemo } from "react";

import TableTripReport from "./TableTripReport";
import SearchBar from "../Search/SearchBar";
import Pagination from "./Pagination";
import { FiPlus } from "react-icons/fi";

import { useTripReportStore } from "../../../zustand/useTripReportStore";
import { useUserStore } from "../../../zustand/userStore";
import { useVehicleStore } from "../../../zustand/useVehicleStore";

import UpdateKmForm from "../Form/UpdateKmForm";

export default function TripReportTable({ externalTripId = null }) {

  const {
    tripReports,
    fetchTripReports,
    editTripReport,
  } = useTripReportStore();

  const { users, fetchUsers } = useUserStore();

  const {
    vehicles,
    fetchVehicles,
    editVehicle
  } = useVehicleStore();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [openUpdateKmPanel, setOpenUpdateKmPanel] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const limit = 8;

  useEffect(() => {
    fetchTripReports();
    fetchUsers();
    fetchVehicles();
  }, []);

  useEffect(() => setPage(1), [search]);

  // ENRIQUECER
  const enrichedTrips = useMemo(() => {
    return tripReports.map((t) => {

      const vehiculoId = t.vehiculo?.id || t.vehiculo;
      const choferId = t.chofer?.id || t.chofer;
      const encargadoId = t.encargado?.id || t.encargado;

      const vehiculo = vehicles.find(v => Number(v.id) === Number(vehiculoId));
      const chofer = users.find(u => Number(u.id) === Number(choferId));
      const encargado = users.find(u => Number(u.id) === Number(encargadoId));

      return {
        ...t,
        vehiculoNombre: vehiculo?.placa || "Sin vehículo",
        choferNombre: chofer ? `${chofer.nombres} ${chofer.apellidos}` : "Sin chofer",
        encargadoNombre: encargado ? `${encargado.nombres} ${encargado.apellidos}` : "Sin encargado",
        vehiculoObj: vehiculo
      };
    });
  }, [tripReports, users, vehicles]);

  const filtered = enrichedTrips.filter(t => {
    const s = search.toLowerCase();
    return (
      t.vehiculoNombre?.toLowerCase().includes(s) ||
      t.choferNombre?.toLowerCase().includes(s) ||
      t.encargadoNombre?.toLowerCase().includes(s)
    );
  });

  const totalPages = Math.ceil(filtered.length / limit);

  const currentData = filtered.slice(
    (page - 1) * limit,
    page * limit
  );

  // 🔥 CLICK KM
  const handleUpdateKm = (trip) => {

    if (!trip.vehiculoObj) {
      alert("Vehículo no encontrado");
      return;
    }

    setSelectedVehicle(trip.vehiculoObj);
    setSelectedTrip(trip);
    setOpenUpdateKmPanel(true);
  };

  return (
    <div className="p-4">

      <div className="flex justify-between mb-4">
        <SearchBar search={search} setSearch={setSearch} />

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-2">
          <FiPlus /> Nuevo Informe
        </button>
      </div>

      <TableTripReport
        tripReports={currentData}
        onUpdateKm={handleUpdateKm}
      />

      <div className="flex justify-center mt-4">
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>

      {/* MODAL */}
      {openUpdateKmPanel && selectedVehicle && selectedTrip && (
        <UpdateKmForm
          vehicle={selectedVehicle}
          onClose={() => setOpenUpdateKmPanel(false)}
          onUpdateKm={async (updatedVehicle) => {

            // VEHÍCULO
            const resVehicle = await editVehicle(updatedVehicle.id, updatedVehicle);
            if (!resVehicle.ok) return alert(resVehicle.error);

            // CALCULAR KM
            const nuevoKm = updatedVehicle.kilometraje;
            const kmSalida = Number(selectedTrip.kilopartida || 0);

            if (nuevoKm < kmSalida) {
              return alert("Km inválido");
            }

            const kmTotal = nuevoKm - kmSalida;

            // TRIP
            const resTrip = await editTripReport(selectedTrip.id, {
              ...selectedTrip,
              kilollegada: nuevoKm,
              kmtotal: kmTotal,
            });

            if (!resTrip.ok) return alert(resTrip.error);

            alert("Actualizado correctamente 🚀");

            await fetchVehicles();
            await fetchTripReports();

            setOpenUpdateKmPanel(false);
          }}
        />
      )}

    </div>
  );
}