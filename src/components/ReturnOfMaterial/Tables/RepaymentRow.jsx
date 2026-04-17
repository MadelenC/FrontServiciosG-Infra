import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function RepaymentRow({ item, index, onAction }) {
  return (
    <TableRow className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">

      {/* # */}
      <TableCell className="border px-3 py-2 text-gray-800 dark:text-gray-200">
        {index}
      </TableCell>

      {/* Serial */}
      <TableCell className="border px-3 py-2 text-gray-800 dark:text-gray-200">
        {item.serial || "-"}
      </TableCell>

      {/* Fecha */}
      <TableCell className="border px-3 py-2 text-gray-800 dark:text-gray-200">
        {item.fecha || "-"}
      </TableCell>

      {/* Nombre */}
      <TableCell className="border px-3 py-2 text-gray-800 dark:text-gray-200">
        {item.nombre || "-"}
      </TableCell>

      {/* Cantidad */}
      <TableCell className="border px-3 py-2 text-gray-800 dark:text-gray-200">
        {item.cantidad || "-"}
      </TableCell>

      {/* Detalle */}
      <TableCell className="border px-3 py-2 text-gray-800 dark:text-gray-200">
        {item.detalle || "-"}
      </TableCell>

      {/* Vehiculo */}
      <TableCell className="border px-3 py-2 text-gray-800 dark:text-gray-200">
        {item.vehiculo || "-"}
      </TableCell>

      {/* Operación */}
      <TableCell className="border px-3 py-2 flex gap-2 justify-center">

        <button
          onClick={() => onAction?.("view", item)}
          className="p-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-800"
        >
          <FaEye size={14} />
        </button>

        <button
          onClick={() => onAction?.("edit", item)}
          className="p-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 rounded hover:bg-yellow-200 dark:hover:bg-yellow-800"
        >
          <FaEdit size={14} />
        </button>

        <button
          onClick={() => onAction?.("delete", item)}
          className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800"
        >
          <FaTrash size={14} />
        </button>

      </TableCell>
    </TableRow>
  );
}