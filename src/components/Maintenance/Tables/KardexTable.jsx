import React, { useState, useEffect } from "react";
import KardexRow from "./KardexRow";
import Pagination from "./Pagination";
import UpdateKmForm from "../Form/UpdateKmForm";
import ProcessReturnForm from "../Form/ProcessReturnForm";
import { useMechanicsStore } from "../../../zustand/useMechanicsStore";

export default function KardexTable({ onRealizar }) {
  const { mechanics, fetchMechanics, editMechanic } = useMechanicsStore();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 8;

  const [updateKmOpen, setUpdateKmOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [processReturnOpen, setProcessReturnOpen] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);

  const handleOpenUpdateKm = (vehicle) => {
    setSelectedVehicle(vehicle);
    setUpdateKmOpen(true);
  };

  const handleCloseUpdateKm = () => {
    setSelectedVehicle(null);
    setUpdateKmOpen(false);
  };

  const handleSaveUpdateKm = async (updatedVehicle) => {
    await editMechanic(updatedVehicle.id, { kilometraje: updatedVehicle.kilometraje });
    fetchMechanics();
    handleCloseUpdateKm();
  };

  // Abrir formulario de devolución
  const handleOpenProcessReturn = (maintenance) => {
    setSelectedReturn(maintenance);
    setProcessReturnOpen(true);
  };

  const handleCloseProcessReturn = () => {
    setSelectedReturn(null);
    setProcessReturnOpen(false);
  };

  // Guardar devolución
  const handleSaveProcessReturn = async (data) => {
    await editMechanic(data.id, { devolucion: data.devolucion });
    fetchMechanics();
    handleCloseProcessReturn();
  };

  useEffect(() => {
    fetchMechanics();
  }, []);

  useEffect(() => setPage(1), [search]);

  const filtered = mechanics?.filter((m) =>
    m.trabajo?.toLowerCase().includes(search.toLowerCase())
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
                "#", "Vehículo", "Kilometraje", "Fecha", "Cantidad",
                "Unidad", "Trabajo", "Marca", "Código", "Repuesto",
                "Actualizar KM", "Operación", "Devolución"
              ].map((header) => (
                <th key={header} className="border px-3 py-2 font-bold">{header}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.length ? (
              currentData.map((m, i) => (
                <KardexRow
                  key={m.id}
                  maintenance={{
                    vehiculo: m.solicitud?.vehiculo
                      ? `${m.solicitud.vehiculo.tipog} - ${m.solicitud.vehiculo.placa}`
                      : "-",
                    kilometraje: m.kilometraje || "-",
                    fecha: m.fecha,
                    cantidad: m.cantidad || "-",
                    unidad: m.unidad || "-",
                    trabajo: m.trabajo || "-",
                    marca: m.marca || "-",
                    codigo: m.codigo || "-",
                    repuesto: m.observacion || "-",
                    id: m.id,
                    devolucion: m.devolucion || 0,
                  }}
                  index={(page - 1) * limit + i + 1}
                  onActualizarKm={handleOpenUpdateKm}
                  onRealizar={handleOpenProcessReturn} // <- CORREGIDO
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
          onUpdateKm={handleSaveUpdateKm}
          onClose={handleCloseUpdateKm}
        />
      )}

      {/* MODAL Devolución */}
      {processReturnOpen && selectedReturn && (
        <ProcessReturnForm
          isOpen={processReturnOpen}
          onClose={handleCloseProcessReturn}
          onSave={handleSaveProcessReturn}
          maintenance={selectedReturn}
        />
      )}

    </div>
  );
}