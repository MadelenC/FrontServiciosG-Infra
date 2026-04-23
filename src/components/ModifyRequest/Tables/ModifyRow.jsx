import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import { FaEye, FaEdit, FaPrint } from "react-icons/fa";

export default function ModifyRow({ item, index, onAction }) {
  return (
    <TableRow className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">

      {/* # */}
      <TableCell className="border px-3 py-2">
        {index}
      </TableCell>

      {/* N° */}
      <TableCell className="border px-3 py-2">
        {item.id_nro || "-"}
      </TableCell>

      {/* Sección / Institución */}
      <TableCell className="border px-3 py-2">
        {item.institucion?.nombre }
      </TableCell>

      {/* Descripción */}
      <TableCell className="border px-3 py-2">
        {item.descripcion || "-"}
      </TableCell>

      {/* Taller */}
      <TableCell className="border px-3 py-2">
        {item.taller || "-"}
      </TableCell>

      {/* Operaciones */}
      <TableCell className="border px-3 py-2 flex gap-2 justify-center">

        <button
          onClick={() => onAction?.("edit", item)}
          className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
          title="editar"
        >
          <FaEdit size={14} />
        </button>

        <button
          onClick={() => onAction?.("print", item)}
          className="p-2 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200"
        >
          <FaPrint size={14} />
        </button>

      </TableCell>
    </TableRow>
  );
}