import { useState, useEffect, useMemo } from "react";

import TableTripReport from "./TableTripReport";
import SearchBar from "../Search/SearchBar";
import Pagination from "./Pagination";
import { FiPlus } from "react-icons/fi";

import { useTripReportStore } from "../../../zustand/useTripReportStore";
import { useUserStore } from "../../../zustand/userStore";
import { useVehicleStore } from "../../../zustand/useVehicleStore";

export default function TripReportTable({ externalTripId = null }) {

  const {
    tripReports,
    fetchTripReports,
    addTripReport,
    editTripReport,
    removeTripReport,
  } = useTripReportStore();

  const { users, fetchUsers } = useUserStore();
  const { vehicles, fetchVehicles } = useVehicleStore();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 8;

  useEffect(() => {
    fetchTripReports();
    fetchUsers();
    fetchVehicles();
  }, []);

  useEffect(() => setPage(1), [search]);

  // 🔥 FIX PRINCIPAL: ENRIQUECER DATOS
  const enrichedTrips = useMemo(() => {
    return tripReports.map((t) => {

      const vehiculoId = t.vehiculo?.id || t.vehiculo;
      const choferId = t.chofer?.id || t.chofer;
      const encargadoId = t.encargado?.id || t.encargado;

      const vehiculo = vehicles.find(
        v => Number(v.id) === Number(vehiculoId)
      );

      const chofer = users.find(
        u => Number(u.id) === Number(choferId)
      );

      const encargado = users.find(
        u => Number(u.id) === Number(encargadoId)
      );

      return {
        ...t,

        vehiculoNombre: vehiculo?.placa || "Sin vehículo",

        choferNombre: chofer
          ? `${chofer.nombres} ${chofer.apellidos}`
          : "Sin chofer",

        encargadoNombre: encargado
          ? `${encargado.nombres} ${encargado.apellidos}`
          : "Sin encargado",
      };
    });
  }, [tripReports, users, vehicles]);

  // 🔍 FILTER
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

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">

        <SearchBar search={search} setSearch={setSearch} />

        {!externalTripId && (
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
            <FiPlus size={18} />
            Nuevo Informe
          </button>
        )}

      </div>

      {/* TABLE */}
      <TableTripReport
        tripReports={currentData}
        onEdit={() => {}}
        onDelete={() => {}}
      />

      {/* PAGINATION */}
      <div className="flex justify-center mt-4">
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>

    </div>
  );
}