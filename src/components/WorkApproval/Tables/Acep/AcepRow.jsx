import React from "react";
import { TableRow, TableCell } from "../../../ui/table";

export default function AcepRow({ item, index, onAction }) {
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
        <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">
          {item.aprobacion || "-"}
        </span>
      </TableCell>

      {/* Informe */}
      <TableCell className="border px-3 py-2">
        {item.informe || "-"}
      </TableCell>

      {/* Operaciones */}
      <TableCell className="flex items-center justify-center gap-2">

        <button
          onClick={() => onAction?.("accept", item)}
          className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-semibold transition"
        >
          Informe
        </button>

        <button
          onClick={() => onAction?.("reject", item)}
          className="px-3 py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200 text-xs font-semibold transition"
        >
          Rechazado
        </button>

      </TableCell>

    </TableRow>
  );
}