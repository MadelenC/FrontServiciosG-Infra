import React, { useEffect, useState } from "react";
import { useVehicleStore } from "../../../zustand/useVehicleStore";
import Pagination from "./Pagination";
import SearchBar from "../search/SearchBar";
import VehicleRow from "./VehicleRow";
import AddVehicleForm from "../form/AddVehicleForm";
import EditVehicleForm from "../form/oper/EditVehicleForm";
import UpdateKmForm from "../form/oper/UpdateKmForm";
import VehicleDetail from "../form/oper/VehicleDetail";

export default function TableVehicle() {
  const removeVehicle = useVehicleStore((state) => state.removeVehicle);
  const vehicles = useVehicleStore((state) => state.vehicles);
  const fetchVehicles = useVehicleStore((state) => state.fetchVehicles);
  const loading = useVehicleStore((state) => state.loading);
  const error = useVehicleStore((state) => state.error);
  const addVehicle = useVehicleStore((state) => state.addVehicle);
  const editVehicle = useVehicleStore((state) => state.editVehicle);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;

  const [openAddPanel, setOpenAddPanel] = useState(false);
  const [openEditPanel, setOpenEditPanel] = useState(false);
  const [openUpdateKmPanel, setOpenUpdateKmPanel] = useState(false);
  const [openDetailPanel, setOpenDetailPanel] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedDetailVehicle, setSelectedDetailVehicle] = useState(null);

  const [estadoFilter, setEstadoFilter] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter(
    (v) =>
      ((v.asignacion || "").toLowerCase().includes(search.toLowerCase()) ||
        (v.placa || "").toLowerCase().includes(search.toLowerCase())) &&
      (estadoFilter === "" || v.estado === estadoFilter)
  );

  const sortedVehicles = [...filteredVehicles].sort((a, b) => b.id - a.id);
  const totalPages = Math.ceil(sortedVehicles.length / limit);
  const currentVehicles = sortedVehicles.slice((page - 1) * limit, page * limit);

  const handleAddVehicle = async (vehicleData) => {
    const result = await addVehicle(vehicleData);
    if (result.ok) {
      alert("Vehículo registrado correctamente");
      setOpenAddPanel(false);
    } else {
      alert("Error al registrar vehículo: " + result.error);
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-600 dark:text-gray-300">Cargando vehículos...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-full rounded-xl bg-white dark:bg-gray-900 shadow-md p-4 pt-14">

      {/* FILTROS */}
      <div className="flex items-center justify-between mb-4">

        <div className="flex gap-3">
          <div className="w-64">
            <SearchBar search={search} setSearch={setSearch} />
          </div>

          <select
            value={estadoFilter}
            onChange={(e) => setEstadoFilter(e.target.value)}
            className="h-10 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md px-3"
          >
            <option value="">Estado</option>
            <option value="optimo">optimo</option>
            <option value="mantenimiento">mantenimiento</option>
            <option value="desuso">desuso</option>
          </select>
        </div>

        <button
          onClick={() => setOpenAddPanel(true)}
          className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500
            hover:from-blue-700 hover:to-blue-600 text-white px-5 py-3 rounded-lg shadow-lg font-medium
            focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300
            hover:scale-105 active:scale-95 mb-4"
        >
          + Agregar Vehículo
        </button>

      </div>

      {/* TABLA */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">

        <table className="w-full text-sm bg-white dark:bg-gray-900">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
            <tr>
              {["#", "Asignación", "Placa", "Asientos", "Tipo", "Kilometraje", "Estado", "Operaciones"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {currentVehicles.length > 0 ? (
              currentVehicles.map((v) => (
                <VehicleRow
                  key={v.id}
                  vehicle={v}
                  onEdit={() => {
                    setSelectedVehicle(v);
                    setOpenEditPanel(true);
                  }}
                  onUpdateKm={() => {
                    setSelectedVehicle(v);
                    setOpenUpdateKmPanel(true);
                  }}
                  onView={() => {
                    setSelectedDetailVehicle(v);
                    setOpenDetailPanel(true);
                  }}
                />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      {/* MODALES */}
      {openAddPanel && (
        <AddVehicleForm
          onSubmit={handleAddVehicle}
          onClose={() => setOpenAddPanel(false)}
        />
      )}

      {openEditPanel && selectedVehicle && (
        <EditVehicleForm
          vehicleData={selectedVehicle}
          onClose={() => setOpenEditPanel(false)}
          onUpdate={async (vehicleUI) => {
            await editVehicle(vehicleUI.id, vehicleUI);
            setOpenEditPanel(false);
          }}
          onDelete={async (id) => {
            const confirmDelete = window.confirm("¿Seguro que deseas eliminar este vehículo?");
            if (!confirmDelete) return;

            const result = await removeVehicle(id);

            if (result.ok) {
              alert("Vehículo eliminado correctamente");
              setOpenEditPanel(false);
            } else {
              alert("Error al eliminar: " + result.error);
            }
          }}
        />
      )}

      {openUpdateKmPanel && selectedVehicle && (
        <UpdateKmForm
          vehicle={selectedVehicle}
          onClose={() => setOpenUpdateKmPanel(false)}
          onUpdateKm={async (updatedVehicle) => {
            const result = await editVehicle(updatedVehicle.id, updatedVehicle);
            if (result.ok) {
              alert("Kilometraje actualizado correctamente");
              setOpenUpdateKmPanel(false);
            } else {
              alert("Error al actualizar: " + result.error);
            }
          }}
        />
      )}

      {openDetailPanel && selectedDetailVehicle && (
        <VehicleDetail
          vehicle={selectedDetailVehicle}
          onClose={() => setOpenDetailPanel(false)}
        />
      )}

    </div>
  );
}













