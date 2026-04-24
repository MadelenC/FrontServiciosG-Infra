import React from "react";
import { TableRow, TableCell } from "../../../ui/table";

export default function RechRow({
  item,
  index,
  onAction,
  getDescripcion, 
}) {
  return (
    <TableRow className="border hover:bg-gray-50">

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
        {item.ins_id || "-"}
      </TableCell>

      {/* Descripción REAL */}
      <TableCell className="border px-3 py-2">
        {getDescripcion?.(item.man_id) || "-"}
      </TableCell>

      {/* Taller */}
      <TableCell className="border px-3 py-2">
        {item.taller || "-"}
      </TableCell>

      {/* Aprobación */}
      <TableCell className="border px-3 py-2">
        <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">
          {item.aprobacion || "-"}
        </span>
      </TableCell>

      {/* Operaciones */}
      <TableCell className="flex items-center justify-center gap-2">

        <button
          onClick={() => onAction?.("info", item)}
          className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-semibold"
        >
          Ver
        </button>

        <button
          onClick={() => onAction?.("accept", item)}
          className="px-3 py-1 rounded-md bg-green-100 text-green-700 hover:bg-green-200 text-xs font-semibold"
        >
          aceptado
        </button>

      </TableCell>

    </TableRow>
  );
}