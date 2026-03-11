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
  //Uso correcto de Zustand (selectores individuales)
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

  // ✅ Ejecutar fetch solo una vez
  useEffect(() => {
    fetchVehicles();
  }, []);

  // ✅ Filtrado simple sin useMemo
  const filteredVehicles = vehicles.filter(
    (v) =>
      ((v.asignacion || "").toLowerCase().includes(search.toLowerCase()) ||
        (v.placa || "").toLowerCase().includes(search.toLowerCase())) &&
      (estadoFilter === "" || v.estado === estadoFilter)
  );

  // Orden descendente
  const sortedVehicles = [...filteredVehicles].sort((a, b) => b.id - a.id); 
  const totalPages = Math.ceil(sortedVehicles.length / limit);//Paginación
  const currentVehicles = sortedVehicles.slice((page - 1) * limit, page * limit);

  // Agregar vehículo
  const handleAddVehicle = async (vehicleData) => {
    const result = await addVehicle(vehicleData);
    if (result.ok) {
      alert("Vehículo registrado correctamente");
      setOpenAddPanel(false);
    } else {
      alert("Error al registrar vehículo: " + result.error);
    }
  };

  if (loading) return <div className="p-6 text-center">Cargando vehículos...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-full rounded-xl bg-white shadow-md p-4 pt-14">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-3">
          <div className="w-64">
            <SearchBar search={search} setSearch={setSearch} />
          </div>
          <select
            value={estadoFilter}
            onChange={(e) => setEstadoFilter(e.target.value)}
            className="h-10 border border-gray-300 rounded-md px-3"
          >
            <option value="">Estado</option>
            <option value="optimo">optimo</option>
            <option value="mantenimiento">mantenimiento</option>
            <option value="desuso">desuso</option>
          </select>
        </div>

        <button
          onClick={() => setOpenAddPanel(true)}
          className="border border-blue-500 text-blue-600 px-4 py-2 rounded-md"
        >
          + Agregar Vehículo
        </button>
      </div>

      {/* Tabla */}
      <table className="w-full text-sm">
        <thead className="bg-blue-50">
          <tr>
            {["#", "Asignación", "Placa", "Asientos", "Tipo", "Kilometraje", "Estado", "Operaciones"].map(
              (h) => (
                <th key={h} className="px-4 py-3 text-left">{h}</th>
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
              <td colSpan={8} className="text-center py-4 text-gray-500">
                No hay registros
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      {/* Modal agregar */}
      {openAddPanel && (
        <AddVehicleForm
          onSubmit={handleAddVehicle}
          onClose={() => setOpenAddPanel(false)}
        />
      )}

      {/* Modal editar */}
      {openEditPanel && selectedVehicle && (
      <EditVehicleForm
      vehicleData={selectedVehicle}
      onClose={() => setOpenEditPanel(false)}
      onUpdate={async (vehicleUI) => {
      await editVehicle(vehicleUI.id, vehicleUI);
      setOpenEditPanel(false);
       }}
       onDelete={async (id) => {
      const confirmDelete = window.confirm(
        "¿Seguro que deseas eliminar este vehículo?"
      );

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

     {/* Modal actualizar km */}
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
      {/* Modal detalle */}
      {openDetailPanel && selectedDetailVehicle && (
        <VehicleDetail
          vehicle={selectedDetailVehicle}
          onClose={() => setOpenDetailPanel(false)}
        />
      )}
    </div>
  );
}













