import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import { FaEdit, FaPrint } from "react-icons/fa";

export default function SeccionesRow({
  institution,
  index,
  onEdit,
}) {
  return (
    <TableRow className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">

      {/* # */}
      <TableCell className="border px-3 py-2">
        {institution?.id || "-"}
      </TableCell>

      {/* NOMBRE */}
      <TableCell className="border px-3 py-2">
        {institution?.nombre || "-"}
      </TableCell>

      {/* OPERACIONES */}
      <TableCell className="border px-3 py-2">
        <div className="flex items-center gap-2">

          <button
            onClick={() => onEdit?.(institution)}
            className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
            title="editar"
          >
            <FaEdit size={14} />
          </button>

          
        </div>
      </TableCell>

    </TableRow>
  );
}