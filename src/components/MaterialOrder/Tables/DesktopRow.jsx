import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function DesktopRow({ item, index, onAction }) {
  return (
    <TableRow className="border border-gray-200 hover:bg-gray-50 transition">

      {/* # */}
      <TableCell className="border px-3 py-2">{index}</TableCell>

      {/* Nombre */}
      <TableCell className="border px-3 py-2">
        {item.nombre || "-"}
      </TableCell>

      {/* Motivo */}
      <TableCell className="border px-3 py-2">
        {item.motivo || "-"}
      </TableCell>

      {/* Fecha */}
      <TableCell className="border px-3 py-2">
        {item.fecha || "-"}
      </TableCell>

      {/* Operación */}
      <TableCell className="border px-3 py-2 flex gap-2 justify-center">
        <button
          onClick={() => onAction?.("view", item)}
          className="p-2 bg-green-100 text-green-600 rounded hover:bg-green-200"
        >
          <FaEye size={14} />
        </button>

        <button
          onClick={() => onAction?.("edit", item)}
          className="p-2 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200"
        >
          <FaEdit size={14} />
        </button>

        <button
          onClick={() => onAction?.("delete", item)}
          className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
        >
          <FaTrash size={14} />
        </button>
      </TableCell>
    </TableRow>
  );
}