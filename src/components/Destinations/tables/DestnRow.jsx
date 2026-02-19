import React, { useState } from "react";
import { FaEdit, FaMapMarkedAlt } from "react-icons/fa";
import EditDestPanel from "../form/EditDestnPanel";
import MapSelector from "../form/MapSelector";

export default function DestRow({ item, index }) {
  const [openEditPanel, setOpenEditPanel] = useState(false);
  const [openMap, setOpenMap] = useState(false);

  // Aquí usamos las coordenadas del destino
  // Asegúrate de que `item` tenga latitud y longitud desde tu store/API
  const { latitud, longitud } = item;

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-3 py-2 border-b text-center">{index + 1}</td>
        <td className="px-3 py-2 border-b">{item.departamentoInicio}</td>
        <td className="px-2 py-2 border-b">{item.origen}</td>
        <td className="px-5 py-2 border-b max-w-[280px] truncate" title={item.ruta}>
          {item.ruta}
        </td>
        <td className="px-2 py-2 border-b">{item.destino}</td>
        <td className="px-3 py-2 border-b">{item.departamentoFinal}</td>
        <td className="px-4 py-3 border-b text-center">{item.distancia}</td>
        <td className="px-3 py-2 border-b text-center">{item.tiempo}</td>
        <td className="px-3 py-2 border-b text-center">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setOpenEditPanel(true)}
              title="Editar"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
            >
              <FaEdit size={14} />
            </button>

            <button
              onClick={() => setOpenMap(true)}
              title="Ver Mapa"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition"
            >
              <FaMapMarkedAlt size={14} />
            </button>
          </div>
        </td>
      </tr>

      {/* Modal de edición */}
      {openEditPanel && (
        <EditDestPanel
          open={openEditPanel}
          destino={item}
          onClose={() => setOpenEditPanel(false)}
        />
      )}

      {/* Modal de mapa */}
      {openMap && (
        <MapSelector
          open={openMap}
          destino={item}
          initialLat={latitud || -17.3935} // ejemplo: valor por defecto
          initialLng={longitud || -66.1568} // ejemplo: valor por defecto
          onClose={() => setOpenMap(false)}
        />
      )}
    </>
  );
}


