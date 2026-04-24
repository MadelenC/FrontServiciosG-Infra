import React from "react";
import { TableRow, TableCell } from "../../../ui/table";

export default function AcepRow({ item, index, onAction }) {
  return (
    <TableRow className="border hover:bg-gray-50">

      <TableCell className="border px-3 py-2">{index}</TableCell>
      <TableCell className="border px-3 py-2">{item.id || "-"}</TableCell>
      <TableCell className="border px-3 py-2">{item.institucion?.nombre || "-"}</TableCell>
      <TableCell className="border px-3 py-2">{item.descripcion || "-"}</TableCell>
      <TableCell className="border px-3 py-2">{item.taller || "-"}</TableCell>

      <TableCell className="border px-3 py-2">
        <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">
          {item.aprobacion || "-"}
        </span>
      </TableCell>

      <TableCell className="border px-3 py-2">{item.informe || "-"}</TableCell>

      <TableCell className="flex items-center justify-center gap-2">

        <button
          onClick={() => onAction?.("accept", item)}
          className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-semibold"
        >
          Informe
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