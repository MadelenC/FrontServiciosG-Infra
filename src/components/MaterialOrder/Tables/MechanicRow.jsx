import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import { FaPrint, FaFileAlt, FaEye } from "react-icons/fa";

export default function MechanicRow({ mechanic, index, onRealizar }) {
  console.log(mechanic);
  return (
    <TableRow className="border border-gray-200 hover:bg-gray-50 transition-colors">
      
      {/* # */}
      <TableCell className="border border-gray-200 px-3 py-2 font-medium text-gray-700">
        {index}
      </TableCell>

      {/* Petición por */}
      <TableCell className="border px-3 py-2 text-gray-700">
        {mechanic.solicitud?.chofer || "-"}
      </TableCell>
    
      {/* Vehículo */}
      <TableCell className="border px-3 py-2 text-gray-700">
  {mechanic.solicitud?.vehiculo
    ? `${mechanic.solicitud.vehiculo.tipog} - ${mechanic.solicitud.vehiculo.placa}`
    : "-"}
</TableCell>

      {/* Kilometraje */}
      <TableCell className="border px-3 py-2 text-gray-700">
        {mechanic.km || "-"}
      </TableCell>

      {/* Justificación */}
      <TableCell className="border px-3 py-2 text-gray-700">
        {mechanic.justificacion || "-"}
      </TableCell>

      {/* Observación */}
      <TableCell className="border px-3 py-2 text-gray-700">
        {mechanic.observacion || "-"}
      </TableCell>

      {/* Operación: 3 botones */}
      <TableCell className="border px-3 py-2 text-center flex gap-2 justify-center">
        <button
          onClick={() => onRealizar?.("imprimir", mechanic)}
          className="p-2 rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
          title="Imprimir"
        >
          <FaPrint size={14} />
        </button>
        <button
          onClick={() => onRealizar?.("imprimir_blanco", mechanic)}
          className="p-2 rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
          title="Imprimir en blanco"
        >
          <FaFileAlt size={14} />
        </button>
        <button
          onClick={() => onRealizar?.("ver_solicitud", mechanic)}
          className="p-2 rounded bg-green-100 text-green-600 hover:bg-green-200"
          title="Ver solicitud"
        >
          <FaEye size={14} />
        </button>
      </TableCell>

      {/* Respuestas */}
      <TableCell className="border px-3 py-2 text-gray-700 text-center">
        {mechanic.respuestas || "-"}
      </TableCell>
    </TableRow>
  );
}