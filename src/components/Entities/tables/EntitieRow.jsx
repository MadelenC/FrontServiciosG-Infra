import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import { FaEdit } from "react-icons/fa";

export default function EntitieRow({ entitie, onEdit }) {
  return (
    <TableRow className="border border-gray-200 hover:bg-gray-50 transition-colors">
      <TableCell className="border border-gray-200 px-3 py-2 text-center text-gray-700">
        {entitie.id}
      </TableCell>
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {entitie.facultad}
      </TableCell>
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {entitie.carrera}
      </TableCell>
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {entitie.materia}
      </TableCell>
      <TableCell className="border border-gray-200 px-3 py-2 text-gray-700">
        {entitie.sigla}
      </TableCell>
      <TableCell className="border border-gray-200 px-3 py-2 text-center text-gray-700">
        <button
          className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition"
          title="Editar entidad"
          onClick={() => onEdit(entitie)}
        >
          <FaEdit size={14} />
        </button>
      </TableCell>
    </TableRow>
  );
}




