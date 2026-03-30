import React, { useState, useEffect } from "react";
import KardexRow from "./kardexRow";
import Pagination from "./Pagination";
import UpdateKmForm from "../Form/UpdateKmForm";
import { useMaintenanceStore } from "../../../zustand/useMaintenanceStore";

export default function KardexTable({ onRealizar }) {
  const { maintenances, fetchMaintenances, updateMaintenance } = useMaintenanceStore();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 8;

  /** Modal de actualizar KM */
  const [updateKmOpen, setUpdateKmOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Abrir modal de KM
  const handleOpenUpdateKm = (vehicle) => {
    setSelectedVehicle(vehicle);
    setUpdateKmOpen(true);
  };

  // Cerrar modal de KM
  const handleCloseUpdateKm = () => {
    setSelectedVehicle(null);
    setUpdateKmOpen(false);
  };

  // Guardar cambios de KM desde el modal
  const handleSaveUpdateKm = async (updatedVehicle) => {
    // Llamas al store para actualizar el mantenimiento
    await updateMaintenance(updatedVehicle.id, { kilometraje: updatedVehicle.kilometraje });
    fetchMaintenances(); // refresca tabla
    handleCloseUpdateKm(); // cierra modal
  };

  // Cargar mantenimientos al montar el componente
  useEffect(() => {
    fetchMaintenances();
  }, []);

  // Resetea página cuando cambia el filtro
  useEffect(() => setPage(1), [search]);

  const filtered = maintenances?.filter((m) =>
    m.descripcion?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const totalPages = Math.ceil(filtered.length / limit);
  const currentData = filtered.slice((page - 1) * limit, page * limit);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md p-4">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar por descripción..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-1 rounded shadow-sm"
        />
        <button
          onClick={() => window.print()}
          className="bg-orange-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Imprimir
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
            <tr>
              {[
                "#",
                "Vehículo",
                "Kilometraje",
                "Fecha",
                "Cantidad",
                "Unidad",
                "Trabajo",
                "Marca",
                "Código",
                "Repuesto",
                "Actualizar KM",
                "Operación",
                "Devolución",
              ].map((header) => (
                <th key={header} className="border px-3 py-2 font-bold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.length ? (
              currentData.map((m, i) => (
                <KardexRow
                  key={m.id}
                  maintenance={m}
                  index={(page - 1) * limit + i + 1}
                  onActualizarKm={handleOpenUpdateKm} // abre modal
                  onRealizar={onRealizar}
                />
              ))
            ) : (
              <tr>
                <td colSpan={13} className="text-center py-4 text-gray-500">
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-center mt-4">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>

      {/* MODAL Actualizar KM */}
      {updateKmOpen && selectedVehicle && (
        <UpdateKmForm
          vehicle={selectedVehicle}
          onUpdateKm={handleSaveUpdateKm} // función de guardar KM
          onClose={handleCloseUpdateKm}
        />
      )}
    </div>
  );
}