import React, { useState } from "react";
import { FaEdit, FaMapMarkedAlt } from "react-icons/fa";
import { TableRow, TableCell } from "../../ui/table";
import EditDestPanel from "../form/EditDestnPanel";
import MapSelector from "../form/MapSelector";

export default function DestRow({ item, index }) {
  const [openEditPanel, setOpenEditPanel] = useState(false);
  const [openMap, setOpenMap] = useState(false);

  const { latitud, longitud } = item;

  return (
    <>
      <TableRow className="border border-gray-200 hover:bg-gray-50 transition-colors">
        <TableCell className="border border-gray-200 px-3 py-2 text-center font-medium text-gray-700">
          {index + 1}
        </TableCell>
        <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
          {item.departamentoInicio}
        </TableCell>
        <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
          {item.origen}
        </TableCell>
        <TableCell
          className="border border-gray-200 px-3 py-2 max-w-[280px] truncate text-gray-700"
          title={item.ruta}
        >
          {item.ruta}
        </TableCell>
        <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
          {item.destino}
        </TableCell>
        <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
          {item.departamentoFinal}
        </TableCell>
        <TableCell className="border border-gray-200 px-3 py-2 text-center text-gray-700">
          {item.distancia}
        </TableCell>
        <TableCell className="border border-gray-200 px-3 py-2 text-center text-gray-700">
          {item.tiempo}
        </TableCell>
        <TableCell className="border border-gray-200 px-3 py-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setOpenEditPanel(true)}
              title="Editar"
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
            >
              <FaEdit size={14} />
            </button>

            <button
              onClick={() => setOpenMap(true)}
              title="Ver Mapa"
              className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition"
            >
              <FaMapMarkedAlt size={14} />
            </button>
          </div>
        </TableCell>
      </TableRow>

      {/* Modal de edición */}
      {openEditPanel && (
        <EditDestPanel
          open={openEditPanel}
          destino={item}
          onClose={() => setOpenEditPanel(false)}
        />
      )}

      {/* Modal de mapa */}
      <MapSelector
  open={openMap}
  onClose={() => setOpenMap(false)}
  initialLocation={{
    lat: item.mapa?.lat || -17.3935,
    lng: item.mapa?.lng || -66.1568,
  }}
  onSelectLocation={(newPos) => {
    // Aquí podrías actualizar la fila en tu store o estado local
    console.log("Nueva ubicación seleccionada:", newPos);
  }}
/>
    </>
  );
}


