import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import { FaTachometerAlt, FaCheck } from "react-icons/fa";

export default function KardexRow({ maintenance, index, onActualizarKm, onRealizar }) {
   console.log("KardexRow maintenance:", maintenance);
  return (
    <TableRow className="border border-gray-200 hover:bg-gray-50 transition-colors">

      {/* # */}
      <TableCell className="border border-gray-200 px-3 py-2 font-medium text-gray-700">
        {index}
      </TableCell>

      {/* Vehículo */}
      <TableCell className="border px-3 py-2 text-gray-700">
         {maintenance.vehiculo}
      </TableCell>

      {/* Kilometraje */}
      <TableCell className="border px-3 py-2 text-gray-700">
        {maintenance.kilometraje}
      </TableCell>

      {/* Fecha */}
      <TableCell className="border px-3 py-2 text-gray-700">
        {maintenance.fecha ? new Date(maintenance.fecha).toLocaleDateString() : "-"}
      </TableCell>

      {/* Cantidad */}
      <TableCell className="border px-3 py-2 text-gray-700">
        {maintenance.cantidad}
      </TableCell>

      {/* Unidad */}
      <TableCell className="border px-3 py-2 text-gray-700">
        {maintenance.unidad}
      </TableCell>

      {/* Trabajo */}
      <TableCell className="border px-3 py-2 text-gray-700">
        {maintenance.trabajo}
      </TableCell>

      {/* Marca */}
      <TableCell className="border px-3 py-2 text-gray-700">
        {maintenance.marca}
      </TableCell>

      {/* Código */}
      <TableCell className="border px-3 py-2 text-gray-700">
        {maintenance.codigo}
      </TableCell>

      {/* Repuesto */}
      <TableCell className="border px-3 py-2 text-gray-700">
        {maintenance.repuesto}
      </TableCell>

      {/* Actualizar KM */}
      <TableCell className="border px-3 py-2 text-center">
        <button
          onClick={() => onActualizarKm?.(maintenance)}
          className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
          title="Actualizar KM"
        >
          <FaTachometerAlt size={14} />
        </button>
      </TableCell>

      {/* Operación */}
      <TableCell className="border px-3 py-2 text-gray-700">
        <button
          onClick={() => onRealizar(maintenance)}
          className="w-full text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center gap-1"
        >
          <FaCheck />
          Realizar
        </button>
      </TableCell>

      {/* Devolución */}
      <TableCell className="border px-3 py-2 text-red-600 font-bold text-center">
        {maintenance.devolucion}
      </TableCell>

    </TableRow>
  );
}