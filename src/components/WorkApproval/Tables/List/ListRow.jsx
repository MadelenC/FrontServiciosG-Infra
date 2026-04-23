import React from "react";
import { TableRow, TableCell } from "../../../ui/table";
import { FaEye, FaEdit, FaPrint } from "react-icons/fa";

export default function ListRow({ item, index, onAction }) {
  return (
    <TableRow className="border border-gray-200 hover:bg-gray-50 transition">

      {/* # */}
      <TableCell className="border px-3 py-2">
        {index}
      </TableCell>

      {/* N° */}
      <TableCell className="border px-3 py-2">
        {item.id || "-"}
      </TableCell>

      {/* Sección */}
      <TableCell className="border px-3 py-2">
        {item.institucion?.nombre || "-"}
      </TableCell>

      {/* Descripción */}
      <TableCell className="border px-3 py-2">
        {item.descripcion || "-"}
      </TableCell>

      {/* Taller */}
      <TableCell className="border px-3 py-2">
        {item.taller || "-"}
      </TableCell>

      {/* Aprobación */}
      <TableCell className="border px-3 py-2">
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
          item.aprobacion === "pendiente"
            ? "bg-blue-100 text-gray-600"
            : "bg-yellow-100 text-gray-600"
        }`}>
          {item.aprobacion || "Pendiente"}
        </span>
      </TableCell>

      {/* Fecha Envío */}
      <TableCell className="border px-3 py-2">
        {item.fecha
          ? new Date(item.fecha).toLocaleDateString()
          : "-"}
      </TableCell>

      {/* Operaciones */}
      <TableCell className="border px-3 py-2 flex gap-2 justify-center">
      <button
        onClick={() => onAction?.("accept", item)}
        className="px-3 py-1 rounded-md bg-green-100 text-green-700 hover:bg-green-200 text-xs font-semibold"
      >
        Aceptar
      </button>

      <button
        onClick={() => onAction?.("reject", item)}
        className="px-3 py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200 text-xs font-semibold"
      >
        Rechazar
      </button>
      </TableCell>
    </TableRow>
  );
}