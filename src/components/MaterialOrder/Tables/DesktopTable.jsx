import React, { useState, useEffect } from "react";
import DesktopRow from "./DesktopRow";
import Pagination from "./Pagination";
import { FaPlus } from "react-icons/fa";
import MaterialRequestForm from "../Form/MaterialRequestOrderForm"; 

export default function DesktopTable({ data, onAction, onCreate }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false); 
  const limit = 8;

  // reset página al buscar
  useEffect(() => {
    setPage(1);
  }, [search]);

  // filtro
  const filtered =
    data?.filter((d) =>
      d.nombre?.toLowerCase().includes(search.toLowerCase())
    ) || [];

  // paginación
  const totalPages = Math.ceil(filtered.length / limit);
  const currentData = filtered.slice(
    (page - 1) * limit,
    page * limit
  );

  // Función para abrir el formulario
  const handleCreate = () => {
    setFormOpen(true);
  };

  // Función para cerrar el formulario
  const handleCloseForm = () => {
    setFormOpen(false);
  };

  // Función para guardar (simulada aquí)
  const handleSaveForm = async (formData) => {
    // Aquí deberías mandar la data a backend o manejar como sea tu lógica
    console.log("Datos guardados:", formData);

    // Simula un resultado exitoso
    return { ok: true };
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-1 rounded shadow-sm"
        />

        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <FaPlus size={14} />
          Crear nuevo
        </button>
      </div>

      {/* TABLA */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
            <tr>
              {["#", "Nombre", "Motivo", "Fecha", "Operación"].map((h) => (
                <th key={h} className="border px-3 py-2 text-left font-bold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.length ? (
              currentData.map((item, i) => (
                <DesktopRow
                  key={item.id}
                  item={item}
                  index={(page - 1) * limit + i + 1}
                  onAction={onAction}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>

      {/* FORMULARIO PETICIÓN MATERIAL */}
      {formOpen && (
        <MaterialRequestForm
          isOpen={formOpen}
          onClose={handleCloseForm}
          onSave={handleSaveForm}
        />
      )}
    </div>
  );
}