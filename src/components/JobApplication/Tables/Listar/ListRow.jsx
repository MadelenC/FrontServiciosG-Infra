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


      {/* Operaciones */}
      <TableCell className="border px-3 py-2 flex gap-2 justify-center">
            <button
        onClick={() => onAction?.("print", item)}
        className="p-2 rounded-md bg-green-100 text-green-700 hover:bg-green-200"
        aria-label="Imprimir"
        >
        <FaPrint size={16} />
        </button>

      
      </TableCell>
    </TableRow>
  );
}